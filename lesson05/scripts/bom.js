const myinput = document.querySelector("#favchap")
const mybutton = document.querySelector("#mybutton")
const mylist = document.querySelector("#list")
mybutton.addEventListener("click", () => {
    if (myinput.value== "") {
        myinput.focus()
        return
    }
    let listitem = document.createElement("li");
    let deletebutton = document.createElement("button");
    listitem.textContent = myinput.value
    deletebutton.textContent = "❌"
    listitem.appendChild(deletebutton)
    mylist.appendChild(listitem)
    deletebutton.addEventListener("click", () => {
        listitem.remove()
    })
    myinput.focus()
    myinput.value = ""

})
