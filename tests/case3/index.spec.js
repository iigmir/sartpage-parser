import { strictEqual } from "assert";
import { readFile } from "fs";
import ExpectedResult from "./expected.js";
import Parser from "../../lib/index.js";

let result = {};

describe("Parser: Not vaild spartpage page", function ()
{
    before( (done) =>
    {
        readFile("./tests/case3/input.html", "utf-8", function(err, content) {
            if (err) throw err;
            result = Parser(content);
            done();
        });
    });
    describe("meta", () =>
    {
        it("should get the original title", () =>
        {
            strictEqual(result.message, ExpectedResult.message);
        });
    });
});