const getId = (id) => document.getElementById(id);
const cardsContainer = getId("cards_container");

// manage spinner
const manageSpinner = (status) => {
  const spinnerDiv = getId("loading_spinner");
  if (status == true) {
    spinnerDiv.classList.remove("hidden");
  } else {
    spinnerDiv.classList.add("hidden");
  }
};

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
        <button onClick="loadViaCategory('${category.id}')"
              class="btn  gap-3 text-xl font-bold bg-white p-3 rounded-xl border-1 border-[#fff] shadow-sm md:w-full"
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
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
  manageSpinner(true);
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

                <button id="${card.id}" class="btn btn-warning">
                  <i class="fa-solid fa-square-plus"></i>
                  Add This Item
                </button>
              </div>
            </div>
    `;
    cardsContainer.appendChild(newDiv);
  });
  manageSpinner(false);
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
};

// default function call
loadBtns();
loadHomeCategory();
manageSpinner();
