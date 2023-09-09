window.addEventListener('resize', () => PageManager.OnPageResized(), false);
document.addEventListener('DOMContentLoaded', function()
{
    PageManager.OnPageLoad();
}, false);

const PageManager =
{
    preInitialisation: new Event("pre-initialisation"),
    initialisation: new Event("initialisation"),
    postInitialisation: new Event("post-initialisation"),

    pageResized: new Event("page-resized"),

    OnPageLoad: function OnPageLoad()
    {
        IncludeHTML.IncludeHTML(PageManager.Initialise);
        //test(PageManager.Initialise);
    },

    OnPageResized: function OnPageResized()
    {
        document.dispatchEvent(PageManager.pageResized);
    },

    Initialise: function Initialise()
    {
        document.dispatchEvent(PageManager.preInitialisation);
        document.dispatchEvent(PageManager.initialisation);
        document.dispatchEvent(PageManager.postInitialisation);
    }
}


function test(callback)
{
    callback();
}

function log()
{
    console.log("AAAAA")
}