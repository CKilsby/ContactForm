const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
    e.preventDefault(); //Prevents form from submitting
    statusTxt.style.display = "block";
    statusTxt.style.color = "#0D6EFD";

    let xhr = new XMLHttpRequest(); //creating new xml objects
    xhr.open("POST", "message.php", true); //sending post request to message.php file
    xhr.onload = ()=>{ //once ajax loaded
        if(xhr.readyState == 4 && xhr.status == 200){ //if ajax response status is 200 & ready status is 4 means there are no errors
            let response = xhr.response; //storing ajax response in a response variable
            if(response.indexOf("Email and password field is required!") != -1 || response.indexOf("Enter a valid email address") || response.indexOf("Sorry, failed to send your message!")){
                statusTxt.style.color = "red";
            }
            statusTxt.innerText = response;
        }else{
            form.reset();
            setTimeout(()=>{
                statusTxt.style.display = "none";
            }, 3000);
        }
    }
    let formData = new FormData(form); 
    xhr.send(formData);
}