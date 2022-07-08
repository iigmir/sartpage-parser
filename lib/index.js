import StartpageParser from "./class.js";

export default (input = `<!DOCTYPE html><p>Hello world</p>`) =>
{
    const app = new StartpageParser(input);
    if( app.successed === false )
    {
        return {
            message: app.document.title,
        };
    }
    return {
        keyword: app.keyword,
        date: app.date,
        region: app.region,
        filter: app.filter,
        quickfact: app.quickfact,
        results: app.results,
        request: app.search_params,
    };
};
