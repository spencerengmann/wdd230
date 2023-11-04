function updateRating(value) {
    document.getElementById("currentRating").innerText = value;
}

const ratingInput = document.getElementById("rating");
ratingInput.addEventListener("input", function() {
    updateRating(this.value);
});

const confirmPassword = document.getElementById("confirm");
confirmPassword.addEventListener("blur", () => {
    const password = document.getElementById("password");
    const message = document.getElementById("message");

    if (password.value !== confirmPassword.value) {
        message.innerHTML = "Passwords do not match!";
        password.value = "";
        confirmPassword.value = "";
        password.focus();
    } else {
        message.innerHTML = "";
    }
});
