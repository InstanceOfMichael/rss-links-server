module.exports = function(express,db,cacheRedis,sessionRedis)
{
      // const cacheMiddleware = require('express-redis-cache')({
      //     client:cacheRedis,
      // });
      const controller = require('./lib/AuctionController')(db,cacheRedis);

      express.use(require('body-parser').json());
      express.use(require('connect-timeout')(30 * 1000));
      express.use(require('cors')());

      express.get('/auctions',controller.index);
      express.put('/auctions',controller.store);
      express.get('/auctions/create',controller.create);
      express.patch('/auctions/:slug',controller.update);
      express.get('/auctions/:slug',controller.show);
};
