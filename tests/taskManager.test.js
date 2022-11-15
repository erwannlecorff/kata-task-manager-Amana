const test = require('tape')
const { Parser } = require('../taskManager')

test("Parser should extract the command symbol", (t) => {
    const text = "+ <description in several words>";
    const expected = ['+', '<description in several words>'];

    const parser = new Parser();

    t.deepEqual(parser.parse(text), expected);
    t.end();
})