function renderDetailProduct(arrProduct) {
  let html = "";

  html += `
      <div class="image col-xl-7">
          <img src="${arrProduct.image}" alt="photo.png" class="w-75 h-75"/>
      </div>
      <div class="part-info col-xl-5">
          <h2>${arrProduct.name}</h2>
          <p>
              ${arrProduct.description}
          </p>
          <h3>Available size</h3>
          <div class="size" id="size-product" >
              
          </div>
          <span id="price">${arrProduct.price}$</span>
          <div class="number-of-product">
              <button id="plus">+</button>
              <span>1</span>
              <button id="minus">-</button>
          </div>
          <button>Add to cart</button>
      </div>
            `;

  document.getElementById("infoProduct").innerHTML = html;
}

function getProductByCategory(category) {
  let promise = axios({
    url:
      "https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=" +
      category,
    method: "GET",
  });
  promise.then(function (result) {
    renderProduct(result.data.content);
  });
}

function getParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  return myParam;
}

function relateProduct() {
  let myParam = getParam();
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
    ResponseType: JSON,
  });
  promise.then(function (result) {
    renderDetailProduct(result.data.content);
    printSize(result.data.content.size);

    let arr = result.data.content.categories[0].id;
    getProductByCategory(arr);
  });
}

function printSize(arr) {
  let htmlSize = "";
  for (let index of arr) {
    htmlSize += `
          <span>${index}</span>
          `;
  }
  document.getElementById("size-product").innerHTML = htmlSize;
}

function renderProduct(arrProduct) {
  let html = "";
  for (let index in arrProduct) {
    let newProduct = arrProduct[index];
    html += `
          <div class="item col-12 col-md-6 col-xl-4 ">
                  <div class="cover">
                      <div class="pro-image">
                          <img src="${newProduct.image}" class="w-100" alt="photo.png" >
                      </div>
                      <d class="pro-txt">
                          <h2>${newProduct.name}</h2>
                          <span >${newProduct.description}</span>
                      </d v>
                      <div class="buy-click d-flex">
                          <a href="./detail.html?productid=${newProduct.id}">Buy now</a>
                          <p>${newProduct.price}$</p>
                      </div>
                  </div>
          </div>
          `;
  }
  document.getElementById("bodyProduct").innerHTML = html;
}

window.onload = function () {
  relateProduct();
  getProductByCategory();
};
