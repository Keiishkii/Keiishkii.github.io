function OnPageLoad()
{
    InsertAdditionalHTML()
}

function InsertAdditionalHTML()
{
    /* Loop through a collection of all HTML elements: */
    let elementList = document.getElementsByTagName("*");
    for (let i = 0; i < elementList.length; i++)
    {
        let element = elementList[i];

        let file = element.getAttribute("insert-html");
        if (file)
        {
            /* Make an HTTP request using the attribute value as the file name: */
            let httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function()
            {
                if (this.readyState === 4)
                {
                    if (this.status === 200)
                    {
                        if (document.body.contains(element))
                        {
                            console.log("Is element of body");
                            element.innerHTML = this.responseText;
                        }
                        else if (document.head.contains(element))
                        {
                            console.log("Is element of head");
                            document.head.appendChild(document.createElement(this.responseText));
                        }
                    }
                    if (this.status === 404)
                    {
                        if (document.body.contains(element))
                        {
                            console.log("Source not found for HTML injection into body");
                        }
                        else if (document.head.contains(element))
                        {
                            console.log("Source not found for HTML injection into head");
                            element.innerHTML = "Source not found.";
                        }
                    }

                    element.removeAttribute("insert-html");
                    InsertAdditionalHTML();
                }
            }

            httpRequest.open("GET", file, true);
            httpRequest.send();

            return;
        }
    }
}