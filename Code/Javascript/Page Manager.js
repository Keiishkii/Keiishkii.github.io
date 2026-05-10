window.addEventListener('resize', () => PageManager.OnPageResized(), false);
document.addEventListener('DOMContentLoaded', function()
{
    PageManager.OnPageLoad();
}, false);

const PageManager =
{
    root: { },

    preInitialisation: new Event("pre-initialisation"),
    initialisation: new Event("initialisation"),
    postInitialisation: new Event("post-initialisation"),

    update: new Event("update"),
    pageResized: new Event("page-resized"),

    timeSincePageLoad: 0,
    deltaTime: 0,

    topScrollPosition: 0,
    leftScrollPosition: 0,



    OnPageLoad: function OnPageLoad()
    {
        PageManager.root = document.querySelector(':root');
        IncludeHTML.IncludeHTML(PageManager.Initialise);
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
        let timeInSeconds = timeStamp / 1000;

        PageManager.deltaTime = timeInSeconds - PageManager.timeSincePageLoad;
        PageManager.timeSincePageLoad = timeInSeconds;

        document.dispatchEvent(PageManager.update);
        window.requestAnimationFrame(PageManager.Update);
    },



    EnableScrollLock: function disableScroll()
    {
        PageManager.topScrollPosition = window.scrollX || document.documentElement.scrollTop;
        PageManager.leftScrollPosition = window.scrollY || document.documentElement.scrollLeft,

        window.onscroll = function()
        {
            window.scrollTo(PageManager.leftScrollPosition, PageManager.topScrollPosition);
        };
    },

    DisableScrollLock: function enableScroll()
    {
        window.onscroll = function() {};
    },
}