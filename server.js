require('dotenv').config({});

process.env.LISTEN_PORT = process.env.LISTEN_PORT||9050;

var massive = require("massive");
var express = require('express')();
var Redis = require('ioredis');

var cacheRedis = new Redis({
  port:     process.env.REDIS_PORT||6379,          // Redis port
  host:     process.env.REDIS_HOST||'127.0.0.1',   // Redis host
  //family:   process.env.REDIS_FAMILY||4,           // 4 (IPv4) or 6 (IPv6)
  //password: process.env.REDIS_PASSWORD||null,
  keyPrefix:   (process.env.REDIS_CACHE_PREFIX||'rss-ln:cache')+':',
});
var sessionRedis = new Redis({
  port:     process.env.REDIS_PORT||6379,          // Redis port
  host:     process.env.REDIS_HOST||'127.0.0.1',   // Redis host
  //family:   process.env.REDIS_FAMILY||4,           // 4 (IPv4) or 6 (IPv6)
  //password: process.env.REDIS_PASSWORD||null,
  keyPrefix:   (process.env.REDIS_SESSIONS_PREFIX||'rss-ln:sessions')+':',
});
// todo define RabbitMQ MPI or redis PubSub
// todo define RabbitMQ JobQueue or redis JobQueue
// todo define logging service

massive.connect({
  connectionString:process.env.DB_POSTGRES||'postgres://rss:password@localhost:5432/rssdb',
}, function(err,db){

  if (err)
  {
      throw err;
  }
  else
  {
      require('./router')(express,db,cacheRedis,sessionRedis);
  }

});
