//Render sản phẩm đc lấy params từ trang index
renderDetailProd = (prodObject) => {
  let html = `
        <div class="img__prod col-4">
        <img src=${prodObject.image} alt="" />
      </div>
      <div class="info__prod col-6 d-flex flex-column">
        <span class="prod__name">${prodObject.name}</span>
        <span class="prod__desc">${prodObject.description}</span>
        <span class="available__size">Available Size</span>
        <div class="size__option d-flex" id="printSize">
         
         
        </div>
        <span class="price">$ ${prodObject.price}</span>
        <div class="quantity">
          <button>+</button>
          <span>1</span>
          <button>-</button>
        </div>
        <a href="">
          <button class="add__to__cart">Add to cart</button>
        </a>
      </div>
              
        `;
  document.querySelector("#detail__prod").innerHTML = html;
  console.log("cc", html);
};

// bắt params từ items đc clicked
getParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productId");
  console.log("param", myParam);
  return myParam;
};

//nhận params và truyền vào hàm api lấy id sản phẩm để output ra sp cần tìm
getProdId = () => {
  let myParam = getParam();
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + myParam,
    method: "GET",
  });

  promise.then(function (result) {
    console.log("kq", result.data);
    //truyền object sản phẩm cần tìm vào function render ra giao diện
    renderDetailProd(result.data.content);
    renderSizeOption(result.data.content);
    //gọi id của phần tử thứ 0 trong category của object đc param trả ra
    renderByCategory(result.data.content.categories[0].id);
  });
};

// in size giày vào các size box phù hợp
renderSizeOption = (prodArr) => {
  let size = prodArr.size;
  let htmlSize = "";
  for (let index in size) {
    htmlSize += `
    <a href="#">
    <div
      class="box-size d-flex align-items-center justify-content-center" 
    >   
    ${size[index]}
    </div>
  </a>   
    `;
  }

  document.querySelector("#printSize").innerHTML = htmlSize;
};

// lọc các sản phẩm liên quan thông qua API product category
renderByCategory = (categoryId) => {
  let promise = axios({
    url:
      "https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=" +
      categoryId,

    method: "GET",
  });
  promise.then(function (result) {
    console.log("category", result.data);
    renderCategoryProds(result.data.content);
  });
};
// render các sản phẩm có category liên quan lên giao diện
renderCategoryProds = (cateArr) => {
  let html = "";
  for (let index in cateArr) {
    let showedProd = cateArr[index];
    html += `
      <div class="col-4">
      <div class="item">
  
          <div class="prod__img">
              <img src=${showedProd.image} alt="..." />
          </div>
       
        <div class="product__info">
          <span class="prod__name">${showedProd.name}</span>
          <span class="prod__desc">${showedProd.shortDescription}</span>
        </div>
  
        <div class="action__btn">
            <a href="./detail.html?productId=${showedProd.id}">
              <div class="buy__now">
                <span>Buy now</span>
              </div>
            </a>
          <div class="price">
            <span>${showedProd.price}$</span>
          </div>
        </div>
      </div>
    </div>
       
      `;
  }
  document.querySelector("#rowRender").innerHTML = html;
  console.log(html);
};

window.onload = function () {
  getProdId();
};
