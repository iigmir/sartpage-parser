# sartpage-parser

A parser to get results and information on <www.startpage.com>.

## How to use

### Input

`Parser(HTML source code)`

```js
import Parser from "sartpage-parser";

Parser(`<!DOCTYPE html><p>Hello world</p>`)
```

### Output format

```json
{
    keyword: "Keyword that the page used",
    region: "Region parameter that the page used",
    date: "Date parameter that the page used",
    filter: "Is the page enabled family filter?",
    quickfact: {
        title: "Quickfact title if quickfact exists",
        link: "Quickfact link if quickfact exists. Mostly it will in *.wikipedia.org",
        subtitle: "Quickfact subtitle if quickfact exists",
        description: "Quickfact description if quickfact exists"
    },
    results: [{
        link: "Result link URL",
        title: "Result link title",
        description: "Result linkdescription"
    }, {
        ...
    }],
    request: {
        api: "The API endpoint. Mostly it will be /sp/search",
        params: {
            description: "Here will list parameters the API used"
        }
    }
};
```

## Commands

`npm run fs` to read and render file.

`npm test` or `npm run test` to run unit tests.
