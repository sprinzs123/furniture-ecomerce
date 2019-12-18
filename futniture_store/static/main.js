// using to determine what page we are on and what functions to run
// what is url determine what functions we are going to run
let find = window.location
find = find.toString()

function getLocation(myPage) {
    // item page
    if (myPage.includes('store/item')) {
        console.log('you are looking at item')
        btnToggle()
    }
    // store page
    else if (myPage.includes('/store')) {
        console.log('you are at store')
        chevronBtn()
        filterFunction()
    }
    // home page
    else {
        console.log('you are home')
    };
};

// function call to our main function that determines
// what functions run at the page
getLocation(find);

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
    // change heart in carousel to solid red when clicked on it
    var heart = document.getElementsByClassName('heart')
    for (i = 0; i < heart.length; i++) {
        let singleHeart = heart[i];
        singleHeart.onclick = function () {
            singleHeart.className = 'fas fa-heart text-danger fa-2x heart';
        }
    };
};


// filtering out by class name or showing item that want to see in store page
// get all filter buttons
function filterFunction(){
    const filters = document.querySelectorAll('.filterBtn')
    filters.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            const value = event.target.dataset.filter;
            let allItems = document.querySelectorAll('.storeItem');
            allItems.forEach(function (item) {
                //    console.log(item.classList)
                console.log(value)
                if (item.classList.contains(value)) {
                    item.style.display = 'block';
                }
                else {
                    item.style.display = 'none';
                }
            })
        });
    });
};

// (function () { })();

