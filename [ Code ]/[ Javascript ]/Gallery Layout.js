document.addEventListener('page-resized', () => GalleryLayout.OnWindowResized(), false);
document.addEventListener('initialisation', () => GalleryLayout.OnPageLoad(), false);

const GalleryLayout =
{
    gridLayoutContainerElement: { },
    sizeOfGridCell: 350,

    OnPageLoad: function OnPageLoad()
    {
        GalleryLayout.gridLayoutContainerElement = document.getElementById("gallery_grid");
        PageManager.root.style.setProperty('--cell_size', GalleryLayout.sizeOfGridCell + "px");

        GalleryLayout.ResizeLayout();
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
}