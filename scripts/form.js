function updateRating(value) {
    document.getElementById("currentRating").innerText = value;
}

const ratingInput = document.getElementById("rating");
ratingInput.addEventListener("input", function() {
    updateRating(this.value);
});

const confirm = document.getElementById("confirm")
confirm.addEventListener('blur', ()=>{
    const password= document.getElementById("password")
    if (password.value != confirm.value){
        document.getElementById("message").innerHTML="Passwords do not match!"
        password.focus()    
    }
    else{
        document.getElementById("message").innerHTML=""
    }
})