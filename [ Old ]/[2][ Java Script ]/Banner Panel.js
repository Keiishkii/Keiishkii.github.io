window.addEventListener("load", function()
{
    LoadBannerPanel();
});

function LoadBannerPanel()
{
    let bannerTitle = document.getElementById("banner").innerHTML;
    document.getElementById("banner").innerHTML = '' +
        '<div class = "banner_foreground">' +
        '   <h1>' + bannerTitle + '</h1>' +
        '</div>'
}