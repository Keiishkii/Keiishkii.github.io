window.addEventListener("load", function()
{
    LoadNavigationPanel();
});

window.addEventListener("resize", function ()
{
    OnResizeOfWindow();
});

function LoadNavigationPanel()
{
    document.getElementById("navigation_panel").innerHTML = '' +
        '<div class = "navigation_box">' +
        '   <div class = "navigation_bar">' +
        '       <div class = "navigation_bar_content_background">' +
        '           <ul>' +
        '               <li>' +
        '                   <a href = "./index.html">' +
        '                       <div class = "navigation_bar_content">' +
        '                           <h1>Home</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href = "./bournemouth-university.html">' +
        '                       <div class = "navigation_bar_content">' +
        '                           <h1>Bournemouth University</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="./incisiv.html">' +
        '                       <div class = "navigation_bar_content">' +
        '                           <h1>INCISIV</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="https://www.google.com">' +
        '                       <div class = "navigation_bar_content">' +
        '                           <h1>BCHons</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="https://www.google.com">' +
        '                       <div class = "navigation_bar_content">' +
        '                           <h1>Projects</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '               </li>' +
        '           </ul>' +
        '           <div class = "navigation_edge"></div>' +
        '       </div>' +
        '   </div>' +
        '</div>'

    return null;
}

function OnResizeOfWindow()
{
    let bannerHeight = document.getElementById("banner").clientHeight;

    let root = document.documentElement;

    root.style.setProperty("--navigation_panel_top_margin", bannerHeight + "px");
    console.log(root.style.getPropertyValue("--navigation_panel_top_margin"));
}