window.addEventListener("load", function()
{
    LoadFooterPanel();
});

function LoadFooterPanel()
{
    document.getElementById("footer_panel").innerHTML = '' +
        '<div class = "footer\">' +
        '   <div class = "footer_background\"></div>' +
        '   <div id = footer_background_decor></div>' +
        '' +
        '   <div class = "footer_foreground\"></div>' +
        '   <div id = footer_decor></div>' +
        '' +
        '   <a href = "https://github.com/Keiishkii\"><div id = github_icon></div></a>' +
        '   <a href = "https://www.linkedin.com/in/charlie-lloyd-buckingham-4b645b169/\"><div id = linkedin_icon></div></a>' +
        '   <a href = "https://www.youtube.com/user/keiishkii\"><div id = youtube_icon></div></a>' +
        '   <a href = "mailto:keiishkii@gmail.com\"><div id = email_icon></div></a>' +
        '</div>'
}