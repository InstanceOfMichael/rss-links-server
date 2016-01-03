var parser = require('rss-parser');

var LinksControllerInit = function(cacheRedis)
{
    return function(req,res)
    {

        parser.parseURL('https://news.ycombinator.com/rss', function(err, parsed)
        {
            // console.log({err:err});
            // console.log({parsed:parsed});
            // console.log(parsed.feed.title);
            // parsed.feed.entries.forEach(function(entry)
            // {
            //     console.log(entry.title + ':' + entry.link);
            // })

            res.send(parsed.feed,200);

        });

    }
};

module.exports = LinksControllerInit;
