var nano = require('nano')(process.env.COUCHDB_BASE_URL);
var dbHandle = nano.use('auctions');
