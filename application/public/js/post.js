function executecomment()
{
    //console.log(document.getElementById("comment-text").value);
    let c = {comment: document.getElementById("comment-text").value};
    console.log(c);
    fetch("/comment", {method: "POST", headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(c)})
      .then(() => {
        document.getElementById("comments-table").innerHTML = '';
        document.getElementById("comment-text").value = '';
        fetch("/comment/get")
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            console.log(data_json.results);
            data_json.results.forEach(element => {
                console.log(element);
                fetch(`/user/details/${element.fkuserid}`)
                .then((d) => {
                    return d.json();
                })
                .then((d_json) => {
                    document.getElementById("comments-table").innerHTML += `<tr id="comment-${element.commentid}"><div>${d_json.username}</div><div>${element.comment}</div></tr>`;
    
    
                })
                
            });
        })
          
      });
      
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
    fetch("/comment/get")
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        console.log(data_json.results);
        data_json.results.forEach(element => {
            console.log(element);
            fetch(`/user/details/${element.fkuserid}`)
            .then((d) => {
                return d.json();
            })
            .then((d_json) => {
                document.getElementById("comments-table").innerHTML += `<tr id="comment-${element.commentid}"><div>${d_json.username}</div><div>${element.comment}</div></tr>`;


            })
            
        });
    })
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
