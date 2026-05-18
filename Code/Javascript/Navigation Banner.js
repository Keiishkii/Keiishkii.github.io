document.addEventListener('page-resized', () => NavigationBanner.OnWindowResized(), false);
document.addEventListener('initialisation', () => NavigationBanner.OnPageLoad(), false);
document.addEventListener("click", (event) => NavigationBanner.OnGlobalMouseDown(event), false);
document.addEventListener('update', () => NavigationBanner.Update(), false);

const NavigationGroups = {
    Home: { action: () => window.location.href = "/Keiishkii.github.io/index.html" },
    AboutMe: [
        {
            label: "My Profile",
            action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/MyProfile.html"
        },
        {
            label: "My Career",
            children: [
                {
                    label: "INCISIV Ltd",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                },
                {
                    label: "MINE Cluster",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                }
            ],
        },
        {
            label: "My Education",
            action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
        }
    ],
    Galleries: [
        {
            label: "Concept Art",
            action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/ConceptArt.html"
        },
        {
            label: "Renders",
            action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/Renders.html"
        }
    ],
    Learning: [
        {
            label: "C# Programming",
            children: [
                {
                    label: "Variable Types",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                }
            ],
        },
        {
            label: "Unity",
            children: [
                {
                    label: "Basics",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                }
            ],
        },
        {
            label: "Blender",
            children: [
                {
                    label: "Rigging",
                    action: () => window.location.href = "/Keiishkii.github.io/Code/HTML/Pages/PageNotFound.html"
                }
            ]
        }
    ],
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

    OnNavigationGroupPressed: function OnNavigationGroupPressed(navigationGroupKey, buttonElement)
    {
        console.log("Navigation Group Pressed: " + navigationGroupKey);

        const navigationGroup = NavigationGroups[navigationGroupKey];
        const dropdown = document.getElementById("dropdown");

        if (!navigationGroup) {
            console.warn("No menu found for key:", navigationGroupKey);
            return;
        }

        if (!Array.isArray(navigationGroup)) {
            navigationGroup.action();
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
                    const isOpen = submenu.classList.toggle("open");
                    button.classList.toggle("open", isOpen);
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

        // If click is on a navigation button, ignore
        if (event.target.closest(".navigation_button_class")) return;

        // Close ALL open submenus
        dropdown.querySelectorAll(".open").forEach(el => el.classList.remove("open"));

        // Close main dropdown
        dropdown.classList.remove("open");
        console.log("Setting Dropdown To Closed")
        dropdown.dataset.openFor = "";
    }
}
