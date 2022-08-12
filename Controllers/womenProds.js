//lấy category men từ arr sản phẩm

getWomenProd = () => {
    let promise = axios({
      url: "https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=WOMEN",
      method: "GET",
    });
  
    promise.then(function (result) {
      console.log(result.data.content);
      renderWomenProd(result.data.content)
    });
  };
  // render ra giao dien
  renderWomenProd = (womenProdArr)=>{
      let html = "";
      for (let index in womenProdArr) {
        let showedProd = womenProdArr[index];
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
    getWomenProd();
  };
  