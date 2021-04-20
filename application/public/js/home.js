function createImage(url, title){
    var html = '<div class="page post-media"><ul class="post-list"><li><img class="post-image"></li><li><p class="photo-title"></p></li></ul></div>';
    let i = document.createElement('div');
    i.className = "post-wrapper";
    i.innerHTML = html;
    i.getElementsByTagName('img')[0].src = url;
    i.getElementsByClassName("photo-title")[0].innerHTML = title;
    i.style.transition = "opacity 0.5s";
    i.addEventListener('click', function(){
        i.style.opacity = 0;
    });
    i.addEventListener("transitionend", function(){
        i.remove();
        num_objects--;
        document.getElementById("photo-count").innerHTML = "" + num_objects + " photos";
    });
    document.getElementById("page-posts").appendChild(i);
    
}
var num_objects = 0;
window.onload = function(){
    var html = '<div class="page post-media"><ul class="post-list"><li><img class="post-image"></li><li><p class="photo-title"></p></li></ul></div>';
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
    json_objects.send();
}