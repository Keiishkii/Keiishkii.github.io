document.addEventListener('page-resized', () => GalleryLayout.OnWindowResized(), false);
document.addEventListener('initialisation', () => GalleryLayout.OnPageLoad(), false);
document.addEventListener('update', () => GalleryLayout.Update(), false);

const GalleryLayout =
{
    gridLayoutContainerElement: { },
    imageDisplayElement: {},
    tileScaleSlider: {},

    cellCount: 0,

    minimumSizeOfGridCell: 200,
    maximumSizeOfGridCell: 500,

    minimumSizeOfCellFont: 14,
    maximumSizeOfCellFont: 32,

    scaleWeight: 0,

    focusGainScaleTransitionDuration: 0.125,
    focusLossScaleTransitionDuration: 0.25,

    minImageScale: 0.9,
    maxImageScale: 1,

    focusLogicDictionary: {},

    OnPageLoad: function OnPageLoad()
    {
        GalleryLayout.gridLayoutContainerElement = document.getElementById("gallery_grid");
        GalleryLayout.imageDisplayElement = document.getElementById("image_display");
        GalleryLayout.tileScaleSlider = document.getElementById("tile-scaling-slider");

        GalleryLayout.scaleWeight = GalleryLayout.tileScaleSlider.value / 100;

        let listOfCells = document.getElementsByClassName('cell-image');
        GalleryLayout.cellCount = listOfCells.length;

        GalleryLayout.ResizeCells();
        GalleryLayout.ResizeLayout();

        for (let i = 0; i < listOfCells.length; i++)
        {
            listOfCells[i].setAttribute('customID', "ID: " + i);

            listOfCells[i].addEventListener('mouseover', GalleryLayout.OnFocusGain);
            listOfCells[i].addEventListener('mouseout', GalleryLayout.OnFocusLost);
            listOfCells[i].addEventListener("click", () =>
            {
                let url = listOfCells[i].style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];

                let text = "textContent" in document.body ? "textContent" : "innerText";
                let title = listOfCells[i].getElementsByTagName("h1")[0][text];
                console.log(`Title: ${title}`);

                GalleryLayout.DisplayImage(url, title);
            });
        }

        GalleryLayout.imageDisplayElement.addEventListener("click", GalleryLayout.HideImage);
        GalleryLayout.tileScaleSlider.addEventListener("input", () => GalleryLayout.OnTileScalingSliderChange(GalleryLayout.tileScaleSlider.value / 100));
    },

    OnWindowResized: function OnWindowResized() { GalleryLayout.ResizeLayout(); },

    ResizeCells: function ResizeCells()
    {
        PageManager.root.style.setProperty('--cell_size', Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight) + "px");
        PageManager.root.style.setProperty('--cell_font_size', Maths.Lerp(GalleryLayout.minimumSizeOfCellFont, GalleryLayout.maximumSizeOfCellFont, GalleryLayout.scaleWeight) + "px");
        PageManager.root.style.setProperty('--min_cell_scale', GalleryLayout.minImageScale);
    },

    ResizeLayout: function ResizeLayout()
    {
        let pageSize = document.body.clientWidth;
        let cellSize = Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight);

        let baseWidth = (pageSize * 0.9) - 40

        let layout = "auto";
        let width = 40 + cellSize;

        if (cellSize > 0)
        {
            let count = 0;
            for (let remainingColumnArea = baseWidth - cellSize; remainingColumnArea > cellSize; remainingColumnArea -= cellSize)
            {
                if (count >= GalleryLayout.cellCount - 1) break;

                count++;
                layout += " auto";
                width += cellSize;
            }
        }

        PageManager.root.style.setProperty('--gallery_content_layout_width', width + "px");
        PageManager.root.style.setProperty('--gallery_layout', layout);
    },


    Update: function Update()
    {
        for (let key in GalleryLayout.focusLogicDictionary) GalleryLayout.focusLogicDictionary[key].next(key);
    },

    OnFocusGain: function OnFocusGain(event)
    {
        let id = event.target.getAttribute('customID');
        GalleryLayout.focusLogicDictionary[id] = GalleryLayout.ProcessFocusGain(event.target, id);
    },

    OnFocusLost: function OnFocusLost(event)
    {
        let id = event.target.getAttribute('customID');
        GalleryLayout.focusLogicDictionary[id] = GalleryLayout.ProcessFocusLoss(event.target, id);
    },

    ProcessFocusGain: function* ProcessFocusGain(element, id)
    {
        let width = element.style.width;
        let weight = 0;
        if (width)
        {
            let size = parseFloat(width);
            let scale = size / Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight);
            weight = Maths.InverseLerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, scale);
        }

        for (let timeElapsed = Maths.Lerp(0, GalleryLayout.focusGainScaleTransitionDuration, weight); timeElapsed < GalleryLayout.focusGainScaleTransitionDuration; timeElapsed += PageManager.deltaTime)
        {
            let weight = Maths.InverseLerp(0, GalleryLayout.focusGainScaleTransitionDuration, timeElapsed);
            GalleryLayout.SetElementState(element, weight);

            yield;
        }

        GalleryLayout.SetElementState(element, 1);
        delete GalleryLayout.focusLogicDictionary[id];
    },

    ProcessFocusLoss: function* ProcessFocusLoss(element, id)
    {
        let width = element.style.width;
        let weight = 1;
        if (width)
        {
            let size = parseFloat(width);
            let scale = size / Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight);
            weight = Maths.InverseLerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, scale);
        }

        for (let timeElapsed = Maths.Lerp(0, GalleryLayout.focusLossScaleTransitionDuration, weight); timeElapsed > 0; timeElapsed -= PageManager.deltaTime)
        {
            let weight = Maths.InverseLerp(0, GalleryLayout.focusLossScaleTransitionDuration, timeElapsed);
            GalleryLayout.SetElementState(element, weight);

            yield;
        }

        GalleryLayout.ResetElementState(element);
        delete GalleryLayout.focusLogicDictionary[id];
    },

    SetElementState: function SetElementState(element, weight)
    {
        let minOffset = (1 - GalleryLayout.minImageScale) / 2;
        let maxOffset = (1 - GalleryLayout.maxImageScale) / 2;

        let size = Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight) * Maths.Lerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, weight);
        let offset = Maths.Lerp(GalleryLayout.minimumSizeOfGridCell, GalleryLayout.maximumSizeOfGridCell, GalleryLayout.scaleWeight) * Maths.Lerp(minOffset, maxOffset, weight);

        element.style.width = size + "px";
        element.style.height = size + "px";

        element.style.left = offset + "px";
        element.style.top = offset + "px";
    },

    ResetElementState: function ResetElementState(element)
    {
        element.style.width = "calc(var(--cell_size) * var(--min_cell_scale))";
        element.style.height = "calc(var(--cell_size) * var(--min_cell_scale))";

        element.style.left = "calc(var(--cell_size) * ((1 - var(--min_cell_scale)) / 2))";
        element.style.top = "calc(var(--cell_size) * ((1 - var(--min_cell_scale)) / 2))";
    },



    DisplayImage: function DisplayImage(imageURl, title)
    {
        GalleryLayout.imageDisplayElement.style.display = "block";
        PageManager.EnableScrollLock();

        let imageElement = document.getElementById("image");
        let imageTitleElement = document.getElementById("display-text").getElementsByTagName("h1")[0];

        imageElement.style.backgroundImage = `url("${imageURl}")`;
        imageTitleElement.innerHTML = title;

        let image = new Image();
        image.src = imageURl;

        image.onload = () =>
        {
            let targetScale = 0.7;

            let imageScale = (targetScale * window.innerWidth) / image.width;
            if (imageScale * image.height > targetScale * window.innerHeight) imageScale = (targetScale * window.innerHeight) / image.height;

            imageElement.style.width = (image.width * imageScale) + "px";
            imageElement.style.height = (image.height * imageScale) + "px";

            imageElement.style.position = "absolute";
            imageElement.style.top = (100 * ((1 - ((image.height * imageScale) / window.innerHeight)) / 2)) + "%";
            imageElement.style.left = (100 * ((1 - ((image.width * imageScale) / window.innerWidth)) / 2)) + "%";

            console.log(imageTitleElement)
            imageTitleElement.style.top = (100 * ((1 - ((image.height * imageScale) / window.innerHeight)) / 2)) + "%";
            console.log(imageTitleElement.style.top)
        };
    },

    HideImage: function HideImage()
    {
        GalleryLayout.imageDisplayElement.style.display = "none";
        PageManager.DisableScrollLock();
    },

    OnTileScalingSliderChange: function OnTileScalingSliderChange(value)
    {
        console.log("Value:" + value);
        GalleryLayout.scaleWeight = value;

        GalleryLayout.ResizeCells();
        GalleryLayout.ResizeLayout();
    },
}