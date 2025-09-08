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
            
            Number of Trees: ${num}`);
  }
  e.stopPropagation();
});
