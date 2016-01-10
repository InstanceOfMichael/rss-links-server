

module.exports = function(express,db,cacheRedis,sessionRedis)
{
      db.myTable.find();

      express.use(require('body-parser').json());
      express.use(require('connect-timeout')(30 * 1000));
      express.use(require('cors')());

      express.get('/links',
            require('./lib/LinksController')(cacheRedis)
            // function(req,res){
            //     console.log({hit:1});
            //
            //
            //
            //     res.send({status:'ok'},200);
            // }
      );

      var server = express.listen(process.env.LISTEN_PORT, function () {
          console.log('Listing on port: ' + process.env.LISTEN_PORT);
      });
};
