document.addEventListener('page-resized', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('initialisation', () =>
{
    NavigationBanner.OnPageLoad()
}, false);

document.addEventListener('update', () =>
{
    NavigationBanner.Update()
}, false);

const NavigationBanner =
{
    titleBanner: { },
    titleBannerText: { },
    navigationBanner: { },

    lastLinkElement: {},

    minFontSize: 16,
    minHeightSize: 25,


    OnPageLoad: function OnPageLoad()
    {
        console.log("OnPageLoad")

        NavigationBanner.titleBanner = document.getElementById("title_banner");
        NavigationBanner.titleBannerText = document.getElementById("title_banner_foreground").querySelector('h1');

        NavigationBanner.navigationBanner = document.getElementById("navigation_banner_container");
        NavigationBanner.OnWindowResized();

        let navigationLinkElements = document.getElementById("navigation_banner").getElementsByTagName("li");

        NavigationBanner.lastLinkElement = navigationLinkElements.item(navigationLinkElements.length - 1);
    },

    Update: function Update()
    {
        let innerRingRadius = 40 + 33 * ((1 + Math.sin(PageManager.timeSincePageLoad * 0.5)) / 2);
        let outerRingRadius = 65 + 10 * ((1 + Math.sin(PageManager.timeSincePageLoad * 0.5)) / 2);

        PageManager.root.style.setProperty('--inner_ring_radius', (innerRingRadius) + "%");
        PageManager.root.style.setProperty('--outer_ring_radius', (outerRingRadius) + "%");
    },

    OnWindowResized: function OnWindowResized()
    {
        let fontStyle = window.getComputedStyle(NavigationBanner.titleBannerText).getPropertyValue('font-size');
        let fontSize = parseFloat(fontStyle);

        let topDisplacement = NavigationBanner.titleBanner.clientHeight;

        let scaledFontSize = Math.max(NavigationBanner.minFontSize, (fontSize * 0.65));
        let scaledHeight = Math.max(NavigationBanner.minHeightSize, (topDisplacement * 0.5));

        NavigationBanner.navigationBanner.style.top = (topDisplacement - 1) + "px";

        PageManager.root.style.setProperty('--navigation_banner_font_size', (scaledFontSize) + "px");
        PageManager.root.style.setProperty('--navigation_banner_height', (scaledHeight) + "px");
        PageManager.root.style.setProperty('--navigation_banner_last_element_width', (scaledHeight) + "px");
    }
}
