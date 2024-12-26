let orderbtn = document.querySelector("#orderBtn")
let order = document.querySelector(".order")

orderbtn.addEventListener("click", function() {

orderbtn.style.display="none"
order.style.display="block"
anime({
    targets: ".order",
    opacity: 1,
    duration: 500,
    easing: "easeInOutQuad"
    });
})

