const ArticalFaker = require('./ArticleFake');
const Hogan = require("hogan.js");
const fs = require('fs');
const Templates = {
  show:Hogan.compile(fs.readFileSync('./views/articles/show.hjs', 'utf-8')),
  index:Hogan.compile(fs.readFileSync('./views/articles/index.hjs', 'utf-8')),
  master:Hogan.compile(fs.readFileSync('./views/master.hjs', 'utf-8')),
};
const defaultResponse = function()
{
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
};

// const master = Templates.master.render({
//   title:'ayyy',
// });

module.exports = function(db,cacheRedis)
{
  return {
    index:function(req,res)
    {
        const title = 'Articles';
        const articles = ArticalFaker.makeSome();
        const data = {
            articles:articles,
            title:title,
        };

        return res.format({
            'text/plain': function()
            {
                res.send('hey');
            },

            'text/html': function()
            {
                const html = Templates.index.render({
                    data:JSON.stringify(data),
                    articles:articles,
                    title:title,
                    metaTags:[
                      // {name:'ayyy',value:'lmao'},
                    ],
                },{
                  layout:Templates.master,
                });

                res.send(html);
            },
            'application/json': function()
            {
                res.send(data);
            },
            default:defaultResponse
        });

        if (req.accepts('html'))
        {
            console.log('returning HTML');
            return res.send({},200);
        }

        // console.log(Object.keys(req));
        res.send(data,200);
    },
    // show:function(req,res)
    // {
    //     const article = ArticalFaker.makeOne();
    //     const data = {
    //         article:article,
    //         master:master,
    //     };
    //
    //     if (req.accepts('html'))
    //     {
    //         console.log('returning HTML');
    //         return res.send(Templates.show.render({
    //             data:data,
    //             master:master,
    //         }),200);
    //     }
    //
    //     res.send(data,200);
    // },
  };
};
