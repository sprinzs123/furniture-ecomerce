// using to determine what page we are on and what functions to run
// what is url determine what functions we are going to run

if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }

let myPage = window.location.pathname
function getLocation(myPage) {
    // item page
    if (myPage.includes('/store/item')) {
        console.log('you are looking at item')
        btnToggle()
        carouselAll()
        cartItemPage()
    }
    // store page
    else if (myPage =='/store/') {
        console.log('you are at store')
        chevronBtn()
        carouselAll()
        resetFilter()
        priceMatch()
        nameSearch()
        linkRedirect()
        carouselAll()
        addCart()
    }
    // home page
    else if (myPage =='/'){
        console.log('you are home')
        carouselAll()
    }
    // check out page
    else if (myPage =='/checkout'){
            console.log('checkout page')
            // checkoutForms()
            cartLocalStorage()
            deleteItem()
            checkoutFormsSlide()
            slideCardForm()
            addAddress()
            addPayment()

    }
    // user page
    else if (myPage =='/mypage/'){
        console.log('user page')
    }
};
getLocation(myPage)

// function call to our main function that determines
// what functions run at the page
// getLocation(find);

// All function that used in thi page

// drop down windows in store menu
function chevronBtn() {
    var button = document.getElementsByClassName('click');

    for (let i = 0; i < button.length; i++) {
        let clickedButton = button[i];
        let main = clickedButton.parentElement.parentElement;
        let list = main.children[1];
        // console.log(list)

        clickedButton.onclick = function () {
            // console.log(list)

            if (list.className == 'box') {
                // console.log('shrink');
                list.className = 'hidden';
                clickedButton.className = 'fas fa-chevron-down click';
            }
            else {
                // console.log('expand')    
                list.className = 'box';
                clickedButton.className = 'fas fa-chevron-up click';
            }
        }

    };
};

// option button toggle for singe item page
function btnToggle() {
    const fab1 = document.getElementById('fabric-1');
    const fab2 = document.getElementById('fabric-2');
    const optn1 = document.getElementById('option-1');
    const optn2 = document.getElementById('option-2');

    fab1.onclick = function () {
        if (fab1.className == 'btn btn-option-2 border') {
            fab1.className = 'btn btn-option-1 border';
            fab2.className = 'btn btn-option-2 border ml-2';
        }
    };
    fab2.onclick = function () {
        if (fab2.className == 'btn btn-option-2 border ml-2') {
            fab1.className = 'btn btn-option-2 border';
            fab2.className = 'btn btn-option-1 border ml-2';
        }
    };

    optn1.onclick = function () {
        if (optn1.className == 'btn btn-option-2 border') {
            optn1.className = 'btn btn-option-1 border';
            optn2.className = 'btn btn-option-2 border ml-2';
        }
    }
    optn2.onclick = function () {
        if (optn2.className == 'btn btn-option-2 border ml-2') {
            optn1.className = 'btn btn-option-2 border';
            optn2.className = 'btn btn-option-1 border ml-2';
        }
    }

};


// add another address to shipping address on checkout page
function addAddress(){
    let newAddressBtn = document.querySelector('#addAddress')
    let addressBook = document.querySelector('.saved-addresses')
        newAddressBtn.addEventListener('click', function(event){
            let fname = document.querySelector('#fname').value
            let lname = document.querySelector('#lname').value
            let address = document.querySelector('#address').value
            let city = document.querySelector('#city').value
            let state = document.querySelector('#state').value
            let zip = document.querySelector('#zip').value
            let errorMsg = document.querySelector('#addressFormError')
            if(fname != '' & lname != '' & address != '' & city != '' & state != '' & zip != '' ){
                let newAddress = `
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                    value="option1" checked>
                <label class="form-check-label" for="exampleRadios1">
                    <ul class='userItems'>
                        <li><b class='text-capitalize'>${fname} ${lname}</b></li>
                        <li class='text-capitalize'>${address}, ${city}, ${state} ${zip}</li>
                    </ul>
                </label>
            </div>
                `
                let itemTry = document.createElement('li')
                itemTry.innerHTML = newAddress
                addressBook.appendChild(itemTry)
                errorMsg.style.display = 'none'
            }
            else{
                errorMsg.style.display = 'block'
            }
        });
    }        


// add another payment form from check out item form
function addPayment(){
    let submitBtn = document.querySelector('#addPaymentBtn')
    submitBtn.addEventListener('click', function(event){
        let name = document.querySelector('#cardName').value
        let cardNum = document.querySelector('#cardNum').value
        let code = document.querySelector('#code').value.toString
        let allPayments = document.querySelector('.all-payments')
        code = code.substring(-5, -1)
        let month = document.querySelector('#month').value
        let year = document.querySelector('#year').value
        let errorPayForm = document.querySelector('#cardFormError')
        if(name != '' & cardNum != '' & code != '' & month != '' & year != '' ){
            newPayment = `
            <li><b>${name}</b></li>
            <li>last 4 - ${code}</li>
            <li>expiration ${month}/${year}</li>
            `
            let itemTry = document.createElement('ul')
            itemTry.innerHTML = newPayment
            allPayments.appendChild(itemTry)
            errorPayForm.style.display = 'none'
       }
        else{
            errorPayForm.style.display = 'block'
    }
       
    });
};

// filtering out by class name or showing item that want to see in store page
// get all filter buttons and links
// get function variable from data-filter of the clicked button/link
function filterFunction(filterData) {
    // console.log(filterData)
    let allItems = document.querySelectorAll('.storeItem');
    allItems.forEach(function (item) {
        //    console.log(item.classList)
        if (item.classList.contains(filterData)) {
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    });
};
// select all filter buttons, capture filter and send filter to main
// filter function
// redirect to store page and apply filter if not there already
// global function
function linkRedirect() {
    const filters = document.querySelectorAll('.filterBtn')
    filters.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            let myURL = window.location.pathname;
            let value = event.target.dataset.filter;
            if (myURL != '/store/') {
                location.href = '/store'
                // console.log(value)
                filterFunction(value)
            }
            else {
                filterFunction(value)

            }

        });
    });
};

// make all store items visible
function resetFilter() {
    const reset = document.querySelector('.reset')
    reset.addEventListener('click', function (event) {
        let allItems = document.querySelectorAll('.storeItem');
        allItems.forEach(function (item) {
            item.style.display = 'block';
        })
    })
};


// price match
// select items in price range
function priceMatch(){
    priceBtn.addEventListener('click', function (event) {
        let allItems = document.querySelectorAll('.storeItem');
        const minPrice = document.querySelector('#minPrice')
        const maxPrice = document.querySelector('#maxPrice')
        const priceBtn = document.querySelector('#priceBtn')
        const intMax = parseInt(maxPrice.value, 10)
        const intMin = parseInt(minPrice.value, 10)

        if (intMin < intMax) {
            // console.log('you got right numbers')
            allItems.forEach(function (item) {
                let priceSpan = item.lastChild.previousElementSibling.innerHTML
                let price = parseInt(priceSpan, 10)

                if (intMin < price && price < intMax) {
                    // console.log(price)

                    item.style.display = 'block';
                }
                else {
                    item.style.display = 'none'
                };
            });
        };
});
};



// search by name on store page
function nameSearch(){
    let name = document.querySelector('#nameSearch')
    name.addEventListener('keyup',function(event){
        if (event.keyCode === 13) {
            let searchName = document.querySelector('#nameSearch').value.toLocaleLowerCase()
            let allItems = document.querySelectorAll('.storeItem');
            allItems.forEach(function(item){
                let title = item.getElementsByTagName('h6')[0]
                titleText = title.innerHTML.toLocaleLowerCase()
                // console.log(titleText)
                // console.log(searchName)

                if(titleText.includes(searchName)){
                    item.style.display = 'block'
                }
                else{
                    // console.log('no')
                    item.style.display = 'none'
                }
        });
    } 
});
};

// make carousel responsive
// add class active to 1st child
// heart above carousel responsive
function carouselAll() {
    // add active class to 1st item from database
    function carouselChild() {
        let carouselItem = document.querySelector('.carousel-item')
        carouselItem.classList.add('active')
    };
    carouselChild()

    function carouselHeart() {
        // change heart in carousel to solid red when clicked on it
        var heart = document.getElementsByClassName('fa-heart')
        for (i = 0; i < heart.length; i++) {
            let singleHeart = heart[i];

            singleHeart.onclick = function () {
                if (singleHeart.className == 'far fa-heart fa-1x heart pt-3') {
                    singleHeart.className = 'fas fa-heart text-danger fa-2x';
                    // console.log('1st')
                }
                else if (singleHeart.className = 'fas fa-heart text-danger fa-2x') {
                    singleHeart.className = 'far fa-heart fa-1x heart pt-3';
                    // console.log(singleHeart.className)

                };
                // (singleHeart.className = 'fas fa-heart text-danger fa-2x'){
                // };
            };
        };
    };
    carouselHeart()
};


// navigating between at check out between item, address, payment forms
// make check out more responsive
function checkoutForms(){
    // all form fields
    let itemsForm = document.querySelector('#itemsForm')
    let addressForm = document.querySelector('#addressForm')
    let payForm = document.querySelector('#paymentForm')

    // all navigation btns
    let showAddress = document.querySelector('#getAddress')
    let showPay = document.querySelector('#getPayment')
    let hidePay = document.querySelector('#returnAddress')
    let hideAddress = document.querySelector('#returnItems')

    // show more
    showAddress.addEventListener('click', function(event){
        console.log('click')
        addressForm.style.display = 'block'
        showAddress.style.display = 'none'
    });

    showPay.addEventListener('click', function(event){
        console.log('click')
        payForm.style.display = 'block'
        showPay.style.display = 'none'
        showAddress.style.display = 'none'
        hideAddress.style.display = 'none'

    });

    // show less
    hidePay.addEventListener('click', function(event){
        console.log('click')
        payForm.style.display = 'none'
        showPay.style.display = 'block'
        hideAddress.style.display = 'block'


    });
    hideAddress.addEventListener('click', function(event){
        console.log('click')
        addressForm.style.display = 'none'
        showAddress.style.display = 'inline'
    });
};


// new check out for with sliding down forms
// this one works better, old one show/hide only
function checkoutFormsSlide(){
        // all form fields
        let itemsForm = document.querySelector('#itemsForm')
        let addressForm = document.querySelector('#addressForm')
        let payForm = document.querySelector('#paymentForm')
        
    
        // all navigation btns
        let showAddress = document.querySelector('#getAddress')
        let showPay = document.querySelector('#getPayment')
        let hidePay = document.querySelector('#returnAddress')
        let hideAddress = document.querySelector('#returnItems')
        let addAddress = document.querySelector('#add-address-btn')

        addAddress.addEventListener('click',  function(event){
            let value = addressForm.classList.contains('form-collapse')

            console.log(addAddress.innerHTML)
            // console.group(value)
            // console.log(addressForm.classList)
            if (value) {
                addressForm.classList.remove('form-collapse')
                addAddress.innerHTML = 'Hide'
                // addressForm.classList.remove('form-expand')
               }
               else {
                addAddress.innerHTML = 'Add Address'
                 addressForm.classList.add('form-collapse')
                // addressForm.classList.add('form-collapse')
               }
    });
};

// slide for add address brt
function slideCardForm(){
    let payForm = document.querySelector('.addCardForm')
    let toggleBtn = document.querySelector('#addCardBtn')
    toggleBtn.addEventListener('click', function(event){
    let value = payForm.classList.contains('form-collapse')
        // payForm.parentElement.style.display = 'none'
        // form is shown
        if (value) {
            payForm.classList.remove('form-collapse')
            toggleBtn.innerHTML = 'Hide'
           }
        //    form is hidden
           else {
            toggleBtn.innerHTML = 'Add Card'
            payForm.classList.add('form-collapse')
           }
    });

};


// #### Functions that relate to local storage addition, saving, and displaying
// add items to local storage when click on add to cart btn
function addCart(){
    let cartBtns = document.querySelectorAll('#addCart');
    if(localStorage.getItem('cart')==null){
        var cart ={};
    }
    else{
        cart = JSON.parse(localStorage.getItem('cart'));

    }
    cartBtns.forEach(function(cartBtn){
        cartBtn.addEventListener('click', function(event){
            let initial = cartBtn.parentElement.parentElement
            let itemId = initial.id
            let item_id = itemId.toString()
            let itemName = initial.querySelector('#title').innerHTML
            let itemPrice = initial.querySelector('#price').innerHTML.toString()
            let itemImg = initial.querySelector('#image').src

            if(cart[item_id]!=undefined){
                quantity = cart[item_id][0] + 1;
                cart[item_id][0] = quantity;
                }
    
            else{
                let quantity = 1;
                cart[item_id]= [quantity, itemName, itemPrice, itemImg]
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            // console.log(cart[item_id][0])
            cartItemCount()

        });

    });
}
// display item that were added to card dynamically with template
// items are added to check out page
function cartLocalStorage(){
    if (localStorage.getItem('cart') == 'null'){
        let cart ={};
    }
    else{
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    for(item in cart){
        // console.log(item);
        let itemId = item;
        let itemQuantity = cart[item][0]
        let itemName = cart[item][1];
        let itemPrice = cart[item][2];
        let itemImgSrc = cart[item][3];

        // div where add out template
        let itemDiv = document.getElementById('item_list')
        // console.log(itemDiv)

        let itemString = `
        <div class="row d-flex align-items-baseline my-2 py-2 my-auto" id='${itemId}'>
        <div class="col-sm-2">
            <img src="${itemImgSrc}" alt="img" class='img-fluid'>
        </div>
        <div class="col-sm-4">
        <a href="/store/item${itemId}"><h6 class='text-capitalize'>${itemName}</h6>
        </a>
        </div>
        <div class="col-sm-2 item-select btn">
            <select size="1">
                <option">1</option">
                <option">2</option">
                <option">3</option>
                    <option>4</option>
            </select>
        </div>
        <div class="col-sm-2">
            <h6>${itemPrice}</h6>
        </div>
        <div class="col-sm-1" id='deleteBtn'>
            <i class="far fa-trash-alt"></i>
        </div>
    </div>
        
        `;

        let itemTry = document.createElement('li')
        itemTry.innerHTML = itemString

        itemDiv.appendChild(itemTry);
        

    }
}


// add items to cart local storage from item page
function cartItemPage(){
    if (localStorage.getItem('cart') == 'null'){
        let cart ={};
    }
    else{
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    addToCart = document.querySelector('#orderBtn')
    addToCart.addEventListener('click', function(event){
        // select items to add
        let itemName = document.querySelector('#title').innerHTML
        let itemPrice = document.querySelector('#price').innerHTML.toString()
        let itemImg = document.querySelector('#itemImage').src
        let itemId = document.querySelector('.container').id
        let item_id = itemId.toString()


        // console.log(itemName, itemPrice, itemImg, itemId)
        // add items
        if(cart[item_id]!=undefined){
            quantity = cart[item_id][0] + 1;
            cart[item_id][0] = quantity;
            }

        else{
            let quantity = 1;
            cart[item_id]= [quantity, itemName, itemPrice, itemImg]
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        cartItemCount()
        // console.log(cart[item_id][0])

    });

};


// delete item from check out page and local storage
function deleteItem(){
    deleteBnts = document.querySelectorAll('#deleteBtn')
    // console.log(deleteBnts)
    deleteBnts.forEach(function(deleteBnt){
        deleteBnt.addEventListener('click', function(event){    
            // remove from check out page
            let item_id = deleteBnt.parentElement.id
            let oneItem = deleteBnt.parentElement
            let itemsContainer = oneItem.parentElement
            // console.log(itemsContainer)
            itemsContainer.removeChild(oneItem)

            // remove item from local storage
            let cartItems = localStorage.getItem('cart')
            let cartDic = JSON.parse(cartItems)
            delete cartDic[item_id];
            localStorage.setItem('cart', JSON.stringify(cartDic))
            cartItemCount()
        }); 
    });        
};


// display how many items are in the cart
// global function
function cartItemCount(){
    // let itemsContainer = document.querySelector('#item_list')
    let cartCount = document.querySelector('.cart-items')
    // let itemNum = itemsContainer.childElementCount
    // console.log(itemNum)
    if (localStorage.getItem('cart') == 'null'){
        cartCount.innerHTML = '0'
    }
    else{
        cart = JSON.parse(localStorage.getItem('cart'))
        itemNum = Object.keys(cart).length
        cartCount.innerHTML = itemNum

    }
};
cartItemCount()