document.addEventListener('page-resized', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('initialisation', () => NavigationBanner.OnPageLoad(), false);
document.addEventListener("click", (event) => NavigationBanner.OnGlobalMouseDown(event), false);
document.addEventListener('update', () => NavigationBanner.Update(), false);

const NavigationGroups = {
    Home: [
        { label: "Go to Home", action: () => window.location.href = "/Keiishkii.github.io/Code/index.html" }
    ],
    About: [
        { label: "About Me", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/AboutMe.html" }
    ],
    Galleries: [
        { label: "Character Art Work", action: () =>  window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/ConceptArtwork.html" },
        { label: "3D Renders", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/Renders.html" },
    ],
    Work: [
        { label: "INCISIV", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/INCISIV.html" },
        { label: "Bournemouth University", action: () =>  window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/BournemouthUniversity.html" },
        { label: "Brighton MET College", action: () =>  window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html" },
    ],
    Learning: [
        { label: "Unity", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html" },
        { label: "C# Tutorials", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html" },
        { label: "Maths Resources", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html" }
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

        document.querySelectorAll(".navigation_button_class").forEach(btn =>
        {
            btn.addEventListener("click", e =>
            {
                e.stopPropagation();
                NavigationBanner.OnNavigationGroupPressed(btn.dataset.group, btn);
            });
        });
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

        let scaledFontSize = 0.9 * Math.max(NavigationBanner.minFontSize, (fontSize * 0.65));
        let scaledHeight = 0.95 * Math.max(NavigationBanner.minHeightSize, (topDisplacement * 0.575));

        NavigationBanner.navigationBanner.style.top = (topDisplacement - 1) + "px";

        PageManager.root.style.setProperty('--navigation_banner_font_size', (scaledFontSize) + "px");
        PageManager.root.style.setProperty('--navigation_banner_height', (scaledHeight) + "px");
    },

    OnNavigationLinkPressed: function OnNavigationLinkPressed()
    {
        console.log("Navigation Link Pressed: " + navigationGroupKey);
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

        if (!dropdown.classList.contains("open"))
        {
            console.log("Setting Dropdown To Open")
            dropdown.classList.add("open")    // --- Positioning logic ---
        }

        // Clear old content
        dropdown.innerHTML = "";

        // Populate new content
        navigationGroup.forEach(item => {
            const button = document.createElement("button");
            button.onclick = item.action;
            dropdown.appendChild(button);

            const background = document.createElement("div");
            background.classList.add("dropdown_element_background");
            background.classList.add("background-image-multiply-blend");
            button.appendChild(background);

            const label = document.createElement("h1");
            label.textContent = item.label;
            button.appendChild(label);
        });

        // Show dropdown (you can style this however you want)
        const contentDiv = buttonElement.getElementsByClassName("navigation_banner_content")[0];
        const rect = buttonElement.getBoundingClientRect();

        dropdown.style.left = rect.left + "px";
        dropdown.style.top = rect.bottom + "px";

        PageManager.root.style.setProperty('--navigation_dropdown_height', (dropdown.scrollHeight) + "px");
    },

    OnGlobalMouseDown : function OnGlobalMouseDown(event)
    {
        const dropdown = document.getElementById("dropdown");

        // If dropdown is not open, ignore
        if (!dropdown.classList.contains("open")) return;

        // If click is inside dropdown, ignore
        if (dropdown.contains(event.target)) return;

        // If click is on a navigation button, ignore (your function handles it)
        if (event.target.closest(".navigation_button_class")) return;

        // Otherwise close
        dropdown.classList.remove("open");
        console.log("Setting Dropdown To Closed")
        dropdown.dataset.openFor = "";
    }
}
