const inpTag = document.getElementById("inp");
const shoppingListContainerTag = document.querySelector(
  ".shoppingListContainer"
);
let j = 0;
inpTag.addEventListener("change", (e) => {
  j++;

  const userInput = e.target.value;

  const listContainer = document.createElement("div");
  listContainer.classList.add("listContainer");
  listContainer.id = j;

  const list = document.createElement("p");
  list.classList.add("list");
  list.addEventListener("click", () => {
    let purchase = list.classList.contains("purchase");
    if (!purchase) {
      list.classList.add("purchase");
    } else {
      list.classList.remove("purchase");
    }
  });

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-dumpster");
  i.id = j;

  list.append(userInput);
  listContainer.append(list, i);
  shoppingListContainerTag.appendChild(listContainer);

  let iTag = document.querySelectorAll(".fa-solid");

  iTag.forEach((tag) => {
    tag.addEventListener("click", () => {
      if (listContainer.id === tag.id) {
        listContainer.style.display = "none";
      }
    });
  });

  inpTag.value = "";
});

{
  /* <i class="fa-solid fa-dumpster"></i> */
}
