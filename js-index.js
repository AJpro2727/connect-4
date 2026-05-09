/* reveal "how it works" section*/

const cardEls = document.querySelectorAll(".card")

const observer = new IntersectionObserver(function(entries){
   for (const entry of entries){
     if (entry.isIntersecting){
        entry.target.classList.add("card-active")
        const cardNrEl = entry.target.querySelector(".card-nr")
        cardNrEl.classList.add("card-nr-active")
        observer.unobserve(entry.target)
    }
   }
}, {threshold: 1
})

for (const cardEl of cardEls){
    observer.observe(cardEl)
}
