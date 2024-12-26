// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
  // Розділяємо всі куки на окремі частини
  const cookies = document.cookie.split(";");

  // Шукаємо куки з вказаним ім'ям
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Видаляємо зайві пробіли

    // Перевіряємо, чи починається поточне кукі з шуканого імені
    if (cookie.startsWith(cookieName + "=")) {
      // Якщо так, повертаємо значення кукі
      return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
    }
  }
  // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
  return "";
}







async function getProducts() {

let response = await fetch("store_db.json");
let products = await response.json();
console.log(products)
return products;
}

function getCardHTML(product) {

  let productData = JSON.stringify(product);

    return `
    <div class="card" data-id="${product.id}" style="width: 18rem;">
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.description}</p>
      <a href="#" class="btn btn-primary cart-btn" data-product='${productData}'>Придбати</a>
    </div>
  </div>
          `;
  }

getProducts().then(function (products) {
    let productsList = document.querySelector(".products-list");
    if (productsList) {
        products.forEach(function (product) {

            productsList.innerHTML += getCardHTML(product);


        });
        const cards = document.querySelectorAll(".card")
        cards.forEach((card)=>{
         card.addEventListener("click", function() {
          const cardId = card.getAttribute("data-id")
          window.location.assign(`details.html?id=${cardId}`);
         }) 
        })
    }
});

const btn = document.getElementById("cart-btn");

btn.addEventListener("click", function () {


    window.location.assign("card/card.html");
  });


  class ShoppingCart {
    constructor() {
    this.items = {};
    this.cartCounter = document.querySelector(".cart-counter");
    this.cartElement = document.querySelector("#cart-items");
    this.loadCartFromCookies();
    }

    addItem(item) {
      if (this.items[item.title]) {
        this.items[item.title].quantity += 1;
      } else {
        this.items[item.title] = item
        this.items[item.title].quantity = 1;
      }
      this.updateCounter();
      this.saveCartToCookies();
    }
    updateQuantity(itemTitle, newQuantity) {
      if (this.items[itemTitle]) {
        this.items[itemTitle].quantity = newQuantity;
        if (this.items[itemTitle].quantity == 0) {
          delete this.items[itemTitle];
        }
        this.updateCounter();
        this.saveCartToCookies();
      }
    }
  
    // Оновлення лічильника товарів
    updateCounter() {
      let count = 0;
      for (let key in this.items) {
        // проходимося по всіх ключах об'єкта this.items
        count += this.items[key].quantity; // рахуємо кількість усіх товарів
      }
      this.cartCounter.innerHTML = count; // оновлюємо лічильник на сторінці
    }
  
    // Зберігання кошика в кукі
    saveCartToCookies() {
      let cartJSON = JSON.stringify(this.items);
      document.cookie = `cart=${cartJSON}; max-age=${
        60 * 60 * 24 * 7
      }; path=/`;
    }
  
    // Завантаження кошика з кукі
    loadCartFromCookies() {
      let cartCookie = getCookieValue("cart");
      if (cartCookie && cartCookie !== "") {
        this.items = JSON.parse(cartCookie);
        this.updateCounter();
      }
    }
    // Обчислення загальної вартості товарів у кошику
    calculateTotal() {
      let total = 0;
      for (let key in this.items) {
        // проходимося по всіх ключах об'єкта this.items
        total += this.items[key].price * this.items[key].quantity; // рахуємо вартість усіх товарів
      }
      return total;
    }
  }

  let cart= new ShoppingCart()
  