window.addEventListener("load", function()
{
    LoadBannerPanel();
});

function LoadBannerPanel()
{
    let bannerTitle = document.getElementById("title_banner").innerHTML;
    document.getElementById("title_banner").innerHTML = '' +
        '<div class = "title_banner_foreground">' +
        '   <h1>' + bannerTitle + '</h1>' +
        '</div>'
}