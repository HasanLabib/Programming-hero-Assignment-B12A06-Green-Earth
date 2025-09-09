//Choose Your Tree
const cartItemContainer = document.querySelector(".cart-items-container");
let totalAmount = parseInt(document.querySelector(".total-amount").innerText);
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.querySelector(".tree-card-section").classList.add("hidden");
  } else {
    document.querySelector(".tree-card-section").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};
const removeActive = () => {
  const categoryList = document.querySelectorAll(".categoryList");
  categoryList.forEach((category) => category.classList.remove("active"));
};
const displayCategories = (categories) => {
  const categoriesContainer = document.querySelector(".treeCatagories");
  console.log(categoriesContainer);
  categories.forEach((category) => {
    const categoryList = document.createElement("li");
    categoryList.classList.add(
      "categoryList",
      "inter",
      "hover:bg-green-300",
      "hover:scale-105"
    );
    categoryList.id = category.id;
    const categoryListLink = document.createElement("a");
    //categoryListLink.href = `https://openapi.programming-hero.com/api/category/${category.id}`;
    categoryList.addEventListener("click", (e) => {
      console.log(category.id);
      const treesContainer = document.querySelector(".tree-card-container");
      treesContainer.innerHTML = "";
      document.querySelector(".all-trees").classList.remove("active");
      removeActive();
      categoryList.classList.add("active");
      loadTreeData(category.id);
      e.stopPropagation();
    });
    categoryListLink.innerText = `${category.category_name}`;
    categoryList.appendChild(categoryListLink);

    categoriesContainer.appendChild(categoryList);
  });
};

loadCategories();

const loadAllTreesData = async () => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/plants`;
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data.plants);
  displayAllTreesData(data.plants);
};
loadAllTreesData();

document.querySelector(".all-trees").addEventListener("click", (e) => {
  e.stopPropagation();
  removeActive();
  const treesContainer = document.querySelector(".tree-card-container");
  treesContainer.innerHTML = "";
  document.querySelector(".all-trees").classList.add("active");
  loadAllTreesData();
});

const creatingCard = (tree) => {
  const treesContainer = document.querySelector(".tree-card-container");
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "bg-base-100",
    "shadow-sm",
    "hover:scale-105",
    "hover:transition"
  );
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("p-3");
  const figure = document.createElement("figure");
  figure.classList.add("rounded-lg", "w-fit", "md:h-[15rem]", "mx-auto");
  const img = document.createElement("img");
  img.src = tree.image;
  img.classList.add("rounded-lg", "object-contain");
  figure.appendChild(img);
  imageDiv.appendChild(figure);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const title = document.createElement("h2");
  title.classList.add("card-title", "inter");
  title.innerText = tree.name;
  title.addEventListener("click", (e) => {
    e.stopPropagation();
    loadTreeModalDetail(tree.id);
  });
  cardBody.appendChild(title);
  const description = document.createElement("p");
  description.innerText = tree.description;
  cardBody.appendChild(description);

  const flexContainer = document.createElement("div");
  flexContainer.classList.add("flex", "justify-between", "items-center");
  const cardActionsStart = document.createElement("div");
  cardActionsStart.classList.add("card-actions", "justify-start");
  const badge = document.createElement("div");
  badge.classList.add(
    "badge",
    "badge-outline",
    "rounded-3xl",
    "bg-[#DCFCE7]",
    "text-[#15803D]",
    "inter"
  );
  badge.innerText = tree.category;
  cardActionsStart.appendChild(badge);
  flexContainer.appendChild(cardActionsStart);

  const cardActionsEnd = document.createElement("div");
  cardActionsEnd.className = "card-actions justify-end";
  const price = document.createElement("div");
  price.classList.add("inter", "font-semibold");
  price.innerText = `$${parseInt(tree.price)}`;
  cardActionsEnd.appendChild(price);
  flexContainer.appendChild(cardActionsEnd);
  cardBody.appendChild(flexContainer);

  const button = document.createElement("button");
  button.classList.add(
    "btn",
    "w-full",
    "rounded-3xl",
    "text-white",
    "bg-[#15803D]",
    "hover:bg-[#FACC15]"
  );
  button.innerText = "Add to Cart";
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(tree);
  });

  cardBody.appendChild(button);
  card.appendChild(imageDiv);
  card.appendChild(cardBody);
  treesContainer.appendChild(card);
};

let cartItems = {};

const addToCart = (tree) => {
  // console.log(tree);

  if (!cartItems[tree.id]) {
    cartItems[tree.id] = { count: 0, tree: null };
    console.log(cartItems[tree.id]);
  }

  cartItems[tree.id].count++;
  if (cartItems[tree.id].tree) {
    cartItems[tree.id].tree.remove();
  }
  cartItems[tree.id].tree = createAddCart(
    tree,
    tree.id,
    cartItems[tree.id].count
  );
};

const createAddCart = (tree, id, count) => {
  const cartItemContainer = document.querySelector(".cart-items-container");
  const itemParent = document.createElement("div");
  itemParent.classList.add(
    "card",
    "bg-base-100",
    "shadow-sm",
    "flex",
    "flex-row",
    "justify-between",
    "items-center",
    "gap-4",
    "p-2"
  );

  const itemDes = document.createElement("div");
  itemDes.classList.add("flex", "flex-col");
  const itemName = document.createElement("p");
  itemName.classList.add("inter", "font-semibold");
  itemName.innerText = tree.name;
  const itemCount = document.createElement("p");
  itemCount.classList.add("inter", "font-semibold","text-[#1F2937]","opacity-50");

  totalAmount += parseInt(tree.price);
  itemCount.innerText = `$${parseInt(tree.price)} x ${count}`;

  itemDes.appendChild(itemName);
  itemDes.appendChild(itemCount);

  const itemDelete = document.createElement("div");
  const deleteIcon = document.createElement("button");
  deleteIcon.classList.add("inter", "font-semibold", "text-red-500");
  deleteIcon.innerText = "X";
  deleteIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    if (cartItems[id]) {
      totalAmount -= parseInt(tree.price) * cartItems[id].count;
      delete cartItems[id];
      itemParent.remove();
      updateTotalAmount();
    }
  });

  itemDelete.appendChild(deleteIcon);
  itemParent.appendChild(itemDes);
  itemParent.appendChild(itemDelete);

  cartItemContainer.appendChild(itemParent);
  updateTotalAmount();

  return itemParent;
};

const updateTotalAmount = () => {
  const totalElement = document.querySelector(".total-amount");
  if (totalElement) {
    totalElement.innerText = `$${totalAmount}`;
  } else {
    alert("Total amount element not found (.total-amount)");
  }
};

const displayAllTreesData = (trees) => {
  //console.log(trees);
  trees.forEach((tree) => {
    creatingCard(tree);
  });
  manageSpinner(false);
};

const loadTreeData = async (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.plants);
  displayTreeData(data.plants);
};

const displayTreeData = (trees) => {
  trees.forEach((tree) => {
    creatingCard(tree);
  });
  manageSpinner(false);
};

const loadTreeModalDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  console.log(details.plants);
  displayTreeModalDetails(details.plants);
};

const displayTreeModalDetails = (tree) => {
  console.log(tree);
  const treeModal = document.getElementById("treeModal");
  treeModal.querySelector(
    ".treeDetails"
  ).innerHTML = `<div class="card card-xl w-full max-w-full bg-base-100 shadow-sm mx-auto">
  <div class="flex flex-col md:flex-row"><div class="p-3 flex-1">
    <figure>
      <img
        src=${tree.image}
        alt=''
        class="rounded-lg"
      />
    </figure>
  </div>
  <div class="card-body p-2 flex-1">
    <h2 class="card-title inter">${tree.name}</h2>
    <p>
      ${tree.description}
    </p>
    <div class="flex flex-row  md:flex-col justify-between items-center gap-5">
      <div class="card-actions justify-start">
        <div class="badge badge-outline rounded-3xl bg-[#DCFCE7] text-[#15803D] inter w-full">
          Category: ${tree.category}
        </div>
      </div>
      <div class="card-actions justify-end">
        <div class="inter font-semibold ">Price:$${parseInt(tree.price)}</div>
      </div>
    </div>
  </div></div>
</div>`;

  document.getElementById("treeModal").showModal();
};
document.querySelector(".modal-btn-close").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("treeModal").close();
});
{
  /* <div class="card bg-base-100 shadow-sm">
  <div class="p-3">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
        class="rounded-lg"
      />
    </figure>
  </div>
  <div class="card-body">
    <h2 class="card-title inter">Mango Tree</h2>
    <p>
      A fast-growing tropical tree that produces delicious, juicy mangoes during
      summer. Its dense green
    </p>
    <div class="flex justify-between items-center">
      <div class="card-actions justify-start">
        <div class="badge badge-outline rounded-3xl bg-[#DCFCE7] text-[#15803D] inter">
          Fashion
        </div>
      </div>
      <div class="card-actions justify-end">
        <div class="inter font-semibold">Products</div>
      </div>
    </div>
    <button class="btn w-full rounded-3xl text-white bg-[#15803D] hover:bg-[#FACC15]">
      Wide
    </button>
  </div>
</div> */
}

// Plant a Tree Today

const donateBtn = document.querySelector(".donateBtn");
donateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector(".inputName").value;
  const email = document.querySelector(".inputEmail").value;
  const num = document.querySelector(".selectTreeNum").value;
  console.log(name, email, num);
  if (name && email && num) {
    alert(`Thank You For Your Contribution ${name}
            
            Your Email: ${email}
            
            Number of Trees: ${num[0]}`);
  }

  switch (num) {
    case "1-20$":
      alert(`Donated: 20$`);
      break;
    case "2-40$":
      alert(`Donated: 40$`);
      break;
    case "3-60$":
      alert(`Donated: 60$`);
      break;
    default:
      break;
  }
  e.stopPropagation();
});
