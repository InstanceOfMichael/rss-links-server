const AuctionFaker = require('../lib/AuctionFake');
const TABLE_NAME = 'auctions';

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex(TABLE_NAME).del(),

    knex(TABLE_NAME).insert(AuctionFaker.makeSome()),
    knex(TABLE_NAME).insert(AuctionFaker.makeSome()),
    knex(TABLE_NAME).insert(AuctionFaker.makeSome()),
    knex(TABLE_NAME).insert(AuctionFaker.makeSome()),
    knex(TABLE_NAME).insert(AuctionFaker.makeSome())
  );
};
