require('dotenv').config({});

process.env.LISTEN_PORT = process.env.LISTEN_PORT||9050;

const express = require('express')();
const db = {/* TODO */};
const Redis = require('ioredis');

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

require('./router')(express,db,cacheRedis,sessionRedis);

var server = express.listen(process.env.LISTEN_PORT, function () {
    console.log('Listing on port: ' + process.env.LISTEN_PORT);
});
