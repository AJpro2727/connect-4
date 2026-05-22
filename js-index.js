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

/* plasserer brikker i trejde seksjon */

const pieceEls = document.querySelectorAll(".piece")

const observer2 = new IntersectionObserver(function(entries){
    for (const entry of entries){

        if (entry.isIntersecting){
            entry.target.classList.add("pieceActive")
            observer2.unobserve(entry.target)
        }
    }
})

for (const pieceEl of pieceEls){
    pieceEl.style.animationDelay = `${pieceEl.dataset.drop * 0.10}s`
    observer2.observe(pieceEl)
}
