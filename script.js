var title = document.querySelector('.title')
var feedback = document.querySelector('.feedback')
var url = document.querySelector('.url')
var addTask = document.querySelector('.addTask')
var sighOut = document.querySelector('.sighOut')
var container = document.querySelector('.row')
const placeModal = document.querySelector('.containers')
const searchPanel = document.querySelector('.search-pannel')
const searchContent = document.querySelector('.search-content')
const select = document.querySelector('.select')

// Add Task

window.addEventListener('load', e => {
  e.preventDefault();
  
  if(!localStorage.getItem('todos')){
    localStorage.setItem('todos', JSON.stringify([]))
  } else{
    const todo = JSON.parse(localStorage.getItem('todos'))

    const newTodo = todo.map((item , index) =>{
      return {...item , id:index}
    })

    localStorage.setItem('todos' , JSON.stringify([...newTodo]))

    const temp = JSON.parse(localStorage.getItem('todos'))

    Card(temp)


  }
})



function Card(object){
  const todos = object.map(({title, content, id , image}) => {
    return  `
    <div class="card col-xl-4 mt-4 me-4">
        <div class="card-header">
            <h1>${title}</h1>
        </div>
        <div class="card-body"> 
            <img src=${image} class="w-100">
        </div>
        <p>${content}</p>

        <div class="card-footer">
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger"data-id=${id} onclick="DeleteTask(${id})"  >Delete</button>
                <button class="btn btn-primary" data-id=${id} onclick="Edit(${id})">Edit</button>
                <button class="btn btn-warning" onclick="More(${id})" data-id=${id}>More</button>
            </div>
        </div>
    </div>
`
  })

  container.innerHTML = todos

}


function DeleteTask(id){
    var ask = confirm('Are you sure?')
    if(!ask) return;


    const todos = JSON.parse(localStorage.getItem('todos'))
    console.log(todos)
    const newTodos = todos.filter(item => item.id !== id)
    localStorage.setItem('todos', JSON.stringify([...newTodos]))
    window.location.reload()
}


function Edit(id){
  const todo = JSON.parse(localStorage.getItem('todos'))
  const newTodo = todo.map(item =>{
    if(item.id === id){
        return {...item ,
          title:prompt('Title'),
          content:prompt('Content')
        }
    }else{
      return item
    }
  })
  localStorage.setItem('todos' ,JSON.stringify([...newTodo]))
  window.location.reload()
}



// Add the task



function More(id){
    const todo = JSON.parse(localStorage.getItem('todos'))
    console.log(todo)  
    localStorage.setItem('single' , JSON.stringify([todo[id]]))

    window.open('single.html' , '_self')
}


addTask.addEventListener('click', e => {
  e.preventDefault();
  if(title.value !='' && feedback.value !='' && url.value !='' ){
    const todos = JSON.parse(localStorage.getItem('todos'))

    localStorage.setItem('todos', JSON.stringify([...todos, {title: title.value, content: feedback.value, image: url.value}]))
    window.location.reload();

  } else {
    alert('Error!')
  }
})

// SeachTitle

searchPanel.addEventListener('input', e => {
  var value = e.target.value.toUpperCase();

  const todos = JSON.parse(localStorage.getItem('todos'))
  const filtered = todos.filter(({title}) => title.toUpperCase().includes(value))
  
  Card(filtered)
})

// SearchContent

searchContent.addEventListener('input', e => {
  var value = e.target.value.toUpperCase();

  const todos = JSON.parse(localStorage.getItem('todos'))
  const filtered2 = todos.filter(({content}) => content.toUpperCase().includes(value))

  Card(filtered2)
})

// Select color
var body = document.body

select.addEventListener('change', e => {
  var value = e.target.value

  if(value === 'light'){
    body.style.background = 'white'
    localStorage.setItem('ThemeItem', '#fff')
    localStorage.setItem('theme', 'light')
  } else if (value === 'dark') {
    body.style.background = '#000'
    localStorage.setItem('ThemeItem', 'rgba(0, 0, 0, 0.9')
    localStorage.setItem('theme', 'dark')
  } else {
    var color = prompt('Color?')
    body.style.background = color
    localStorage.setItem('ThemeItem', color)
    localStorage.setItem('theme', 'custom')
    
  }
})

window.addEventListener('load', () =>{
 if( localStorage.getItem('theme')){
   body.style.background = localStorage.getItem('ThemeItem')
   select.value = localStorage.getItem('theme')
 }
})

sighOut.addEventListener('click', e => {
  e.preventDefault();

  localStorage.setItem('isAuth','false')
  window.open('auth.html', '_self')
})

window.addEventListener('load', e => {
    if(localStorage.getItem('isAuth') === 'false') {
    window.open('auth.html', '_self')
    } else{
      return
    }
})  
