


window.onload = function(){

    console.log('flash?');
    let flashElement = document.getElementById("flash-message");
    if(flashElement)
    {
        console.log(flashElement);
        flashTimeout(flashElement);
    }
    if(document.forms[0])
    {
        console.log("forms");
    }
    else
    {
        console.log("no forms")
    }
    var forms = document.forms["reg-form"];
    var uname_temp = "";
    var pswd_temp = "";
    var uname_flag = false;
    var email_flag = false;
    var pswd_flag = false;
    var c_pswd_flag = false;
    console.log("sfsdf");
    forms["uname"].oninput = function(){
        uname_temp = forms["uname"].value;
        if(!(uname_temp[0].match(/[a-zA-Z]/) && uname_temp.length >= 3))
        {
            console.log(forms["uname"]);
            forms["uname"].nextElementSibling.innerHTML = "username must begin with letter and be >3 characters";
            forms["uname"].style.borderColor = "red";
            uname_flag = false;
        }
        else
        {
            forms["uname"].nextElementSibling.innerHTML = "";
            forms["uname"].style.borderColor = "green";
            uname_flag = true;
        }
        

    };
    forms.onsubmit = function(){
        uname_temp = forms["uname"].value;
        if(!(uname_flag && email_flag && pswd_flag && c_pswd_flag))
        {
            console.log("sfgsagasdgasdgasd");
            alert("one or more of your field submissions is invalid");
            return false;
        }
        else
        {
            if(forms["age-conf"].checked === false)
            {
                alert("you must be 13+");
                return false;
            }
            else if(forms["tos"].checked === false)
            {
                alert("you must accept tos");
                return false;
            }
            return true;
        }
        

    };
    forms["email"].oninput = function(){
        let email_temp = forms["email"].value;
        if(!(email_temp.match(/[a-zA-Z0-9]+@[a-zA-Z0-9_\-]+\.[a-zA-Z]+/)))
        {
            forms["email"].nextElementSibling.innerHTML = "must be valid email";
            forms["email"].style.borderColor = "red";
            email_flag = false;
        }
        else
        {
            forms["email"].nextElementSibling.innerHTML = "";
            forms["email"].style.borderColor = "green";
            email_flag = true;
        }
        

    };
    forms["pswd"].oninput = function(){
        pswd_temp = forms["pswd"].value;
        if((pswd_temp.search(/[A-Z]+/) === -1) || (pswd_temp.search(/[0-9]+/) === -1) || (pswd_temp.search(/[!@\^\/#-&\*\+\-]/) === -1))
        {
            forms["pswd"].nextElementSibling.innerHTML = "password must contain 1+ upper case 1+ number and special character";
            forms["pswd"].style.borderColor = "red";
            pswd_flag = false;
        }
        else
        {
            if(pswd_temp.length < 8)
            {
                forms["pswd"].nextElementSibling.innerHTML = "password must be >8 characters";
                forms["pswd"].style.borderColor = "red";
                pswd_flag = false;
            }
            else
            {
                forms["pswd"].nextElementSibling.innerHTML = "";
                forms["pswd"].style.borderColor = "green";
                pswd_flag = true;
            }
        }
        

    };
    forms["c-pswd"].oninput = function(){
        if(forms["c-pswd"].value != pswd_temp)
        {
            forms["c-pswd"].nextElementSibling.innerHTML = "must match password";
            forms["c-pswd"].style.borderColor = "red";
            c_pswd_flag = false;
        }
        else
        {
            forms["c-pswd"].nextElementSibling.innerHTML = "";
            forms["c-pswd"].style.borderColor = "green";
            c_pswd_flag = true;
        }
        

    };
    forms["submit"].onclick = function(){
        forms["submit"].style.backgroundColor = "red";
        

    };

};

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
