const getId = (id) => document.getElementById(id);
const cardsContainer = getId("cards_container");

let cartItem = [];
let totalPrice = 0;
// manage spinner

// load btns function
const loadBtns = async () => {
  const btnContainer = getId("btn_container");

  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
  const res = await fetch(url);
  const data = await res.json();
  const categories = data.categories;

  categories.forEach((category) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <button id="categoryBtn${category.id}" onClick="loadViaCategory('${category.id}')"
              class="btn  gap-3 text-xl font-bold bg-white p-3 rounded-xl border-1 border-[#fff] shadow-sm md:w-full active"
            >
              <img
                class="w-10"
                src="${category.categoryImg}"
                alt=""
              />
             ${category.categoryName}
          </button>
    `;
    btnContainer.appendChild(newDiv);
  });
};

// loadHomeCategory
const loadHomeCategory = async () => {
  //   manage spinner
  const spinnerDiv = getId("loading_spinner");
  const cartContainer = getId("cards_container");
  spinnerDiv.classList.remove("hidden");
  cartContainer.classList.add("hidden");

  const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.foods;
  /** {
    "id": 53068,
    "title": "Beef Mechado",
    "catId": 1,
    "foodImg": "https://www.themealdb.com/images/media/meals/cgl60b1683206581.jpg",
    "price": 663,
    "category": "Beef"
} */
  cards.forEach((card) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
     <div class="p-5 bg-white flex gap-3 shadow rounded-xl mb-5">
              <div class="img flex-1">
                <img
                  src="${card.foodImg}"
                  alt=""
                  class="w-[160px] rounded-xl h-[160px] object-cover"
                />
              </div>
              <div class="flex-2">
                <h1 class="text-xl font-bold">
                 ${card.title}
                </h1>

                <div class="badge badge-warning">${card.category}</div>

                <div class="divider divider-end">
                  <h2 class="text-yellow-600 font-semibold">
                    ৳ <span class="price">${card.price}</span> BDT
                  </h2>
                </div>

                <button onClick="addToCartBtn(this)" id="${card.id}" class="btn btn-warning">
                  <i class="fa-solid fa-square-plus"></i>
                  Add This Item
                </button>
              </div>
            </div>
    `;
    cardsContainer.appendChild(newDiv);
    spinnerDiv.classList.add("hidden");
    cartContainer.classList.remove("hidden");
  });
};

// loadViaCategory
const loadViaCategory = async (id) => {
  cardsContainer.innerHTML = "";
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.foods;
  cards.forEach((card) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
     <div class="p-5 bg-white flex gap-3 shadow rounded-xl mb-5">
              <div class="img flex-1">
                <img
                  src="${card.foodImg}"
                  alt=""
                  class="w-[160px] rounded-xl h-[160px] object-cover"
                />
              </div>
              <div class="flex-2">
                <h1 class="text-xl font-bold">
                 ${card.title}
                </h1>

                <div class="badge badge-warning">${card.category}</div>

                <div class="divider divider-end">
                  <h2 class="text-yellow-600 font-semibold">
                    ৳ <span class="price">${card.price}</span> BDT
                  </h2>
                </div>

                <button id="${card.id}" class="btn btn-warning">
                  <i class="fa-solid fa-square-plus"></i>
                  Add This Item
                </button>
              </div>
            </div>
    `;
    cardsContainer.appendChild(newDiv);
  });

  const btnActive = document.querySelectorAll(".active");
  btnActive.forEach((btn) => {
    btn.classList.remove("text-white", "bg-[#000000b5]");
    btn.classList.add("bg-white");
  });

  const activeBtn = document.getElementById(`categoryBtn${id}`);
  activeBtn.classList.add("text-white", "bg-[#000000b5]");
  activeBtn.classList.remove("bg-white");
};

// add to cart function
const addToCartBtn = (btn) => {
  const cartContainer = document.getElementById("cards_container");
  const imgUrl = btn.parentNode.parentNode.children[0].children[0].src;
  const cartTitle = btn.parentNode.parentNode.children[1].children[0].innerText;
  const itemPrice = Number(
    btn.parentNode.parentNode.children[1].children[2].children[0].children[0]
      .innerText
  );

  const newCart = {
    imgUrl: imgUrl,
    cartTitle: cartTitle,
    cartPrice: itemPrice,
  };
  cartItem.push(newCart);
  displayItem(cartItem);
  totalPrice = totalPrice + itemPrice;
  getId("cart_total").innerText = totalPrice;
};

const displayItem = (cart) => {
  const cartContainer = getId("cart_container");
  cartContainer.innerHTML = "";
  cart.map((item) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
     <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
              <div class="img">
                <span class="hidden cart-id">id</span>
                <img
                  src="${item.imgUrl}"
                  alt=""
                  class="w-[50px] rounded-xl h-[50px] object-cover"
                />
              </div>
              <div class="flex-1">
                <h1  class="text-xs font-bold food-title">
                  ${item.cartTitle}
                </h1>

                <div class="">
                  <h2 class="text-yellow-600 font-semibold">
                   1 x $ <span class="item-price">${item.cartPrice}</span> BDT
                  </h2>

                </div>
              </div>
              <div onclick="removeCart(this)"
                class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
    `;
    cartContainer.appendChild(newDiv);
  });
};
const removeCart = (btn) => {
  const item = btn.parentNode;
  const foodTittle = btn.parentNode.children[1].children[0].innerText;
  //   cartItem = cartItem.filter((item) => item.cartTitle != foodTittle);
  displayItem(cartItem);
  cartItem.forEach((item) => {
    totalPrice = totalPrice - item.cartPrice;f
    console.log(totalPrice);
  });
};

// default function call
loadBtns();
loadHomeCategory();
