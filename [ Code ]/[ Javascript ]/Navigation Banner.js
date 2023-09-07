
window.addEventListener('resize', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('DOMContentLoaded', () => NavigationBanner.OnPageLoad(), false);

const NavigationBanner = {
    root: { },

    titleBanner: { },
    titleBannerText: { },
    navigationBanner: { },

    lastLinkElement: {},

    minFontSize: 16,
    minHeightSize: 25,


    OnPageLoad: function OnPageLoad()
    {
        NavigationBanner.root = document.querySelector(':root');

        NavigationBanner.titleBanner = document.getElementById("title_banner");
        NavigationBanner.titleBannerText = document.getElementById("title_banner_foreground").querySelector('h1');

        NavigationBanner.navigationBanner = document.getElementById("navigation_banner_container");
        NavigationBanner.OnWindowResized();

        let navigationLinkElements = document.getElementById("navigation_banner").getElementsByTagName("li");

        NavigationBanner.lastLinkElement = navigationLinkElements.item(navigationLinkElements.length - 1);
        let secondToLastLinkElement = navigationLinkElements.item(navigationLinkElements.length - 2);

        /*
        secondToLastLinkElement.addEventListener("mouseover", () =>
        {
            NavigationBanner.lastLinkElement.style.borderTopColor = "forestgreen"
        })

        secondToLastLinkElement.addEventListener("mouseout", () =>
        {
            NavigationBanner.lastLinkElement.style.borderTopColor = "#1A1A20"
        })
        */
    },

    OnWindowResized: function OnWindowResized()
    {
        let fontStyle = window.getComputedStyle(NavigationBanner.titleBannerText).getPropertyValue('font-size');
        let fontSize = parseFloat(fontStyle);

        let topDisplacement = NavigationBanner.titleBanner.clientHeight;

        let scaledFontSize = Math.max(NavigationBanner.minFontSize, (fontSize * 0.65));
        let scaledHeight = Math.max(NavigationBanner.minHeightSize, (topDisplacement * 0.5));

        NavigationBanner.navigationBanner.style.top = (topDisplacement - 1) + "px";

        NavigationBanner.root.style.setProperty('--navigation_banner_font_size', (scaledFontSize) + "px");
        NavigationBanner.root.style.setProperty('--navigation_banner_height', (scaledHeight) + "px");
        NavigationBanner.root.style.setProperty('--navigation_banner_last_element_width', (scaledHeight) + "px");
    }
}
