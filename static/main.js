// using to determine what page we are on and what functions to run
// what is url determine what functions we are going to run

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

let myPage = window.location.pathname;
function getLocation(myPage) {
  // item page
  if (myPage.includes("/store/item")) {
    console.log("you are looking at item");
    btnToggle();
    carouselAll();
    cartItemPage();
    linkRedirect() 

  }
  // store page
  else if (myPage == "/store/") {
    console.log("you are at store");
    chevronBtn();
    carouselAll();
    resetFilter();
    priceMatch();
    nameSearch();
    carouselAll();
    addCart();
    applyFilterStore()
    // linkRedirect() 

  }
  // home page
  else if (myPage == "/") {
    console.log("you are home");
    carouselAll();
    linkRedirect() 

  }
  // check out page
  else if (myPage == "/checkout") {
    console.log("checkout page");
    // checkoutForms()
    cartLocalStorage();
    deleteItem();
    checkoutFormsSlide();
    slideCardForm();
    addAddress();
    addPayment();
    optionInitDisplay();
    orderSummary();
    placeOrderModal();
    linkRedirect() 

  }
  // user page
  else if (myPage == "/mypage/") {
    console.log("user page");
  }
}
// all global functions
getLocation(myPage);
cartItemCount();

// function call to our main function that determines
// what functions run at the page
// getLocation(find);

// All function that used here
// ############## SOME GLOBAL/MULTIUSE FUNCTIONS ####################

// display how many items are in the cart
// works when adding and deleting item from cart
function cartItemCount() {
  // let itemsContainer = document.querySelector('#item_list')
  let cartCount = document.querySelector(".cart-items");
  if (localStorage.getItem("cart") == "null") {
    cartCount.innerHTML = "0";
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
    itemNum = Object.keys(cart).length;
    cartCount.innerHTML = itemNum;
  }
}

// make carousel responsive
// add class active to 1st child
// heart above carousel responsive
function carouselAll() {
  // add active class to 1st item from database
  function carouselChild() {
    let carouselItem = document.querySelector(".carousel-item");
    carouselItem.classList.add("active");
  }
  carouselChild();
  function carouselHeart() {
    // change heart in carousel to solid red when clicked on it
    var heart = document.getElementsByClassName("fa-heart");
    for (i = 0; i < heart.length; i++) {
      let singleHeart = heart[i];
      singleHeart.onclick = function() {
        if (singleHeart.className == "far fa-heart fa-1x heart pt-3") {
          singleHeart.className = "fas fa-heart text-danger fa-2x";
        } else if ((singleHeart.className = "fas fa-heart text-danger fa-2x")) {
          singleHeart.className = "far fa-heart fa-1x heart pt-3";
        }
      };
    }
  }
  carouselHeart();
}

// select all filter buttons, capture filter and send filter to main
// filter function
// redirect to store page and save filter value in local storage
// global function
function linkRedirect() {
  const filters = document.querySelectorAll(".filterBtn");
  filters.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      let myURL = window.location.pathname;
      let value = event.target.dataset.filter;
        if (myURL != "/store/"){
          location.href = "/store";
          localStorage.setItem('filter', value)
        }
    });
  });
}

// apply filter from local storage that was saved up in local storage
function applyFilterStore(){
  if(localStorage.getItem('filter') != null){
    filterFunction(localStorage.getItem('filter'))
    const filters = document.querySelectorAll(".filterBtn");
    filters.forEach(function(btn) {
      btn.addEventListener("click", function(event) {
        let value = event.target.dataset.filter;
        filterFunction(value)
        // filterFunction(localStorage.getItem('filter'))
      });
    });

    
  }
}

// ####################################################
// ###############   SINGLE ITEM PAGE  ################
// ####################################################

// option button toggle for singe item page
// change colors of the 2 buttons depending what button is clicked
function btnToggle() {
  const fab1 = document.getElementById("fabric-1");
  const fab2 = document.getElementById("fabric-2");
  const optn1 = document.getElementById("option-1");
  const optn2 = document.getElementById("option-2");

  fab1.onclick = function() {
    if (fab1.className == "btn btn-option-2 border") {
      fab1.className = "btn btn-option-1 border";
      fab2.className = "btn btn-option-2 border ml-2";
    }
  };
  fab2.onclick = function() {
    if (fab2.className == "btn btn-option-2 border ml-2") {
      fab1.className = "btn btn-option-2 border";
      fab2.className = "btn btn-option-1 border ml-2";
    }
  };

  optn1.onclick = function() {
    if (optn1.className == "btn btn-option-2 border") {
      optn1.className = "btn btn-option-1 border";
      optn2.className = "btn btn-option-2 border ml-2";
    }
  };
  optn2.onclick = function() {
    if (optn2.className == "btn btn-option-2 border ml-2") {
      optn1.className = "btn btn-option-2 border";
      optn2.className = "btn btn-option-1 border ml-2";
    }
  };
}

// ####################################################
// ###############   STORE PAGE  ######################
// ####################################################
// drop down windows in store menu
function chevronBtn() {
  var button = document.getElementsByClassName("click");
  for (let i = 0; i < button.length; i++) {
    let clickedButton = button[i];
    let main = clickedButton.parentElement.parentElement;
    let list = main.children[1];
    clickedButton.onclick = function() {
      if (list.className == "box") {
        list.className = "hidden";
        clickedButton.className = "fas fa-chevron-down click";
      } else {
        list.className = "box";
        clickedButton.className = "fas fa-chevron-up click";
      }
    };
  }
}

// filtering out by class name or showing item that want to see in store page
// get all filter buttons and links
// get function variable from data-filter of the clicked button/link
function filterFunction(filterData) {
  // console.log(filterData)
  let allItems = document.querySelectorAll(".storeItem");
  allItems.forEach(function(item) {
    //    console.log(item.classList)
    if (item.classList.contains(filterData)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// make all store items visible or resetting all filter
function resetFilter() {
  const reset = document.querySelector(".reset");
  reset.addEventListener("click", function(event) {
    let allItems = document.querySelectorAll(".storeItem");
    allItems.forEach(function(item) {
      item.style.display = "block";
    });
  });
}

// price match
// select items in price range
function priceMatch() {
  priceBtn.addEventListener("click", function(event) {
    let allItems = document.querySelectorAll(".storeItem");
    const minPrice = document.querySelector("#minPrice");
    const maxPrice = document.querySelector("#maxPrice");
    const priceBtn = document.querySelector("#priceBtn");
    const intMax = parseInt(maxPrice.value, 10);
    const intMin = parseInt(minPrice.value, 10);
    if (intMin < intMax) {
      allItems.forEach(function(item) {
        let priceSpan = item.lastChild.previousElementSibling.innerHTML;
        let price = parseInt(priceSpan, 10);
        if (intMin < price && price < intMax) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  });
}

// search by name on store page
function nameSearch() {
  let name = document.querySelector("#nameSearch");
  name.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      let searchName = document
        .querySelector("#nameSearch")
        .value.toLocaleLowerCase();
      let allItems = document.querySelectorAll(".storeItem");
      allItems.forEach(function(item) {
        let title = item.getElementsByTagName("h6")[0];
        titleText = title.innerHTML.toLocaleLowerCase();
        if (titleText.includes(searchName)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  });
}

// add items to local storage when click on add to cart btn
function addCart() {
  let cartBtns = document.querySelectorAll("#addCart");
  if (localStorage.getItem("cart") == null) {
    var cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cartBtns.forEach(function(cartBtn) {
    cartBtn.addEventListener("click", function(event) {
      let initial = cartBtn.parentElement.parentElement;
      let itemId = initial.id;
      let item_id = itemId.toString();
      let itemName = initial.querySelector("#title").innerHTML;
      let itemPrice = initial.querySelector("#price").innerHTML.toString();
      let itemImg = initial.querySelector("#image").src;
      if (cart[item_id] != undefined) {
        quantity = cart[item_id][0] + 1;
        cart[item_id][0] = quantity;
      } else {
        let quantity = 1;
        cart[item_id] = [quantity, itemName, itemPrice, itemImg];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      // console.log(cart[item_id][0])
      cartItemCount();
    });
  });
}

// ####################################################
// #################### CHECKOUT PAGE #################
// ####################################################

// add another address to shipping address on checkout page
function addAddress() {
  let newAddressBtn = document.querySelector("#addAddress");
  let addressBook = document.querySelector(".saved-addresses");
  newAddressBtn.addEventListener("click", function(event) {
    let fname = document.querySelector("#fname");
    let lname = document.querySelector("#lname");
    let address = document.querySelector("#address");
    let city = document.querySelector("#city");
    let state = document.querySelector("#state");
    let zip = document.querySelector("#zip");
    let errors = 0;
    let errorMsg = document.querySelector("#addressFormError");

    if (/^[A-Za-z]+$/.test(fname.value) == false) {
      errorMsg.style.display = "block";
      fname.classList.add("error-border");
      errors += 1;
    }
    if (/^[A-Za-z]+$/.test(lname.value) == false) {
      errorMsg.style.display = "block";
      lname.classList.add("error-border");
      errors += 1;
    }
    if (/^[A-Za-z]+$/.test(state.value) == false) {
      errorMsg.style.display = "block";
      state.classList.add("error-border");
      errors += 1;
    }
    if (zip.value.length != 2 || isNaN(zip.value)) {
      errorMsg.style.display = "block";
      zip.classList.add("error-border");
      errors += 1;
    }
    if (city.value == "") {
      errorMsg.style.display = "block";
      city.classList.add("error-border");
      errors += 1;
    }
    if (address.value == "") {
      address.style.display = "block";
      address.classList.add("error-border");
      errors += 1;
    }
    if (errors == 0) {
      let newAddress = `
            <li>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                    value="option1" checked>
                <label class="form-check-label" for="exampleRadios1">
                    <ul class='userItems'>
                        <li><b class='text-capitalize'>${fname.value} ${lname.value}</b></li>
                        <li class='text-capitalize'>${address.value}, ${city.value}, ${state.value} ${zip.value}</li>
                    </ul>
                </label>
            </div>
            </li>
                `;
      let itemTry = document.createElement("li");
      itemTry.innerHTML = newAddress;
      addressBook.appendChild(itemTry);

      // hide form and clean input fields after submission
      errorMsg.style.display = "none";
      let allInputFields = document.querySelectorAll("#addressForm input");
      allInputFields.forEach(function(item) {
        item.classList.remove("error-border");
        item.value = "";
      });
      let payForm = document.querySelector("#addressForm");
      let toggleBtn = document.querySelector("#addAddress");
      toggleBtn.innerHTML = "Add Address";

      payForm.classList.add("form-collapse");
    }
  });
}

// add another payment form from check out item form
// if Statement to make ure we received correct data from the form
function addPayment() {
  let submitBtn = document.querySelector("#addPaymentBtn");
  submitBtn.addEventListener("click", function(event) {
    let nameBox = document.getElementById("cardName");
    let cardNumBox = document.getElementById("cardNum");
    let monthBox = document.getElementById("month");
    let yearBox = document.getElementById("year");
    let codeBox = document.getElementById("code");

    let name = document.querySelector("#cardName").value;
    let cardNum = document.querySelector("#cardNum").value;
    let month = document.querySelector("#month").value;
    let year = document.querySelector("#year").value;
    let code = document.querySelector("#code").value;
    let allPayments = document.querySelector(".all-payments");
    cardNum = cardNum.substring(cardNum.length - 4, cardNum.length);
    let errorPayForm = document.querySelector("#cardFormError");
    let errors = 0;
    if (isNaN(year) || year.length > 5 || year.includes(".")) {
      errorPayForm.style.display = "block";
      yearBox.classList.add("error-border");
      errors += 1;
    }
    if (isNaN(month) || parseInt(month) > 12 || month.includes(".")) {
      errorPayForm.style.display = "block";
      monthBox.classList.add("error-border");
      errors += 1;
    }
    if (isNaN(cardNum) || cardNum.length != 3 || cardNum.includes(".")) {
      errorPayForm.style.display = "block";
      cardNumBox.classList.add("error-border");
      errors += 1;
    }
    if (isNaN(code) || code.length != 3 || code.includes(".")) {
      errorPayForm.style.display = "block";
      codeBox.classList.add("error-border");
      errors += 1;
    }
    if (/^[A-Za-z]+$/.test(name.replace(" ", "")) == false) {
      errorPayForm.style.display = "block";
      nameBox.classList.add("error-border");
      errors += 1;
    }
    console.log(errors);
    if (errors == 0) {
      newPayment = `
            <li>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios"
                    id="exampleRadios1" value="option1" checked>
                    <label class="form-check-label" for="exampleRadios1">
                        <ul class='userItems'>
                            <li class='text-capitalize'><b>${name}</b></li>
                            <li>last 4 - ${cardNum}</li>
                            <li>expiration ${month}/${year}</li>
                        </ul>
                    </label>
             </div>
             </li>
        `;
      let itemTry = document.createElement("ul");
      itemTry.innerHTML = newPayment;
      allPayments.appendChild(itemTry);
      errorPayForm.style.display = "none";
      let allInputFields = document.querySelectorAll(".addCardForm input");
      allInputFields.forEach(function(item) {
        item.classList.remove("error-border");
        item.value = "";
      });
      let payForm = document.querySelector(".addCardForm");
      let toggleBtn = document.querySelector("#addCardBtn");
      toggleBtn.innerHTML = "Add Card";
      payForm.classList.add("form-collapse");
    }
  });
}

// new check out form with sliding down forms
// this one works better, old one show/hide only
function checkoutFormsSlide() {
  // all form fields
  let itemsForm = document.querySelector("#itemsForm");
  let addressForm = document.querySelector("#addressForm");
  let payForm = document.querySelector("#paymentForm");
  // all navigation btns
  let showAddress = document.querySelector("#getAddress");
  let showPay = document.querySelector("#getPayment");
  let hidePay = document.querySelector("#returnAddress");
  let hideAddress = document.querySelector("#returnItems");
  let addAddress = document.querySelector("#add-address-btn");
  addAddress.addEventListener("click", function(event) {
    let value = addressForm.classList.contains("form-collapse");
    if (value) {
      addressForm.classList.remove("form-collapse");
      addAddress.innerHTML = "Hide";
    } else {
      addAddress.innerHTML = "Add Address";
      addressForm.classList.add("form-collapse");
    }
  });
}

// slide for add address btn
function slideCardForm() {
  let payForm = document.querySelector(".addCardForm");
  let toggleBtn = document.querySelector("#addCardBtn");
  toggleBtn.addEventListener("click", function(event) {
    let value = payForm.classList.contains("form-collapse");
    // form is shown
    if (value) {
      payForm.classList.remove("form-collapse");
      toggleBtn.innerHTML = "Hide";
    }
    //    form is hidden
    else {
      toggleBtn.innerHTML = "Add Card";
      payForm.classList.add("form-collapse");
    }
  });
}

// display item that were added to card dynamically with template
// items are added to check out page
function cartLocalStorage() {
  if (localStorage.getItem("cart") == "null") {
    let cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  for (item in cart) {
    let itemId = item;
    let itemQuantity = cart[item][0];
    let itemName = cart[item][1];
    let itemPrice = cart[item][2];
    let itemImgSrc = cart[item][3];
    let itemDiv = document.getElementById("item_list");
    let itemString = `
                <div class="row d-flex align-items-baseline my-2 py-2 my-auto" id = '${itemId}' >
                    <div class="col-sm-2">
                        <img src="${itemImgSrc}" alt="img" class='img-fluid'>
                </div>
                        <div class="col-sm-4">
                            <a href="/store/item${itemId}"><h6 class='text-capitalize'>${itemName}</h6>
                            </a>
                        </div>
                        <div class="col-sm-2 item-select btn">
                            <select size="1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <h6 id='price'>${itemPrice}</h6>
                        </div>
                        <div class="col-sm-1" id='deleteBtn'>
                            <i class="far fa-trash-alt"></i>
                        </div>
                    </div>

            `;
    let itemTry = document.createElement("li");
    itemTry.innerHTML = itemString;

    itemDiv.appendChild(itemTry);
  }
}

// add items to cart local storage from item page
function cartItemPage() {
  if (localStorage.getItem("cart") == "null") {
    let cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  addToCart = document.querySelector("#orderBtn");
  addToCart.addEventListener("click", function(event) {
    // select items to add
    let itemName = document.querySelector("#title").innerHTML;
    let itemPrice = document.querySelector("#price").innerHTML.toString();
    let itemImg = document.querySelector("#itemImage").src;
    let itemId = document.querySelector(".container").id;
    let item_id = itemId.toString();
    if (cart[item_id] != undefined) {
      quantity = cart[item_id][0] + 1;
      cart[item_id][0] = quantity;
    } else {
      let quantity = 1;
      cart[item_id] = [quantity, itemName, itemPrice, itemImg];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItemCount();
  });
}

// select right option do display the number of items in cart initially
function optionInitDisplay() {
  if (localStorage.getItem("cart") == "null") {
    let cart = {};
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let itemAmountList = Object.keys(cart);
  let allItems = document.getElementById("item_list");
  for (var i = 0; i < allItems.children.length; i++) {
    let oneItem = allItems.children[i];
    let amount = itemAmountList[i];
    oneItem.value = amount;
  }
}

// get display right prices in order summary div
// get all prices from item section
function orderSummary() {
  let finPrice = document.querySelector("#items-price");
  let finShip = document.querySelector("#shipping");
  let finTax = document.querySelector("#tax");
  let total = document.querySelector("#totalPrice");
  if (localStorage.getItem("cart") == "null") {
    finPrice.innerHTML = 0;
    finShip.innerHTML = 0;
    finTax.innerHTML = 0;
    total.innerHTML = 0;
  } else {
    let totAmount = 0;
    let allItems = document.getElementById("item_list");
    for (var i = 0; i < allItems.children.length; i++) {
      let oneItem = allItems.children[i];
      let onePrice = oneItem.querySelector("#price").innerHTML;
      totAmount += parseFloat(onePrice);
      console.log(parseFloat(onePrice));
    }
    finPrice.innerHTML = "$" + totAmount;
    finShip.innerHTML = "$20";
    finTax.innerHTML = "$" + totAmount * 0.1;
    total.innerHTML = "$" + (totAmount + 20 + totAmount * 0.1);
  }
}

// delete item from check out page and local storage when click delete btn
function deleteItem() {
  deleteBnts = document.querySelectorAll("#deleteBtn");
  // console.log(deleteBnts)
  deleteBnts.forEach(function(deleteBnt) {
    deleteBnt.addEventListener("click", function(event) {
      // remove from check out page
      let item_id = deleteBnt.parentElement.id;
      let oneItem = deleteBnt.parentElement;
      let itemsContainer = oneItem.parentElement;
      // console.log(itemsContainer)
      itemsContainer.removeChild(oneItem);

      // remove item from local storage
      let cartItems = localStorage.getItem("cart");
      let cartDic = JSON.parse(cartItems);
      delete cartDic[item_id];
      localStorage.setItem("cart", JSON.stringify(cartDic));
      cartItemCount();
    });
  });
}

// place order on button submit by bringing up modal
// check if have all fields needed
// save data into database
// clear database at exit
function placeOrderModal() {
  submitBtn = document.querySelector("#submit-order");
  radioPayment = document.getElementsByName("all-payments");
  let modal = document.querySelector(".order-modal");
  let modalCloseBtn = document.querySelector(".exit-modal");
  cart = JSON.parse(localStorage.getItem("cart"));
  // close modal
  modalCloseBtn.addEventListener("click", function(event) {
    modal.classList.add("hidden");
  });
  // open modal
  submitBtn.addEventListener("click", function(event) {
    modal.classList.remove("hidden");
    addItemsModal();
    addActiveAddress();
    orderInputValue();
    document.getElementById("orders-form").submit(); 

    // gathering right information to sent to database
    // assign inputs
    function orderInputValue(){
      let inputValue = document.querySelector('#save-cart-django')
      let nameForInput = document.querySelector('#save-order-name')
      let addressForInput = document.querySelector('#save-order-address')
      inputValue.value = JSON.stringify(cart)
      for (var i = 0, length = radioAddress.length; i < length; i++) {
        if (radioAddress[i].checked) {
          let name = addressDiv.querySelectorAll("li")[0].textContent;
          let address = addressDiv.querySelectorAll("li")[1].textContent;
          nameForInput.value = name;
          addressForInput.value = address;
        };
      };  
      inputValue.value = JSON.stringify(cart)
    };
    
    // showing correct information on modal
    function addActiveAddress() {
      radioAddress = document.getElementsByName("address-radio");
      let summaryContact = document.querySelector("#dynamic-contact");
      for (var i = 0, length = radioAddress.length; i < length; i++) {
        if (radioAddress[i].checked) {
          addressDiv = radioAddress[i].parentElement;
          let name = addressDiv.querySelectorAll("li")[0].textContent;
          let address = addressDiv.querySelectorAll("li")[1].textContent;
          addedContact = `
                    <li><b id='user-name'>${name}</b></li>
                    <li id='user-address'>${address}</li>
                    `;
          let newElement = document.createElement("li");
          newElement.innerHTML = addedContact;
          summaryContact.appendChild(newElement);
        }
      }
    }
    function addItemsModal() {
      for (item in cart) {
        let ulSummary = document.getElementById("order-summary");
        let itemId = item;
        let itemQuantity = cart[item][0];
        let itemName = cart[item][1];
        let itemImgSrc = cart[item][3];
        let addedItem = `
                <div class="row d-flex align-items-baseline my-2 py-2 my-auto">
                    <div class="col-3">
                        <img src="${itemImgSrc}" alt="img" class='img-fluid'>
                    </div>
                    <div class="col-4">
                        <a href="/store/item${itemId}"><h5 class='text-capitalize'>${itemName}</h5></a>
                    </div>
                    <div class="col-4">
                        <h5>Qty: ${itemQuantity}</h5>
                    </div>
                </div>
        `;
        let itemTry = document.createElement("li");
        itemTry.innerHTML = addedItem;
        ulSummary.appendChild(itemTry);
      }
    }
  });
}


