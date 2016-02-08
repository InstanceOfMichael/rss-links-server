var faker = require('faker');

const makeOne = function()
{
    const id = faker.random.uuid();
    const title = faker.lorem.sentence();
    const slug = faker.helpers.slugify(title);
    return {
        id:id,
        slug:slug,
        title:title,
        source_href:faker.internet.url(),
        href:'/article/'+slug,
        description:faker.lorem.sentences(),
    };
};
const makeSome = function(count)
{
    count = count||faker.random.number(8)+8;
    const data = Array.apply(null, {length: count}).map(Number.call, Number);
    return data.map(makeOne);
};

module.exports = {
  makeSome:makeSome,
  makeOne:makeOne,
}
