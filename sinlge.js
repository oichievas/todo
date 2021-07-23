const singleTodo = JSON.parse(localStorage.getItem('single'))

console.log(singleTodo)

const container = document.querySelector('.container');


let frag = '';

singleTodo.forEach(({title , content , image}) => {
    let card = Card({title , content , image})
    frag += card
});

container.innerHTML = frag

function Card({title , content , image}){
    return  `
        <div>
            <div>
                <h1>${title}</h1>
            </div>
            <div>
                <img src=${image}>
            </div>
            <p>${content}</p>
        </div>
    `
}