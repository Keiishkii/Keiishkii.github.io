let mousePosition = { x: undefined, y: undefined };
let smoothedMousePosition = { x: undefined, y: undefined };
let backgroundElement;
let backgroundImageElement;
let initialised = false;

document.addEventListener('DOMContentLoaded', function()
{
    OnBackgroundLoad();
}, false);

function OnBackgroundLoad()
{
    backgroundElement = document.getElementById("page_background")
    backgroundImageElement = document.getElementById("background_image")

    setInterval(ProcessBackgroundLogic, 10);

    window.addEventListener('mousemove', (event) =>
    {
        mousePosition = { x: event.clientX, y: event.clientY };
        if (!initialised)
        {
            smoothedMousePosition = { x: mousePosition.x, y: mousePosition.y};
            initialised = true;
        }
    });
}


function ProcessBackgroundLogic()
{
    console.log("processing");
    console.log(mousePosition);

    if (!initialised) return;
    smoothedMousePosition = { x: Lerp(smoothedMousePosition.x, mousePosition.x, 0.1), y: Lerp(smoothedMousePosition.y, mousePosition.y, 0.1)};

    console.log(smoothedMousePosition);
    let expandedBounds = { x: document.body.clientWidth * 1.1, y: document.body.clientHeight * 1.1 };

    backgroundElement.style.width = expandedBounds.x + 'px';
    backgroundElement.style.height = expandedBounds.y + 'px';

    let displacementFromCenter = { x: smoothedMousePosition.x - (expandedBounds.x * 0.5), y: smoothedMousePosition.y - (expandedBounds.y * 0.5) };
    let weight = { x: (displacementFromCenter.x / (document.body.clientWidth * 0.5)) + 0.1, y: (displacementFromCenter.y / (document.body.clientHeight * 0.5)) + 0.1 };
    let invertedWeight = { x: weight.x * -1, y: weight.y * -1 }
    let motion = { x: (invertedWeight.x) * (document.body.clientWidth * 0.05) - (document.body.clientWidth * 0.05), y: (invertedWeight.y) * (document.body.clientHeight * 0.05) - (document.body.clientHeight * 0.05) }

    backgroundElement.style.left = (motion.x) + 'px';
    backgroundElement.style.top = (motion.y) + 'px';

    backgroundImageElement.style.backgroundSize = "cover";
    backgroundImageElement.style.height = (backgroundElement.clientHeight) + 'px';
}

function Lerp(start, end, value)
{
    return ((1 - value) * start) + (value * end);
}