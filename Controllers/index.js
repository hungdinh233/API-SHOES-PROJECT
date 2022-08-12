//lấy dữ liệu từ API về
getData = () => {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise.then(function (result) {
    console.log(result.data);
    renderFeature(result.data.content);
  });
};

renderFeature = (data) => {
  let html = "";
  for (let index in data) {
    let showedProd = data[index];
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
          <a href="##">
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
  getData();
};
