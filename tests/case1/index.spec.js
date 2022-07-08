import { strictEqual } from "assert";
import { readFile } from "fs";
import ExpectedResult from "./expected.js";
import Parser from "../../lib/index.js";

let input = "";
let result = {};

describe("Parser", function ()
{
    before( (done) =>
    {
        readFile("./tests/case1/input.html", "utf-8", function(err, content) {
            if (err) throw err;
            input = content;
            result = Parser(input);
            done();
        });
    });
    describe("meta", () =>
    {
        it("should get query title", () =>
        {
            strictEqual(result.keyword, ExpectedResult.keyword);
        });
        it("should get infos", () =>
        {
            const result = Parser(input);
            strictEqual(result.filter, ExpectedResult.filter);
            strictEqual(result.date, ExpectedResult.date);
            strictEqual(result.region, ExpectedResult.region);
        });
    });
    describe("quickfact", () =>
    {
        it("should get info", () =>
        {
            strictEqual(result.quickfact.title, ExpectedResult.quickfact.title);
            strictEqual(result.quickfact.subtitle, ExpectedResult.quickfact.subtitle);
            strictEqual(result.quickfact.link, ExpectedResult.quickfact.link);
            strictEqual(result.quickfact.description, ExpectedResult.quickfact.description);
        });
    });
    describe("results", () =>
    {
        it("should get link", () =>
        {
            const index = 1;
            const expected_example = ExpectedResult.results[index];
            const result_example = result.results[index];
            strictEqual(result_example.title, expected_example.title);
            strictEqual(result_example.link, expected_example.link);
        });
    });
});