const storeProductsElement = document.getElementById('store-products');

if (storeProductsElement) {

  function displayProducts(productsToDisplay) {
    storeProductsElement.innerHTML = ''; // Очищаем содержимое контейнера продуктов

    // Получаем значения атрибутов data-static-url и data-img-url
    const staticUrl = storeProductsElement.dataset.staticUrl;
    const imgUrl = storeProductsElement.dataset.imgUrl;
    // Обходим массив продуктов и создаем HTML-разметку для каждого продукта
    filteredAndSortedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const productImage = document.createElement('div');
        productImage.className = 'product-image';
        productImage.style.backgroundImage = `url('${imgUrl}${product.imageUrl}')`;

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const productName = document.createElement('p');
        productName.className = 'product-name';
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `${product.price.toFixed(2)} ₴`;

        const addToCartButton = document.createElement('button');
        addToCartButton.className = 'add-to-cart-btn';

        const addToCartIcon = document.createElement('img');
        addToCartIcon.src = `${staticUrl}img/svg/store-cart.svg`;
        addToCartIcon.alt = 'Add to cart';
        addToCartIcon.className = 'add-to-cart-icon';

        addToCartButton.appendChild(addToCartIcon);

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(addToCartButton);

        productElement.appendChild(productImage);
        productElement.appendChild(productInfo);

        storeProductsElement.appendChild(productElement);
    });
    updateSortResult(productsToDisplay.length);
  }



  function sortProducts(sortType) {
    const buttons = document.getElementsByClassName('sorting-btn');

    for (const button of buttons) {
      button.classList.remove('selected-sort'); // Удаление класса 'selected-sort' с кнопок
    }

    const activeButton = document.getElementById(sortType);
    activeButton.classList.add('selected-sort'); // Добавление класса 'selected-sort' к активной кнопке

    if (sortType === 'latest') {
      filteredAndSortedProducts = sortProductsByLatest(filteredAndSortedProducts);
    } else if (sortType === 'ascending') {
      filteredAndSortedProducts = sortProductsByPriceAscending(filteredAndSortedProducts);
    } else if (sortType === 'descending') {
      filteredAndSortedProducts = sortProductsByPriceDescending(filteredAndSortedProducts);
    }

    displayProducts(filteredAndSortedProducts);
  }


  function updateProducts() {
    filteredAndSortedProducts = products.filter(product => {
      let isTypeSelected = false;
      const selectedFilmTypes = document.querySelectorAll('.selected-film');

      if (selectedFilmTypes.length > 0) {
        for (const typeButton of selectedFilmTypes) {
          if (product.type === typeButton.id) {
            isTypeSelected = true;
            break;
          }
        }
      } else {
        isTypeSelected = true;
      }

      let isColorSelected = false;
      const selectedColorFilters = document.querySelectorAll('.selected-color');

      if (selectedColorFilters.length > 0) {
        for (const colorButton of selectedColorFilters) {
          if (product.color === colorButton.id) {
            isColorSelected = true;
            break;
          }
        }
      } else {
        isColorSelected = true;
      }

      const selectedBrand = document.getElementById('brand-select').value;
      const isBrandSelected = !selectedBrand || product.brand === selectedBrand;

      const minPrice = document.getElementById('min-price').value || -Infinity;
      const maxPrice = document.getElementById('max-price').value || Infinity;
      const isPriceInRange = product.price >= minPrice && product.price <= maxPrice;

      console.log('Отфильтрованные продукты:', filteredAndSortedProducts);

      return isTypeSelected && isColorSelected && isBrandSelected && isPriceInRange;
    });

    const selectedSortTypeElement = document.querySelector('.selected-sort');
    const selectedSortType = selectedSortTypeElement ? selectedSortTypeElement.id : 'latest';
    sortProducts(selectedSortType);
  }


  function sortProductsByLatest(products) {
    return [...products].sort((a, b) => b.id - a.id);
  }

  function sortProductsByPriceAscending(products) {
    return [...products].sort((a, b) => a.price - b.price);
  }

  function sortProductsByPriceDescending(products) {
    return [...products].sort((a, b) => b.price - a.price);
  }


  function selectFilmType(filmType) {
    const button = document.getElementById(filmType);
    button.classList.toggle('selected-film');

    updateProducts();
  }

  function selectColorFilter(colorType) {
    const button = document.getElementById(colorType);
    button.classList.toggle('selected-color');

    updateProducts();
  }

  function filterByBrand() {
    updateProducts();
  }

  function clearBrandFilter() {
    const brandSelect = document.getElementById('brand-select');
    brandSelect.value = '';
    filterByBrand();
    updateProducts();
  }

  function filterByPrice() {
    updateProducts();
  }

  function updateSortResult(count) {
    const sortResultElement = document.querySelector('.sort-result');
    sortResultElement.textContent = `Знайдено ${count} результатів`;
  }


  const products = [
      { id: 1, name: 'Kodak Gold 200', price: 400.00, brand: 'Kodak', type: 'hundred-twenty-mm', color: 'colorful', imageUrl: 'gold-120.png' },
      { id: 2, name: 'Kodak Ektar 100', price: 750.00, brand: 'Kodak', type: 'hundred-twenty-mm', color: 'colorful', imageUrl: 'ektar-120.png' },
      { id: 3, name: 'Ilford Delta 400', price: 350.00, brand: 'Ilford', type: 'hundred-twenty-mm', color: 'bw', imageUrl: 'delta400-120.png' },
      { id: 4, name: 'CineStill 400d', price: 850.00, brand: 'CineStill', type: 'thirty-five-mm', color: 'colorful', imageUrl: 'cinestill400d-35.png' },
      { id: 5, name: 'Fujicolor C200', price: 600.00, brand: 'Fuji', type: 'thirty-five-mm', color: 'colorful', imageUrl: 'c200-35.png' },
      { id: 6, name: 'Fujicolor Instax', price: 420.00, brand: 'Fuji', type: 'polaroid', color: 'colorful', imageUrl: 'instax-polaroid.png' },
      { id: 7, name: 'Kodak Portra 800', price: 800.00, brand: 'Kodak', type: 'thirty-five-mm', color: 'colorful', imageUrl: 'portra800-35.png' },
      { id: 8, name: 'Provia 100F', price: 850.00, brand: 'Fuji', type: 'thirty-five-mm', color: 'colorful', imageUrl: 'provia100f-35.png' },
      { id: 9, name: 'Ektachrome E100', price: 700.00, brand: 'Kodak', type: 'hundred-twenty-mm', color: 'colorful', imageUrl: 'e100-120.png' },
  ];

  let filteredAndSortedProducts = [...products]; // Создаем копию исходного массива продуктов
  const filmTypeButtons = document.querySelectorAll('.film-type-btn');
  const colorFilterButtons = document.querySelectorAll('.color-btn');
  const brandSelect = document.getElementById('brand-select');
  const clearBrandFilterButton = document.querySelector('.brand-filter__clear');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');

  filmTypeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected-film');
      updateProducts();
    });
  });

  colorFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected-color');
      updateProducts();
    });
  });

  if (brandSelect) {
    brandSelect.addEventListener('change', () => {
      filterByBrand();
      updateProducts();
    });
  }

  if (clearBrandFilterButton) {
    clearBrandFilterButton.addEventListener('click', () => {
      clearBrandFilter();
      updateProducts();
    });
  }

  if (minPriceInput) {
    minPriceInput.addEventListener('input', () => {
      filterByPrice();
      updateProducts();
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', () => {
      filterByPrice();
      updateProducts();
    });
  }

  displayProducts(filteredAndSortedProducts);
}





















const prices = {
  filmType: {
    "35mm": 150,
    "120mm": 150,
  },
  scanSize: {
    L: 100,
    XL: 160,
    XXL: 220,
  },
  printType: {
    color: 20,
    bw: 10,
  },
  specialOptions: {
    slideFilmProcessing: 50,
    doNotCutNegatives: 0,
    crossProcessing: 70,
    pushPull: 20,
    pushPullValue: 0
  },
  printSize: {
    "9x13": 10,
    "10x15": 12,
    "13х13": 13,
    "13х18": 17,
    "13х30": 25,
    "15х15": 15,
    "15х21": 20,
    "15х30": 30,
    "20х20": 25,
    "20х30": 40,
  },
  paperType: {
    glossy: 15,
    matte: 10,
  },
  borderStyle: {
    noBorders: 0,
    whiteBorders: 0,
  },
  numberOfCopies: {
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
    10: 50,
  },
};


const order = {
  filmType: "35mm",
  scanSize: "L",
  printType: "color",
  specialOptions: {
    slideFilmProcessing: false,
    doNotCutNegatives: false,
    crossProcessing: false,
    pushPull: false,
    pushPullValue: "Push"
  },
  printSize: "9x13",
  paperType: "glossy",
  borderStyle: "noBorders",
  numberOfCopies: 1,
  filmCount: 1,
};

function getScanSizeKey(sliderValue) {
  switch (sliderValue) {
    case "1":
      return "L";
    case "2":
      return "XL";
    case "3":
      return "XXL";
    default:
      return "L";
  }
}

function updateTotal() {
  let total = 0;

  total += prices.filmType[order.filmType];
  total += prices.scanSize[order.scanSize];
  total += prices.printType[order.printType];

  for (const option in order.specialOptions) {
    if (order.specialOptions[option]) {
      total += prices.specialOptions[option];
    }
  }

  total += prices.printSize[order.printSize];
  total += prices.paperType[order.paperType];
  total += prices.borderStyle[order.borderStyle];
  total += prices.numberOfCopies[order.numberOfCopies];

  total *= order.filmCount;

  const totalPaymentValueElement = document.querySelector(".total-payment-value");
  if (totalPaymentValueElement) {
    totalPaymentValueElement.textContent = `${total.toFixed(2)} ₴`;
  }
}


function handleInputChange(event) {
  const input = event.target;
  const inputName = input.name;
  let inputValue = input.type === "checkbox" ? input.checked : input.value;

  if (inputName === "scanSize") {
    inputValue = getScanSizeKey(inputValue);
  }

  if (inputName in order) {
    order[inputName] = inputValue;
  } else if (inputName in order.specialOptions) {
    order.specialOptions[inputName] = inputValue;
  }

  updateTotal();
}

function registerEventListeners() {
  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");

  for (const input of inputs) {
    input.addEventListener("change", handleInputChange);
  }

  for (const select of selects) {
    select.addEventListener("change", handleInputChange);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  registerEventListeners();
  updateTotal();
});

const isUserLoggedIn = document.querySelector("body").dataset.isLoggedIn === "True";


function submitOrder() {
  const data = new FormData();
  data.append('film_type', order.filmType);
  data.append('scan_size', order.scanSize);
  data.append('print_type', order.printType);
  data.append('slide_film_processing', order.specialOptions.slideFilmProcessing);
  data.append('do_not_cut_negatives', order.specialOptions.doNotCutNegatives);
  data.append('cross_processing', order.specialOptions.crossProcessing);
  data.append('push_pull', order.specialOptions.pushPullValue || (order.specialOptions.pushPull ? 'Push' : ""));
  data.append('print_size', order.printSize);
  data.append('paper_type', order.paperType);
  data.append('border_style', order.borderStyle);
  data.append('number_of_copies', order.numberOfCopies);
  data.append('film_count', order.filmCount);
  data.append('total_price', Number(document.querySelector(".total-payment-value").textContent.replace('₴', '')));

  fetch("/create-order/", {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        alert("Замовлення успішно додано");
      } else {
        alert("Помилка при додані замовлення");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



function setupBasketButton() {
  const toBasketButton = document.querySelector(".to-basket-button");

  if (toBasketButton) {
    toBasketButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (isUserLoggedIn) {
        submitOrder();
      } else {
        window.location.href = "/accounts/login/";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  registerEventListeners();
  updateTotal();
  setupBasketButton();
});




function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}









let cart = {
  items: [],
  total: 0,
};

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addItemToCart(item) {
  cart.items.push(item);
  updateCartTotal();
  saveCartToLocalStorage();
}

function removeItemFromCart(index) {
  cart.items.splice(index, 1);
  updateCartTotal();
  saveCartToLocalStorage();
}

function updateCartTotal() {
  cart.total = cart.items.reduce((total, item) => total + item.price, 0);
}



document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productDiv = event.target.closest(".product");
    const itemName = productDiv.querySelector(".product-name").textContent;
    const itemPrice = parseFloat(productDiv.querySelector(".product-price").textContent);

    const item = {
      name: itemName,
      price: itemPrice,
    };

    addItemToCart(item);
  });
});



function displayCart() {
  const cartItemsContainer = document.querySelector(".cart-items-container");
  const cartTotal = document.querySelector(".cart-total");

  // Очистим предыдущее содержимое корзины
  cartItemsContainer.innerHTML = "";

  // Добавим товары и заказы в контейнер корзины
  cart.items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-price">${item.price.toFixed(2)}₴</div>
      <button class="cart-item-remove" data-index="${index}">&#x2715;</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Обновим общую стоимость корзины
  cartTotal.textContent = `Загалом: ${cart.total.toFixed(2)}₴`;

  // Отобразим всплывающее окно корзины
  document.querySelector(".cart-popup").classList.add("visible");

  // Добавим обработчики событий для кнопок удаления товаров из корзины
  document.querySelectorAll(".cart-item-remove").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      removeItemFromCart(index);
      displayCart();
    });
  });
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
  registerEventListeners();
  updateTotal();
});


document.querySelector(".header__icon-cart").addEventListener("click", () => {
  displayCart();
});

document.querySelector(".cart-popup-close").addEventListener("click", () => {
  document.querySelector(".cart-popup").classList.remove("visible");
});


