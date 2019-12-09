const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const text = document.getElementById('text')
const errorElement = document.getElementById('error')


form.addEventListener('submit', (e) => {
    let messages = []
    if(name.value === '' || name.value == 'null'){
        messages.push('name')
    }
    if(email.value === '' || email.value == 'null'){
        messages.push('emal')
    }
    if(phone.value === '' || phone.value == 'null'){
        messages.push('phone')
    }
    if(text.value === '' || text.value == 'null'){
        messages.push('text')
    }

    if (messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ') + ' reqired'
    }


})