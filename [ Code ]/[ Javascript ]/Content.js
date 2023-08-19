
window.addEventListener('resize', () => Content.OnWindowResized(), false);
document.addEventListener('DOMContentLoaded', () => Content.OnPageLoad(), false);



const Content =
{
    contentContainer: {},

    minimumTopMargin: {},

    centeringTopMargin: {},
    centeringBottomMargin: {},


    OnPageLoad: function OnPageLoad()
    {
        Content.contentContainer = document.getElementById("content_container");

        Content.minimumTopMargin = 180;

        Content.centeringTopMargin = 160;
        Content.centeringBottomMargin = 80;

        Content.RecalculateTopMargin();
    },

    OnWindowResized: function OnWindowResized()
    {
        Content.RecalculateTopMargin();
    },

    RecalculateTopMargin: function RecalucalteTopMargin()
    {
        let margin = (((Content.centeringTopMargin + window.innerHeight - Content.centeringBottomMargin) * 0.5) - (Content.contentContainer.clientHeight * 0.5));
        let trueMargin = Math.max(margin, Content.minimumTopMargin);

        console.log("AAA: " + trueMargin);
        Content.contentContainer.style.marginTop = trueMargin + "px";
    }
}