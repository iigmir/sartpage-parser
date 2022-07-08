import { strictEqual } from "assert";
import { readFile } from "fs";
import ExpectedResult from "./expected.js";
import Parser from "../../lib/index.js";

let result = {};

describe("Parser: No results", function ()
{
    before( (done) =>
    {
        readFile("./tests/case2/input.html", "utf-8", function(err, content) {
            if (err) throw err;
            result = Parser(content);
            done();
        });
    });
    describe("meta", () =>
    {
        it("should still get query title", () =>
        {
            strictEqual(result.keyword, ExpectedResult.keyword);
        });
        it("should still get infos", () =>
        {
            strictEqual(result.filter, ExpectedResult.filter);
            strictEqual(result.date, ExpectedResult.date);
            strictEqual(result.region, ExpectedResult.region);
        });
    });
    describe("quickfact", () =>
    {
        it("should NOT get info", () =>
        {
            const no_info = Object.keys(result.quickfact).length === 0;
            strictEqual(no_info, true);
        });
    });
    describe("results", () =>
    {
        it("should get no link", () =>
        {
            const no_links = ExpectedResult.results.length === 0;
            strictEqual(no_links, true);
        });
    });
});