document.addEventListener('DOMContentLoaded', function()
{
    InsertAdditionalHTML();
}, false);

function InsertAdditionalHTML()
{
    /* Loop through a collection of all HTML elements: */
    let elementList = document.getElementsByTagName("*");
    for (let i = 0; i < elementList.length; i++)
    {
        let element = elementList[i];

        let file = element.getAttribute("insert-html");
        InsertHTMLIntoDocumentBody(element, file);

        //let headFile = element.getAttribute("insert-html-in-head");
        //InsertHTMLIntoDocumentHead(element, headFile);
    }
}

function InsertHTMLIntoDocumentHead(element, file)
{
    if (!file) return;

    /* Make an HTTP request using the attribute value as the file name: */
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            if (this.status === 200)
            {
                console.log("Is element of head");

                let headElement = document.createElement("div");
                headElement.innerHTML = this.responseText;

                document.head.appendChild(headElement);

                let elementList = headElement.getElementsByTagName("*");
                for (let i = 0; i < elementList.length; i++)
                {
                    elementList[i].addEventListener("load", () => {
                        console.log("File loaded")
                    });

                    elementList[i].addEventListener("error", (ev) => {
                        console.log("Error on loading file", ev);
                    });
                }
            }
            if (this.status === 404)
            {
                console.log("head element error");
            }

            element.removeAttribute("insert-html-in-head");
            InsertAdditionalHTML();
        }
    }

    httpRequest.open("GET", file, true);
    httpRequest.send();
}

function InsertHTMLIntoDocumentBody(element, file)
{
    if (!file) return;
    console.log(file);

    /* Make an HTTP request using the attribute value as the file name: */
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            if (this.status === 200)
            {
                console.log("Is element of body");
                element.innerHTML = this.responseText;

            }
            if (this.status === 404)
            {
                console.log("body element error");
            }

            element.removeAttribute("insert-html");
            InsertAdditionalHTML();
        }
    }

    httpRequest.open("GET", file, false);
    httpRequest.send();
}