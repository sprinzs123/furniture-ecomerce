// drop down windows in store menu
var button = document.getElementsByClassName('click')

for (let i=0; i<button.length; i++){
    let clickedButton = button[i];
    let main = clickedButton.parentElement.parentElement;
    let list = main.children[1];
    // console.log(list)

    clickedButton.onclick = function(){
        // console.log(list)

        if(list.className == 'box'){
            // console.log('shrink');
            list.className = 'hidden';
            clickedButton.className = 'fas fa-chevron-down click';
        }
        else{
        // console.log('expand')    
        list.className = 'box';
        clickedButton.className = 'fas fa-chevron-up click';   
        }
    }
    
}

// option button toggle
let fabric1 = document.getElementById('fabric-1')
let fabric1 = document.getElementById('fabric-1')
clickedButton.onclick = function(){
    
}