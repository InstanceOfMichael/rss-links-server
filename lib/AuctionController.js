const AuctionFaker = require('./AuctionFake');
const Hogan = require("hogan.js");
const fs = require('fs');
const Templates = {
  show:   Hogan.compile(fs.readFileSync('./views/auctions/show.hjs',   'utf-8')),
  create: Hogan.compile(fs.readFileSync('./views/auctions/create.hjs', 'utf-8')),
  index:  Hogan.compile(fs.readFileSync('./views/auctions/index.hjs',  'utf-8')),
  master: Hogan.compile(fs.readFileSync('./views/master.hjs', 'utf-8')),
};
const defaultResponse = function(req,res)
{
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
};
const redirectBackResponse = function(req,res)
{
    // log the request and respond with 406
    backURL=req.header('Referer') || '/';
    // do your thang
    res.redirect(backURL);
};

// const master = Templates.master.render({
//   title:'ayyy',
// });

module.exports = function(db,cacheRedis)
{
  return {
    index:function(req,res)
    {
        const title    = 'Auctions';
        const auctions = AuctionFaker.makeSome();
        const data     = {
            auctions: auctions,
            title:    title,
        };

        return res.format({
            // 'text/plain': function()
            // {
            //     res.send('todo');
            // },

            'text/html': function()
            {
                const html = Templates.index.render({
                    data:     JSON.stringify(data),
                    auctions: auctions,
                    title:    title,
                    metaTags: [
                      // {name:'ayyy',value:'lmao'},
                    ],
                },{
                    layout: Templates.master,
                });

                res.send(html);
            },
            'application/json': function()
            {
                res.send(data);
            },
            default:defaultResponse
        });
    },
    show:function(req,res)
    {
        const auction = AuctionFaker.makeOne();
        const title   = auction.title;
        const data    = {
            auction: auction,
        };

        return res.format({
            // 'text/plain': function()
            // {
            //     res.send('todo');
            // },

            'text/html': function()
            {
                const html = Templates.show.render({
                    data:     JSON.stringify(data),
                    auction:  auction,
                    title:    title,
                    metaTags: [
                      // {name:'ayyy',value:'lmao'},
                    ],
                },{
                    layout: Templates.master,
                });

                res.send(html);
            },
            'application/json': function()
            {
                res.send(data);
            },
            default:defaultResponse
        });
    },
    create:function(req,res)
    {
        return res.format({
            // 'text/plain': function()
            // {
            //     res.send('todo');
            // },

            'text/html': function()
            {
                const html = Templates.create.render({
                },{
                    layout: Templates.master,
                });

                res.send(html);
            },
            // 'application/json': function()
            // {
            //     res.send(data);
            // },
            default:defaultResponse
        });
    },
    store:function(req,res)
    {
        return res.format({
            // 'text/plain': function()
            // {
            //     res.send('todo');
            // },

            'text/html': function()
            {
                const html = Templates.create.render({
                },{
                    layout: Templates.master,
                });

                res.send(html);
            },
            'application/json': function()
            {
                res.send(data);
            },
            default:defaultResponse
        });
    },
    update:function(req,res)
    {
        return res.format({
            // 'text/plain': function()
            // {
            //     res.send('todo');
            // },

            'text/html': function()
            {
                const html = Templates.create.render({
                },{
                    layout: Templates.master,
                });

                res.send(html);
            },
            'application/json': function()
            {
                res.send(data);
            },
            default:defaultResponse
        });
    },
  };
};
