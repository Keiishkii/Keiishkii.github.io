document.addEventListener('page-resized', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('initialisation', () =>
{
    NavigationBanner.OnPageLoad()
}, false);

document.addEventListener('update', () =>
{
    NavigationBanner.Update()
}, false);

const NavigationGroups = {
    Home: [
        { label: "Go to Home", action: () => window.location.href = "/index.html" }
    ],
    About: [
        { label: "About Me", action: () => window.location.href = "/Code/HTML/Pages/About Me.html" }
    ],
    Galleries: [
        { label: "Character Art Work", action: () => console.log("Character Art clicked") },
        { label: "3D Renders", action: () => console.log("3D Renders clicked") },
    ],
    Work: [
        { label: "INCISIV", action: () => console.log("INCISIV clicked") },
        { label: "Bournemouth University", action: () => console.log("Bournemouth University clicked") },
        { label: "Brighton MET College", action: () => console.log("Brighton MET College clicked") },
    ],
    Learning: [
        { label: "Unity", action: () => console.log("Unity clicked") },
        { label: "C# Tutorials", action: () => console.log("C# clicked") },
        { label: "Maths Resources", action: () => console.log("Math clicked") }
    ]
};

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
        let scaledHeight = Math.max(NavigationBanner.minHeightSize, (topDisplacement * 0.575));

        NavigationBanner.navigationBanner.style.top = (topDisplacement - 1) + "px";

        PageManager.root.style.setProperty('--navigation_banner_font_size', (scaledFontSize) + "px");
        PageManager.root.style.setProperty('--navigation_banner_height', (scaledHeight) + "px");
    },

    OnNavigationGroupPressed: function OnNavigationGroupPressed(navigationGroupKey, buttonElement)
    {
        console.log("Navigation Group Pressed: " + navigationGroupKey);

        const navigationGroup = NavigationGroups[navigationGroupKey];
        const dropdown = document.getElementById("dropdown");

        if (!navigationGroup) {
            console.warn("No menu found for key:", navigationGroup);
            return;
        }

        // Clear old content
        dropdown.innerHTML = "";

        // Populate new content
        navigationGroup.forEach(item => {
            const button = document.createElement("button");
            button.textContent = item.label;
            button.onclick = item.action;
            dropdown.appendChild(button);
        });

        // Show dropdown (you can style this however you want)
        const rect = buttonElement.getBoundingClientRect();

        dropdown.style.position = "fixed"; // keep it fixed
        dropdown.style.left = rect.left + "px";
        dropdown.style.top = rect.bottom + "px";
        dropdown.style.display = "block";    // --- Positioning logic ---
    }
}
