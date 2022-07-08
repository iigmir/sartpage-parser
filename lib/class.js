import jsdom from "jsdom";
const { JSDOM } = jsdom;

export default class StartpageParser {
    constructor(input = `<!DOCTYPE html><p>Empty DOM</p>`)
    {
        this.source = input;
    }
    get successed()
    {
        return this.document.title.trim() === "Startpage Search Results";
    }
    get document()
    {
        const dom = new JSDOM(this.source);
        return dom.window.document;
    }
    get_dom(selector = "p") {
        const default_props = {
            textContent: "",
            value: "",
            href: "",
            firstChild: { textContent: "" },
            querySelector: () => null
        };
        return this.document.querySelector(selector) ?? default_props;
    }
    // Meta infos
    get keyword()
    {
        const selector = "input[name='query']";
        const dom = this.get_dom(selector);
        return dom.value;
    }
    get date()
    {
        const selector = "#search-filter-time .search-filter-time__dropdown__text";
        const dom = this.get_dom(selector);
        return dom.textContent.trim();
    }
    get region()
    {
        const selector = "#search-filter-region .search-filter-region__dropdown__text";
        const dom = this.get_dom(selector);
        return dom.textContent.trim();
    }
    get filter()
    {
        const selector = "#search-filter-family .search-filter-family__field-text-value";
        const dom = this.get_dom(selector);
        return dom.textContent.trim();
    }
    // Quickfacts
    get quickfact()
    {
        const selector = ".sidebar-results";
        const dom = this.document.querySelector(selector);
        if( dom == null )
        {
            return {};
        }
        const img = dom.querySelector("img") ?? { src: "" };
        const link = dom.querySelector("a") ?? { textContent: "", href: "" };
        const description_dom = dom.querySelector(".wp-qi-sb__full-extract") ?? { firstChild: { textContent: "" } };
        const subtitle_dom = dom.querySelector(".wp-qi-sb__description") ?? { textContent: "" };
        const image = img.src === "" ? "" : `https://eu-browse.startpage.com/${img.src}`;
        return {
            image: image,
            title: link.textContent.trim(),
            link: link.href.trim(),
            subtitle: subtitle_dom.textContent.trim(),
            description: description_dom.firstChild.textContent.trim().replace(/(\r\n|\n|\r)/gm, "")
        };
    }
    get search_params()
    {
        const form = this.get_dom("form.pagination__form");
        if( form == null )
        {
            return {
                message: "No params on form",
            };
        }
        const inputs = [...form.querySelectorAll("input")];
        return {
            api: form.action,
            params: Object.fromEntries( inputs.map( ({ name, value }) => [name, value] )  )
        };
    }
    /**
    * @example 
    * ```
    * {
    link: "https://www.sap.com/index.html",
    title: "SAP Software Solutions | Business Applications and Technology",
    description: "Get software and technology solutions from SAP, the leader in business applications. Run simple with the best in cloud, analytics, mobile and IT solutions." 
}
    * ```
    */
    get results()
    {
        const links = [...this.document.querySelectorAll(".w-gl__result")];
        return links.map( item => {
            const result_link = item.querySelector(".w-gl__result-second-line-container .result-link");
            return {
                link: result_link.href,
                title: result_link.textContent.trim(),
                description: item.querySelector(".w-gl__description").textContent.trim(),
            }
        });
    }
};
