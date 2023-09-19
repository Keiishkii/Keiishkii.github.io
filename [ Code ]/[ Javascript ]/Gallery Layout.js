document.addEventListener('page-resized', () => GalleryLayout.OnWindowResized(), false);
document.addEventListener('initialisation', () => GalleryLayout.OnPageLoad(), false);
document.addEventListener('update', () => GalleryLayout.Update(), false);

const GalleryLayout =
{
    gridLayoutContainerElement: { },

    sizeOfGridCell: 350,

    scaleTransitionDuration: 0.125,
    minImageScale: 0.8,
    maxImageScale: 1,


    focusLogicDictionary: {},

    OnPageLoad: function OnPageLoad()
    {
        GalleryLayout.gridLayoutContainerElement = document.getElementById("gallery_grid");
        PageManager.root.style.setProperty('--cell_size', GalleryLayout.sizeOfGridCell + "px");

        GalleryLayout.ResizeLayout();

        let listOfCells = document.getElementsByClassName('cell-image');
        console.log("Count:" + listOfCells.length);
        for (let i = 0; i < listOfCells.length; i++)
        {
            listOfCells[i].setAttribute('customID', "ID: " + i);

            listOfCells[i].addEventListener('mouseover', GalleryLayout.OnFocusGain);
            listOfCells[i].addEventListener('mouseout', GalleryLayout.OnFocusLost);
        }
    },

    OnWindowResized: function OnWindowResized() { GalleryLayout.ResizeLayout(); },

    ResizeLayout: function ResizeLayout()
    {
        let pageSize = document.body.clientWidth;

        let baseWidth = (pageSize * 0.9) - 40

        let layout = "auto";
        let width = 40 + GalleryLayout.sizeOfGridCell;

        if (GalleryLayout.sizeOfGridCell > 0)
        {
            for (let remainingColumnArea = baseWidth - GalleryLayout.sizeOfGridCell; remainingColumnArea > GalleryLayout.sizeOfGridCell; remainingColumnArea -= GalleryLayout.sizeOfGridCell)
            {
                layout += " auto";
                width += GalleryLayout.sizeOfGridCell;
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
            let scale = size / GalleryLayout.sizeOfGridCell;
            weight = Maths.InverseLerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, scale);
        }

        for (let timeElapsed = Maths.Lerp(0, GalleryLayout.scaleTransitionDuration, weight); timeElapsed < GalleryLayout.scaleTransitionDuration; timeElapsed += PageManager.deltaTime)
        {
            let weight = Maths.InverseLerp(0, GalleryLayout.scaleTransitionDuration, timeElapsed);
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
            let scale = size / GalleryLayout.sizeOfGridCell;
            weight = Maths.InverseLerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, scale);
        }

        for (let timeElapsed = Maths.Lerp(0, GalleryLayout.scaleTransitionDuration, weight); timeElapsed > 0; timeElapsed -= PageManager.deltaTime)
        {
            let weight = Maths.InverseLerp(0, GalleryLayout.scaleTransitionDuration, timeElapsed);
            GalleryLayout.SetElementState(element, weight);

            yield;
        }

        GalleryLayout.SetElementState(element, 0);
        delete GalleryLayout.focusLogicDictionary[id];
    },

    SetElementState: function SetElementState(element, weight)
    {
        let minOffset = (1 - GalleryLayout.minImageScale) / 2;
        let maxOffset = (1 - GalleryLayout.maxImageScale) / 2;

        let size = GalleryLayout.sizeOfGridCell * Maths.Lerp(GalleryLayout.minImageScale, GalleryLayout.maxImageScale, weight);
        let offset = GalleryLayout.sizeOfGridCell * Maths.Lerp(minOffset, maxOffset, weight);

        element.style.width = size + "px";
        element.style.height = size + "px";

        element.style.left = offset + "px";
        element.style.top = offset + "px";
    },
}