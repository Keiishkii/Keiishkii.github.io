document.addEventListener('page-resized', () => Background.OnWindowResized(), false);
document.addEventListener('initialisation', () => Background.OnPageLoad(), false);

const Background = {

    mousePosition: { x: 0, y: 0 },
    smoothedMousePosition: { x: 0, y: 0 },

    initialised: false,

    backgroundContainerElement: { },
    backgroundImageElement: { },

    shadowContainerElement: { },
    shadowImageElement: { },



    OnPageLoad: function OnPageLoad()
    {
        Background.backgroundContainerElement = document.getElementById("background_container");
        Background.backgroundImageElement = document.getElementById("background_image");

        Background.shadowContainerElement = document.getElementById("shadow_container");
        Background.shadowImageElement = document.getElementById("shadow_image");

        setInterval(Background.ProcessBackgroundLogic, 10);

        window.addEventListener('mousemove', (event) =>
        {
            Background.mousePosition = { x: event.clientX, y: event.clientY };
            if (!Background.initialised)
            {
                Background.smoothedMousePosition = { x: document.body.clientWidth * 0.5, y: document.body.clientHeight * 0.5 };
                Background.initialised = true;
            }
        });
    },

    OnWindowResized: function OnWindowResized()
    {
        Background.mousePosition = { x: 0, y: 0 };
        Background.smoothedMousePosition = { x: 0, y: 0 };
    },

    ProcessBackgroundLogic: function ProcessBackgroundLogic()
    {
        if (!Background.initialised)
        {
            Background.smoothedMousePosition = { x: document.body.clientWidth * 0.5, y: document.body.clientHeight * 0.5 };
            Background.mousePosition = { x: document.body.clientWidth * 0.5, y: document.body.clientHeight * 0.5 };
        }

        let lerpWeight = 0.025;
        Background.smoothedMousePosition = { x: Background.Lerp(Background.smoothedMousePosition.x, Background.mousePosition.x, lerpWeight), y: Background.Lerp(Background.smoothedMousePosition.y, Background.mousePosition.y, lerpWeight)};

        let sizeMultiplier = 1.05;
        let displacementMultiplier = (sizeMultiplier - 1);
        let displacementMultiplierHalf = displacementMultiplier * 0.5;

        let expandedBounds = { x: document.body.clientWidth * sizeMultiplier, y: document.body.clientHeight * sizeMultiplier };


        Background.backgroundContainerElement.style.width = expandedBounds.x + 'px';
        Background.shadowContainerElement.style.width = (expandedBounds.x) + 'px';

        Background.backgroundContainerElement.style.height = expandedBounds.y + 'px';
        Background.shadowContainerElement.style.height = (expandedBounds.y) + 'px';


        let displacementFromCenter = { x: Background.smoothedMousePosition.x - (expandedBounds.x * 0.5), y: Background.smoothedMousePosition.y - (expandedBounds.y * 0.5) };
        let weight = { x: (displacementFromCenter.x / (document.body.clientWidth * 0.5)) + (displacementMultiplier), y: (displacementFromCenter.y / (document.body.clientHeight * 0.5)) + (displacementMultiplier) };
        let invertedWeight = { x: weight.x * -1, y: weight.y * -1 }
        let motion = { x: (invertedWeight.x) * (document.body.clientWidth * displacementMultiplierHalf) - (document.body.clientWidth * displacementMultiplierHalf), y: (invertedWeight.y) * (document.body.clientHeight * displacementMultiplierHalf) - (document.body.clientHeight * displacementMultiplierHalf) }


        Background.backgroundContainerElement.style.left = (motion.x) + 'px';
        Background.shadowContainerElement.style.right = (motion.x) + 'px';

        Background.backgroundContainerElement.style.top = (motion.y) + 'px';
        Background.shadowContainerElement.style.bottom = (motion.y) + 'px';


        Background.backgroundImageElement.style.backgroundSize = "cover";
        Background.backgroundImageElement.style.height = (Background.backgroundContainerElement.clientHeight) + 'px';

        Background.shadowImageElement.style.backgroundSize = "cover";
        Background.shadowImageElement.style.height = (Background.shadowContainerElement.clientHeight) + 'px';
    },

    Lerp : function Lerp(start, end, value)
    {
        return ((1 - value) * start) + (value * end);
    }
};