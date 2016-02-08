module.exports = function(express,db,cacheRedis,sessionRedis)
{
      // const cacheMiddleware = require('express-redis-cache')({
      //     client:cacheRedis,
      // });
      const controller = require('./lib/ArticleSearchController')(db,cacheRedis);

      express.use(require('body-parser').json());
      express.use(require('connect-timeout')(30 * 1000));
      express.use(require('cors')());

      express.get('/articles',controller.index);
      // express.get('/articles/:slug',controller.show);
};
