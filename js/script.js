//поиск элементов
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// добавление задачи
form.addEventListener('submit', addTask);


// удаление задачи
tasksList.addEventListener('click', deleteTask);


//отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);


//функции
function addTask(e){
    e.preventDefault(); //отмена стандартного опведения страницы 

    // дастаем текст из инпута
    const taskText = taskInput.value;
    
    // формирование разметки для новой задачи
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="/img/done.png" alt="done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="/img/del.png" alt="done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    
    // Добавлем разметку на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    

    //очищаем инпут и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();


    // удаление сообщения
    if(tasksList.children.length > 1){
        emptyList.classList.add('none');
    }
    
};

function deleteTask(e){
    if (e.target.dataset.action == "delete"){ //обращение к атрибуту кнопки data-action
        const parentNode = e.target.closest('li');            // поиск ближайшего родителя, родительская нода
        parentNode.remove();
    }   

    //показываем список дел пуст
    if(tasksList.children.length == 1){
        emptyList.classList.remove('none');
    }     
}

function doneTask(e){
    if (e.target.dataset.action == "done"){ //обращение к атрибуту кнопки data-action
        const parentNode = e.target.closest('li');            // поиск ближайшего родителя, родительская нода
        const taskTitle = parentNode.querySelector('.task-title'); // Находим нужный элемент
        taskTitle.classList.toggle('task-title-done'); //toggle переключает, добавляет и удаляет при нажатиях на кнопку
    }   

    //показываем список дел пуст
    if(tasksList.children.length == 1){
        emptyList.classList.remove('none');
    } 

}