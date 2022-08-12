//lấy category men từ arr sản phẩm

getMenProd = () => {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=MEN",
    method: "GET",
  });

  promise.then(function (result) {
    console.log(result.data.content);
    renderMenProd(result.data.content)
  });
};
// render ra giao dien
renderMenProd = (menProdArr)=>{
    let html = "";
    for (let index in menProdArr) {
      let showedProd = menProdArr[index];
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
  getMenProd();
};
