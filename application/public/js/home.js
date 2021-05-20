function createImage(url, thumb, title){
    var html = '<a href="'+ url +'" ><div class="page post-media"><ul class="post-list"><li><img class="post-image"></li><li><p class="photo-title"></p></li></ul></div></a>';
    let i = document.createElement('div');
    i.className = "post-wrapper";
    i.innerHTML = html;
    i.getElementsByTagName('img')[0].src = thumb;
    i.getElementsByClassName("photo-title")[0].innerHTML = title;
    i.style.transition = "opacity 0.5s";
    /*i.addEventListener('click', function(){
        window.location.replace(url);
        //i.style.opacity = 0;
    });*/
    i.addEventListener("transitionend", function(){
        i.remove();
        num_objects--;
        document.getElementById("photo-count").innerHTML = "" + num_objects + " photos";
    });
    document.getElementById("page-posts").appendChild(i);
    
}
var num_objects = 0;
window.onload = function(){

    console.log('flash?');
    let flashElement = document.getElementById("flash-message");
    if(flashElement)
    {
        console.log(flashElement);
        flashTimeout(flashElement);
    }
    fetch('/post/get')
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        data_json.results.forEach(element => {
            createImage(`/post/posts/${element.postid}`, `/public/images/uploads/${element.thumb}`,  element.post_title)
        });
    })
    /*var html = '<div class="page post-media"><ul class="post-list"><li><img class="post-image"></li><li><p class="photo-title"></p></li></ul></div>';
    var json_objects = new XMLHttpRequest();
    var objects = "";
    json_objects.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("recieved");
            objects = this.responseText;
            let json_array = JSON.parse(objects);
            console.log(json_array);

            json_array.forEach(function(e){
                console.log(e.url);
                createImage(e.url, e.title);
                num_objects++;
                
            });
            document.getElementById("photo-count").innerHTML = "" + num_objects + " photos";

        }
    }
    json_objects.open("GET", "http://jsonplaceholder.typicode.com/albums/2/photos", true);
    json_objects.send();*/
}

function executesearch()
{
    console.log(document.getElementById("search-text").value);
    let searchTerm = document.getElementById("search-text").value;
    fetch(`/post/search?search=${searchTerm}`)
    .then((data) => {
        document.getElementById("page-posts").innerHTML = '';
        console.log("got it");
        return data.json();
        //console.log(data.message);
    })
    .then((data_json) => {
        console.log(data_json);
        data_json.results.forEach(element => {
            createImage(`/post/posts/${element.postid}`, `/public/images/uploads/${element.thumb}`,  element.post_title);
        })

    });
}

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