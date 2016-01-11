var parser = require('rss-parser');

var ArticleSearchControllerInit = function(db,cacheRedis)
{
    return function(req,res)
    {
        var param = {
          page:    req.param.page||1,
          perPage: req.param.perPage||16,
        };
        var where = {

        };
        var options = {
            limit:  param.perPage,
            offset: param.perPage*(param.page-1),
            order:  "created_at",
        };

        db.article.find(where,options,function(err,results){
            console.log({
              dbQueryParams:{
                  where:where,
                  options:options,
              },
              frontEndParams:param,
              results: results
            });
            res.send({
              articles: {
                data: results
                // perPage: 16,
              }
            });
        });
    }
};

module.exports = ArticleSearchControllerInit;
