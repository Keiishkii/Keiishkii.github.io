window.addEventListener('resize', () => PageManager.OnPageResized(), false);
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

    update: new Event("update"),
    pageResized: new Event("page-resized"),

    timeSincePageLoad: 0,


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

        window.requestAnimationFrame(PageManager.Update);
    },

    Update: function Update(timeStamp)
    {
        PageManager.timeSincePageLoad = timeStamp / 1000;

        document.dispatchEvent(PageManager.update);
        window.requestAnimationFrame(PageManager.Update);
    }
}