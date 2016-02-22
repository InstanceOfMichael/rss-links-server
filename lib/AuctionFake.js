var faker = require('faker');

const makeOne = function()
{
    // const id    = faker.random.uuid();
    const name = faker.lorem.sentence();
    const slug = faker.helpers.slugify(name);
    return {
        // id:          id,
        slug:        slug,
        name:        name,
        source_href: faker.internet.url(),
        description: faker.lorem.sentences(),
        meta:JSON.stringify({
            keywords: faker.lorem.sentence().split(' ')
        })
    };
};
const makeSome = function(count)
{
    count = count||faker.random.number(8)+8;
    const data = Array.apply(null, {length: count}).map(Number.call, Number);
    return data.map(makeOne);
};

module.exports = {
  makeSome: makeSome,
  makeOne:  makeOne,
}
