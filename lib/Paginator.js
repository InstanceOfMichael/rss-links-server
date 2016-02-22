
const defaultOptions = {
   perPage:     15,
   currentPage: 1,
   baseUrl:     '/', // lol
};
/*
 *  queryFn should return a knex compatible query Promise
 *  without any offset/limit type addons
 *  po paginationOptions
 */
module.exports = function(Model, queryFn, options)
{
    // console.log({
    //   queryFn:queryFn,
    //   options:options||{},
    //   'queryFn({count:1})':queryFn({count:1}),
    //   'queryFn({fetchAll:1})':queryFn({fetchAll:1}),
    //   'Object.keys(queryFn({fetchAll:1}))':Object.keys(queryFn({fetchAll:1})),
    // })
    options = options || {};
    queryFn = queryFn || function(query){ return query; }

    for(var key in defaultOptions)
    {
        options[key] = options.hasOwnProperty(key) ? options[key] : defaultOptions[key];
    }

    // allow shortcut of just 'page'
    options.currentPage = options.page || options.currentPage;

    return new Promise(function(resolve,reject){
      Promise.all([
        queryFn(Model.forge().query(),{count:1}).count(),
        queryFn(Model.forge().query(),{fetchAll:1})
          .offset(options.perPage * options.currentPage)
          .limit(options.perPage)
          ,
      ]).then(results => {
          const count = results[0][0]['count(*)'];
          const rows  = results[1];
          // console.log({PromiseAllResults:{
          //   count: count,
          //   'results[0][0]':results[0][0]['count(*)'],
          //   // rows:  rows,
          // }});

          // note that I'm using camelCase instead of snake_case
          // https://laravel.com/docs/5.1/pagination#converting-results-to-json
          //
          resolve({
             total: count,
             perPage: options.perPage,
             currentPage: options.page,
             lastPage: Math.ceil(count / options.perPage),
             nextPageUrl: 'http://laravel.app?page=2',
             prevPageUrl: null,
             from: (options.perPage * (options.page - 1)) + 1,
             to:   (options.perPage * (options.page)),
             data: rows
          })
      },reject)
    });
};
