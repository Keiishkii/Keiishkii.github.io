


window.addEventListener("resize", function ()
{
    OnResizeOfWindow();
});

function LoadNavigationPanel()
{
    document.getElementById("navigation_panel").innerHTML = '' +
        '<div class = "navigation_box">' +
        '   <div class = "navigation_banner">' +
        '       <div class = "navigation_banner_content_background">' +
        '           <ul>' +
        '               <li>' +
        '                   <a href = "./index.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>Home</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href = "./about-me.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>About Me</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href = "./bournemouth-university.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>Bournemouth University</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="./incisiv.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>INCISIV</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="./not-yet-implemented.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>BCHons</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '                   <a href="./not-yet-implemented.html">' +
        '                       <div class = "navigation_banner_content">' +
        '                           <h1>Projects</h1>' +
        '                       </div>' +
        '                   </a>' +
        '               </li>' +
        '               <li>' +
        '               </li>' +
        '           </ul>' +
        '           <div class = "navigation_banner_edge"></div>' +
        '       </div>' +
        '   </div>' +
        '</div>'

    return null;
}

function OnResizeOfWindow()
{
    let bannerHeight = document.getElementById("title_banner").clientHeight;

    let root = document.documentElement;

    root.style.setProperty("--navigation_panel_top_margin", bannerHeight + "px");
    console.log(root.style.getPropertyValue("--navigation_panel_top_margin"));
}