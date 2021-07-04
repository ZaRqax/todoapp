
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function create_todo_obj(todo) {
    let checked = todo.checked===true?'d-none':''
    let checked1 = todo.checked===true?'':'d-none'
    let mute = todo.checked===true?'mute':''
    body = `<div class="row px-3 align-items-center todo-item rounded">\
    <div class="col-auto m-1 p-0 d-flex align-items-center" id = "todo1" onclick="change_state($(this),$(${todo.id}))">\
    <h2 class="m-0 p-0">\

    <i class="fa fa-square-o text-primary btn m-0 p-0 ${checked} " data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i>\
    <i class="fa fa-check-square-o text-primary btn m-0 p-0 ${checked1} " data-toggle="tooltip" data-placement="bottom" title="Mark as todo"></i>\
    \
    </h2>\
    </div>\
    <div class="col px-1 m-1 d-flex align-items-center">\
    <input type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 ${mute}" readonly value="${todo.text}" title="Buy groceries for next week" />\
    <input type="text" class="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none" value="" />\
    </div>\
    <div class="col-auto m-1 p-0 px-3 d-none">\
    </div>\
    <div class="col-auto m-1 p-0 todo-actions">\
    <div class="row d-flex align-items-center justify-content-end">\
        <h5 class="m-0 p-0 px-2">\
        <i class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Edit todo"></i>\
        </h5>\
        <h5 class="m-0 p-0 px-2">\
        <i class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" onclick="delete_todo($(this),$(${todo.id}))" title="Delete todo"></i>\
        </h5>\
        </div>\
        <div class="row todo-created-info">\
        <div class="col-auto d-flex align-items-center pr-2">\
        <i class="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Created date"></i>\
        <label class="date-label my-2 text-black-50">${todo.date}</label>\
        </div>\
        </div>\
        </div>\
        </div>`

        if (todo.checked===true){
            $('#done_todo').append(body)

        }else{
            $('#not_done_todo').append(body)

        }
}

function create_todo(todo) {
    $.post('api/',todo,function (data,status) {
        console.log(status)
    })
    create_todo_obj(todo)


}

function  getTodos() {
    $.get('api/',function(result){
    for (var todo of result){
        create_todo_obj(todo)
    }})
}
window.onload = function () {
    getTodos()

    
    };
    
    
    // Переключение клика вкл выкл v2.0 
async function change_state(component,id){
    console.log(id)
    component.parent().fadeOut(200)
    await sleep(200)
    i = component.children().children()
    i.each(function(){
        $(this).toggleClass('d-none')
    })
    $(component.parent().children()[1]).children().toggleClass('mute')
    
    if ($(i[0]).hasClass('d-none') ){
        
        $('#done_todo').append(component.parent())
        
    } else {
        
        // $(component.parent().children()[1]).children().toggleClass('mute')
        $('#not_done_todo').append(component.parent())
    }
    component.parent().fadeIn('slow')
    $.get(`api/${id[0]}`,function(result){
        $.ajax({
            url:`api/${id[0]}/`,
            method:'put',
            data: {text:result.text,checked:!result.checked}})

})

}

async function delete_todo(component,id){
    console.log(id[0])
    component = component.parent().parent().parent().parent()
    component.fadeOut('fast')
    await sleep(300)
    component.remove()
    $.ajax(`api/${id[0]}`,{type:'delete'},function(){console.log('d')})
}

function sort_todo(){
    var todolist= $('#todolist').children().children()
    console.log(todolist)
    todolist.remove()
    for (var i =0; i <todolist.lenght-1; i++){
        if (string(todolist[i].children()[0].classList).indexOf('d-none')!=-1) {
            [todolist[i],todolist[i+1]] = [todolist[i+1],todolist[i]]
        }
    }
    $('#todolist').children().append(todolist)
}

$('#add_button').click(function(){
    if ($('#create_todo')[0].value != ''){
       todo ={
        text: $('#create_todo')[0].value, 
        checked: false
       }
       create_todo(todo)

        $('#create_todo')[0].value = ''

    }})