document.addEventListener('pre-initialisation', function()
{
    //IncludeHTML.IncludeHTML();
}, false);

const IncludeHTML =
{
    Complete: true,

    IncludeHTML: function IncludeHTML(callback)
    {
        IncludeHTML.Complete = false;
        let z, i, element, file, xhttp;

        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++)
        {
            element = z[i];
            /*search for elements with a certain atrribute:*/
            file = element.getAttribute("html-include");
            if (file)
            {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function()
                {
                    if (this.readyState == 4)
                    {
                        if (this.status == 200)
                        {
                            element.innerHTML = this.responseText;
                            console.log("Injecting HTML")
                        }

                        if (this.status == 404)
                        {
                            element.innerHTML = "Page not found.";
                        }

                        /* Remove the attribute, and call this function once more: */
                        element.removeAttribute("html-include");
                        IncludeHTML(callback);
                    }
                }

                xhttp.open("GET", file, true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }

        console.log("COMPLETE");
        callback();
    }
}