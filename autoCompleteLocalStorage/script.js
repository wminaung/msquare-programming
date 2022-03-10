const inputTag = document.getElementById("input");
let productContainerTag = document.querySelector(".productContainer");
const body = document.querySelector("body");

let filteredProducts = [];
const url = "https://fakestoreapi.com/products";
let products = [];
fetch(url)
  .then((res) => res.json())
  .then((result) => {
    products = result;

    inputTag.disabled = false;

    inputTag.addEventListener("keyup", main);
  })
  .catch((err) => {
    console.log(err);
    body.innerHTML = ` 
 <div class="container">
    <em> ${err} </em>
    <h1 class="s-h1"> error page reload page!!! </h1>
</div>
`;
    console.log("this is fetch error", err);
  });

const main = (e) => {
  // productContainerTag.scrollTop = productContainerTag.scrollHeight;

  if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
    navigator(e.key);
    return;
  }

  productContainerTag.innerHTML = "";
  const userSearchText = e.target.value.toLowerCase();

  // product is filtered by user search text
  filteredProducts = products.filter((product) => {
    const productTitle = product.title.toLowerCase();
    return productTitle.includes(userSearchText);
  });

  filteredProducts.map((product, filterIndex, filterArry) => {
    if (userSearchText === " " || userSearchText === "") {
      return;
    }

    const productTitle = product.title;
    const productId = product.id.toString();
    const productImage = product.image;

    const productTitleAndImageContainerTag = document.createElement("div");
    productTitleAndImageContainerTag.id = productId;
    productTitleAndImageContainerTag.classList.add(
      "productTitleAndImageContainer"
    );

    const productTitleTag = document.createElement("span");
    productTitleTag.classList.add("productTitle");
    productTitleTag.textContent = productTitle;

    const productImageTag = document.createElement("img");
    productImageTag.src = productImage;
    productImageTag.classList.add("myImg");

    productTitleAndImageContainerTag.append(productTitleTag, productImageTag);
    productContainerTag.append(productTitleAndImageContainerTag);
  });
};
let indexf = -1;
const navigator = (key) => {
  if (key === "ArrowDown") {
    arrowDownFunc();
  } else if (key === "ArrowUp") {
    arrowUpFunc();
  } else {
    createSelectedProductPage();
  }
};

const createSelectedProductPage = () => {
  if (indexf < 0) {
    return;
  }
  let { title, price, image, description, rating, category } = {
    ...filteredProducts[indexf],
  };

  // const price = product.price;
  // const description = product.description;
  // const ratingRate = product.rating.rate;
  // const ratingCount = product.rating.count;
  // const category = product.category;
  // const title = product.title;
  // const productImg = product.src;

  const obj = { title, price, image, description, rating, category };
  const jsonObj = JSON.stringify(obj);

  localStorage.setItem("enterProductToshow", jsonObj);

  window.location.href = "./format.html";
};

//arrow up function
const arrowUpFunc = () => {
  if (indexf === -1) {
    indexf = -1;
    return;
  }
  if (indexf === 0) {
    deSelected(indexf);
    indexf = -1;
    return;
  }
  if (indexf > 0) {
    selected(indexf - 1);
    deSelected(indexf);
    indexf -= 1;
  }
};

//arrow down function
const arrowDownFunc = () => {
  if (filteredProducts.length === 0) {
    return;
  }
  indexf += 1;
  if (indexf === filteredProducts.length) {
    deSelected(indexf - 1);
    indexf = -1;
    return;
  }

  if (indexf === 0) {
    selected(indexf);
    return;
  }

  if (indexf < filteredProducts.length) {
    selected(indexf);

    deSelected(indexf - 1);
  }
};

// de selected tag function
const deSelected = (indexf) => {
  const removeSelected = filteredProducts[indexf].id;
  const deSelected = document.getElementById(removeSelected);
  deSelected.classList.remove("selected");
};

// selected tag function
const selected = (indexf) => {
  const filterId = filteredProducts[indexf].id;
  const navDiv = document.getElementById(filterId);
  navDiv.classList.add("selected");
};
