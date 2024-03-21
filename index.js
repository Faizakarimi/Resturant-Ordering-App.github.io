import { menuArray } from "./data.js";



const checkoutEL = document.getElementById('checkout-container')
const paymentForm = document.getElementById('payment-form')
const paymentSectionEl = document.getElementById('payment-section')



let totalPrice = 0
let ordersArray = []
let name = ''

document.addEventListener('click', function (e) {
  //  console.log(e.target.dataset.remove)


  if (e.target.dataset.add) {
    checkoutOrderItems(e.target.dataset.add)
  }

  else if(e.target.dataset.remove){
    removeOrderItem(e.target.dataset.remove)
  }

  else if(e.target.id == 'purchase-btn' ){
    renderPaymentModal()
  }

  else if(e.target.id == 'pay-btn'){
    e.preventDefault()
    const paymentData = new FormData(paymentForm)
     name = paymentData.get('fullName')
     console.log(name)
    
    completeOrderNote()
    HidePaymentModal()
  }
})




function completeOrderNote(){
  checkoutEL.innerHTML = `<div class='thanks-note'>
  <p > ${name}! thank you for ordering.
   Your order is on the way...</p>
  </div>`
}

function renderPaymentModal(){
  paymentSectionEl.style.display = 'block'
}
function HidePaymentModal(){
  paymentSectionEl.style.display = 'none'
}

function checkoutOrderItems(itemId) {
  const targetMenuItem = menuArray.filter(function (item) {
    return item.id == itemId

  })[0]

  if (!ordersArray.includes(targetMenuItem)) {
    ordersArray.push(targetMenuItem)
    totalPrice += targetMenuItem.price
    renderCheckoutSection()
    renderOrderItemSection(targetMenuItem)
  }
  //  console.log(ordersArray)
  // console.log(totalPrice)

}

function removeOrderItem(itemId){
  const targetMenuItem = menuArray.filter(function(item){
    return item.id == itemId
  })[0]
    if(ordersArray.includes(targetMenuItem)){
      ordersArray.pop(targetMenuItem)
      totalPrice -= targetMenuItem.price
      renderCheckoutSection()
      renderOrderItemSection()
    }
}


function getOrderSectionHtml() {
  return `<div id="checkout-section">
  <h3 id="order-title">Your order</h3>
  <div class="order-items" id="order-items">
  </div>
  <div class="total-price-container">
  <div>
            <p>Total Price</p>
          </div>
          <div>
            <p>$${totalPrice}</p>
          </div>

        </div>
        <button id="purchase-btn" class="btn">Complete Order</button>
      </div>`
}

function getOrderItemHtml() {
  let orderhtml = ``
    ordersArray.forEach(function (order) {
      orderhtml += ` <div class="checkout-items-container">
      <div class="checkout-items">
        <p>${order.name}
        </p>
          <button id="remove-btn" data-remove = ${order.id}>remove</button>
      </div>
      <div>
        <p>$${order.price}</p>
      </div>


    </div>`
    })
  
  return orderhtml
}

function getMenuItemsHtml() {
  let itemsHtml = ''
  menuArray.forEach(function (item) {
    itemsHtml += ` <div class="menu-items" id="menu-items">
    <div class="item-container">
      <div class="item-emoji">${item.emoji}</div>
      <div class="items-details">
        <p class="item-title">${item.name}</p>
        <p class="item-description">${item.ingredients}</p>
        <p class="item-price">$${item.price}</p>
      </div>
    </div>

    <div class="add-btn"><i class="fa-solid fa-circle-plus" data-add=${item.id}></i></div>

  </div>`
  })
  return itemsHtml
}


function renderOrderItemSection() {
  document.getElementById('order-items').innerHTML += getOrderItemHtml()


}
function renderCheckoutSection(){
  checkoutEL.innerHTML = getOrderSectionHtml()
}

function renderMenuItemsHtml() {
  document.getElementById('items').innerHTML = getMenuItemsHtml()


}

renderMenuItemsHtml()
