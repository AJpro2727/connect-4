

const navEl = document.querySelector("nav")
const burgerEl = document.querySelector(".burger")
const crossEl = document.querySelector(".cross")

burgerEl.addEventListener("click", function(){
    navEl.classList.toggle("active")
})
crossEl.addEventListener("click", function(){
    navEl.classList.toggle("active")
})
