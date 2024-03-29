const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("chekout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");


let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateCartModal();
  cartModal.style.display = "flex";
  
});

//fecha o modal do carrinho
cartModal.addEventListener("click", function (e) {
  if (e.target == cartModal) {
    cartModal.style.display = "none";
  }
});

//fecha o modal do carrinho
closeModalBtn.addEventListener("click", function (e) {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    //Adicionar no carrinho
    addToCart(name, price);
  }
});

//funcao para Adicionar no carrinho

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
    console.log(cart);
  }
  updateCartModal();
}

//atualizar carrinho
function updateCartModal() {
cartItemsContainer.innerHTML = "";
let total =0;

cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex","justify-between","mb-4", "flex-col");
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
    <div>
    <p class="font-bold">${item.name}</p>
    <p>QTd: ${item.quantity}</p>
    <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)}</p>
    </div>
  
    <button class="remove-btn" data-name="${item.name}">
    Remover
    </button>

    </div>
    `

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);

})
cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
});

cartCounter.textContent = cart.length;

}

//Funcao para remover item do carrinho 
cartItemsContainer.addEventListener("click",function(event){
if (event.target.classList.contains("remove-btn")){
    const name = event.target.getAttribute("data-name");
    const index = cart.findIndex((item) => item.name === name);
    
    if(index !== -1){
        const item = cart[index];
        if(item.quantity >1) {
            item.quantity -=1;
            updateCartModal();
            return;
        }
        cart.splice(index,1);
        updateCartModal();
    }
    
}
})

function removeItemCart(name){
    
}

//pegando o input
addressInput.addEventListener("input",function(event){
let inputValue = event.target.value;

if(inputValue !== ""){
  addressInput.classList.remove("border-red-500")
  addressWarn.classList.add("hidden")
}
})

//finalizando o carrinho
checkoutBtn.addEventListener("click",function(){

const isOpen = checkRestaurantOpen();
 if(!isOpen){

  Toastify({
    text: "Ops! está fechado.",
    duration: 3000,
   
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "inear-gradient(to right, #ef4444)",
    stopOnFocus: true,
    onClick: function () {},
  }).showToast();
   return;
 }

  if(cart.length === 0) return;
  if(addressInput.value === "" ) {
   addressWarn.classList.remove("hidden")
    addressInput.classList.add("border-red-500")
    return;
  }

  //envia pedido para api whats
  let total = 0; // Inicializa o valor total como zero

const cartItems = cart.map((item) => {
  const itemTotal = item.price * item.quantity; // Calcula o valor total do item
  total += itemTotal; // Adiciona ao valor total acumulado
  return `${item.name}
Quantidade: ${item.quantity}
Preço R$: ${item.price.toFixed(2)} (Total: R$ ${itemTotal.toFixed(2)})`;
}).join("\n");

const message = encodeURIComponent(`${cartItems}\n\nValor Total: R$ ${total.toFixed(2)}`);
const phone = "5571987202769"; // Substitua pelo número correto
window.open(`https://wa.me/${phone}?text=${message}&disable_edit=true`, "_blank");
cart = []; // Limpa o carrinho após enviar a mensagem
  updateCartModal();
});

//verificar a hora
function checkRestaurantOpen(){
  const data = new Date();
  const hora = data.getHours();
  return hora >= 8 && hora < 18;
  
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
}else{
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}
