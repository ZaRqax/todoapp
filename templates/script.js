const API_URL = 'http://localhost:8000'
var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

function getTodos(){
    const url = `${API_URL}/todo/api`
    // console.log(url)
    return axios.get(url,config).then(response => response.data);
}
function deleteTodo(id){
    const url = `${API_URL}/todo/api/${id.id}`;
    console.log(url)
    return axios.delete(url);
}
function createTodo(todo){
    const url = `${API_URL}/todo/api`;
    return axios.post(url, todo);
}
function updateTood(todo){
    const url = `${API_URL}/todo/api/${todo.id}/`
    console.log(todo.checked)
    return axios.put(url,todo)
}   

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

window.onload = function () {
    // bootlint.showLintReportForCurrentDocument([], {
    //     hasProblems: false,
    //     problemFree: false
    // });
    getTodos().then(function(result){
        console.log(result)
    })

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
    }

    var currentDate = formatDate(new Date());
 
 
    $(".due-date-button").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "bottom right"
    });

    $(".due-date-button").on("click", function (event) {
        $(".due-date-button")
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(".due-date-button").datepicker("hide");
                $(".due-date-label").text(formatDate(dateChangeEvent.date));
            });
        });
    };
    
    
    // Переключение клика вкл выкл v2.0 
async function change_state(component){
    console.log('sdsd')
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
// component.parent().remove()
// if (a){
// } else {
// }


}


async function delete_todo(component){
    component = component.parent().parent().parent().parent()
    component.fadeOut('fast')
    await sleep(300)
    component.remove()
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
       

        body = `<div class="row px-3 align-items-center todo-item rounded">\
            <div class="col-auto m-1 p-0 d-flex align-items-center" id = "todo1" onclick="change_state($(this))">\
            <h2 class="m-0 p-0">\
            <i class="fa fa-square-o text-primary btn m-0 p-0  " data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i>\
            <i class="fa fa-check-square-o text-primary btn m-0 p-0 d-none " data-toggle="tooltip" data-placement="bottom" title="Mark as todo"></i>\
            \
            </h2>\
            </div>\
            <div class="col px-1 m-1 d-flex align-items-center">\
            <input type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 " readonly value="${$('#create_todo')[0].value}" title="Buy groceries for next week" />\
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
                <i class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" onclick="delete_todo($(this))" title="Delete todo"></i>\
                </h5>\
                </div>\
                <div class="row todo-created-info">\
                <div class="col-auto d-flex align-items-center pr-2">\
                <i class="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Created date"></i>\
                <label class="date-label my-2 text-black-50">28th Jun 2020</label>\
                </div>\
                </div>\
                </div>\
                </div>`
                
        $('#not_done_todo').append(body)
         let todo = {
            "text":$('#create_todo')[0].value

        }
        createTodo(todo).then(()=>( console.log('create')))
        $('#create_todo')[0].value = ''
                // console.log($('#create_todo')[0].value)
    }})