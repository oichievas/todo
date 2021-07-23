var email = document.querySelector('.email')
var password = document.querySelector('.password')
var logIn = document.querySelector('.logIn')

logIn.addEventListener('click', e =>{
    e.preventDefault();

    if(email.value == 'admin' && password.value == 'admin'){
        alert('Вы вошли!')
        localStorage.setItem('isAuth', 'true')
        window.open('index.html', '_self')
    }else{
        alert('Не правильно ввели данные или Заполни поля!');
        localStorage.setItem('isAuth', 'false')
        email.value = '';
        password.value = '';
    }

})

window.addEventListener('load', e =>{
    if(!localStorage.getItem('isAuth')) return;

    if(localStorage.getItem('isAuth') === 'true')
    window.open('index.html', '_self')
})