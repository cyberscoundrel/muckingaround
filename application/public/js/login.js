function flashTimeout(element)
{
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05)
            {
                clearInterval(timer);
                element.remove();
                console.log('removed');
            }
            currentOpacity = currentOpacity - 0.05;
            element.style.opacity = currentOpacity;
        }, 50);
    },4000);
}

window.onload = function()
{
    console.log('flash?');
    let flashElement = document.getElementById("flash-message");
    if(flashElement)
    {
        console.log(flashElement);
        flashTimeout(flashElement);
    }
};