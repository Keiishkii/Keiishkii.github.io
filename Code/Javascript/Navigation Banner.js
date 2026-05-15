document.addEventListener('page-resized', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('initialisation', () => NavigationBanner.OnPageLoad(), false);
document.addEventListener("click", (event) => NavigationBanner.OnGlobalMouseDown(event), false);
document.addEventListener('update', () => NavigationBanner.Update(), false);

const NavigationGroups = {
    About: [
        {
            label: "About Me",
            action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/AboutMe.html"
        },
        {
            label: "Career",
            children: [
                {
                    label: "INCISIV",
                    children: [
                        {
                            label: "Lead Developer",
                            children: [
                                { label: "2022", action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/INCISIV.html" }
                            ]
                        }
                    ]
                },
                {
                    label: "Brighton MET",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                }
            ]
        },
        {
            label: "Projects",
            children: [
                { label: "Unity Tools", action: () => console.log("Unity Tools") },
                { label: "Shaders", action: () => console.log("Shaders") }
            ]
        }
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

        document.querySelectorAll(".navigation_link").forEach(btn =>
        {
            btn.addEventListener("click", e =>
            {
                e.stopPropagation();
                NavigationBanner.OnNavigationLinkPressed(btn.dataset.group);
            });
        });

        document.querySelectorAll(".navigation_group").forEach(btn =>
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

    OnNavigationLinkPressed: function OnNavigationLinkPressed(navigationLinkKey)
    {
        console.log("Navigation Link Pressed: " + navigationLinkKey);

        const navigationLink = NavigationLinks[navigationLinkKey];
        const dropdown = document.getElementById("dropdown");

        if (!navigationLink) {
            console.warn("No menu found for key:", navigationLinkKey);
            return;
        };
    },

    OnNavigationGroupPressed: function OnNavigationGroupPressed(navigationGroupKey, buttonElement)
    {
        console.log("Navigation Group Pressed: " + navigationGroupKey);

        const navigationGroup = NavigationGroups[navigationGroupKey];
        const dropdown = document.getElementById("dropdown");

        if (!navigationGroup) {
            console.warn("No menu found for key:", navigationGroupKey);
            return;
        }

        if (!dropdown.classList.contains("open"))
        {
            console.log("Setting Dropdown To Open")
            dropdown.classList.add("open")    // --- Positioning logic ---
        }

        dropdown.innerHTML = "";
        NavigationBanner.BuildNavigationDropdown(navigationGroup, dropdown);

        // Show dropdown (you can style this however you want)
        const contentDiv = buttonElement.getElementsByClassName("navigation_banner_content")[0];
        const rect = buttonElement.getBoundingClientRect();

        dropdown.style.left = rect.left + "px";
        dropdown.style.top = rect.bottom + "px";

        PageManager.root.style.setProperty('--navigation_dropdown_height', (dropdown.scrollHeight) + "px");
    },

    BuildNavigationDropdown: function BuildNavigation(items, container)
    {
        items.forEach(item => {
            const button = document.createElement("button");
            button.classList.add("dropdown_item");

            const background = document.createElement("div");
            background.classList.add("dropdown_element_background", "background-image-multiply-blend");
            button.appendChild(background);

            const label = document.createElement("h1");
            label.textContent = item.label;
            button.appendChild(label);

            container.appendChild(button);

            // If the item has children, create a nested submenu
            if (item.children && item.children.length > 0) {
                button.classList.add("has-children");

                const submenu = document.createElement("div");
                submenu.classList.add("submenu");
                container.appendChild(submenu);

                // Recursively build children
                NavigationBanner.BuildNavigationDropdown(item.children, submenu);

                // Expand/collapse behaviour
                button.addEventListener("click", e => {
                    e.stopPropagation();
                    submenu.classList.toggle("open");
                });
            } else if (item.action) {
                // Leaf node → perform action
                button.addEventListener("click", item.action);
            }
        });
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
