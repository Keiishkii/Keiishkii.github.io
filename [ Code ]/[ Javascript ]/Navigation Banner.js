
window.addEventListener('resize', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('DOMContentLoaded', () => NavigationBanner.OnPageLoad(), false);

const NavigationBanner = {

    titleBanner : { },
    navigationBanner : { },



    OnPageLoad: function OnPageLoad()
    {
        NavigationBanner.titleBanner = document.getElementById("title_banner");
        NavigationBanner.navigationBanner = document.getElementById("navigation_banner_container");

        NavigationBanner.OnWindowResized();
    },

    OnWindowResized: function OnWindowResized()
    {
        let titleBannerHeight = NavigationBanner.titleBanner.clientHeight;
        NavigationBanner.navigationBanner.style.top = titleBannerHeight;
    }
}
