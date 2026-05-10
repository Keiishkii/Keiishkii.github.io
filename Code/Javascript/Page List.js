document.addEventListener('initialisation', () =>
{
    PageList.OnPageLoad()
}, false);

const PageList =
{
    root: { },

    pageListEntries: [],
    pageListEntryContents: [],
    pageListEntryPreviewShadows: [],

    OnPageLoad: function OnPageLoad()
    {
        PageList.root = document.querySelector(':root');

        PageList.pageListEntries = document.getElementsByClassName("page_preview_container");
        for (let i = 0; i < PageList.pageListEntries.length; i++)
        {
            PageList.pageListEntryContents.push(PageList.pageListEntries[i].getElementsByClassName("page_preview_content")[0]);
            PageList.pageListEntryPreviewShadows.push(PageList.pageListEntries[i].getElementsByClassName("page_preview_image_shadow")[0]);

            let index = i;
            PageList.pageListEntryContents[index].addEventListener("mouseover", (event) =>
            {
                PageList.pageListEntries[index].style.setProperty('--pagePreviewShadowBackgroundColour', "#FFFFFF66");
            });
            PageList.pageListEntryContents[index].addEventListener("mouseleave", (event) =>
            {
                PageList.pageListEntries[index].style.setProperty('--pagePreviewShadowBackgroundColour', "black");
            });
        }
    }
}