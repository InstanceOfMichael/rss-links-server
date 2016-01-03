require('dotenv').config({});

process.env.LISTEN_PORT = process.env.LISTEN_PORT||9050;

var app = require('express')();
app.use(require('body-parser').json());
app.use(require('connect-timeout')(30 * 1000));
app.use(require('cors')())

var Redis = require('ioredis');

var cacheRedis = new Redis({
  port:     process.env.REDIS_PORT||6379,          // Redis port
  host:     process.env.REDIS_HOST||'127.0.0.1',   // Redis host
  //family:   process.env.REDIS_FAMILY||4,           // 4 (IPv4) or 6 (IPv6)
  //password: process.env.REDIS_PASSWORD||null,
  keyPrefix:   (process.env.REDIS_PREFIX||'rss-ln')+':',
});

var server = app.listen(process.env.LISTEN_PORT, function () {
  console.log('Listing on port: ' + process.env.LISTEN_PORT);
});

app.get('/links',
      require('./lib/LinksController')(cacheRedis)
      // function(req,res){
      //     console.log({hit:1});
      //
      //
      //
      //     res.send({status:'ok'},200);
      // }
);
