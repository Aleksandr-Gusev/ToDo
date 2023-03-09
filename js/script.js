//поиск элементов
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const li_length = document.querySelectorAll('.btn-action')

let mas_task = [];

//проверяем пусто ли в хранилище
if (localStorage.getItem('tasks')){
    mas_task = JSON.parse(localStorage.getItem('tasks'));
}

// проходим по всем элементам массива и рендерим страницу
mas_task.forEach(function(e){
    // для отображения нужного класса, используется тернарный оператор
    const cssClass = e.done ? "task-title task-title-done" : "task-title";
     
    // формирование разметки для новой задачи
    const taskHTML = `<li id="${e.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${e.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="../img/done.png" alt="done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="../img/del.png" alt="done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    
    // Добавлем разметку на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
})

checkEmptyList();

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

    //объект который будет хранить данные по задачам

    const newTask = {
        id: Date.now(),         //генерируется милисекунда 
        text: taskText,
        done: false
    }
    mas_task.push(newTask);
    
    //добавляем данные в хранилище данных браузера
    saveToLocalStorage();

    // для отображения нужного класса, используется тернарный оператор
    const cssClass = newTask.done ? "task-title task-title-done" : "task-title";
     
    // формирование разметки для новой задачи
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="../img/done.png" alt="done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="../img/del.png" alt="done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    
    // Добавлем разметку на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    

    //очищаем инпут и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();


    // удаление сообщения
    /* if(tasksList.children.length > 1){
        emptyList.classList.add('none');
    } */
    checkEmptyList();
    
};

function deleteTask(e){
    if (e.target.dataset.action !== "delete"){return;}

    if (e.target.dataset.action == "delete"){                 // обращение к атрибуту кнопки data-action
        const parentNode = e.target.closest('li');            // поиск ближайшего родителя, родительская нода
        const id = parentNode.id;                             // определяем id задачи  
        

        // ищем индекс который удаляем
        const index = mas_task.findIndex(function(e){
            if(e.id == id) {return true;}
        })
        mas_task.splice(index, 1);                              // удаление 1 элемента начиная с index
        console.log(mas_task);

        //добавляем данные в хранилище данных браузера
        saveToLocalStorage();
        //удаляем задачу
        parentNode.remove();

        //показываем список дел пуст
        /* if(tasksList.children.length == 1){
            emptyList.classList.remove('none');
        }   */  
        checkEmptyList();
    }   

    
     
}

function doneTask(e){
    if (e.target.dataset.action !== "done"){return;}                 //сразу выходим из функции
    
    if (e.target.dataset.action == "done"){                         //обращение к атрибуту кнопки data-action
        const parentNode = e.target.closest('li');                  // поиск ближайшего родителя, родительская нода
        const taskTitle = parentNode.querySelector('.task-title'); // Находим нужный элемент
        taskTitle.classList.toggle('task-title-done');              //toggle переключает, добавляет и удаляет при нажатиях на кнопку
        
        const id = parentNode.id;                             // определяем id задачи  
        

        // ищем индекс который выполняем
        const task = mas_task.find(function(e){                // возвращает объект
            if(e.id == id) {return true;}
        })

        task.done = !task.done;
        //добавляем данные в хранилище данных браузера
        saveToLocalStorage();
    }   

}

function checkEmptyList(){
    if (mas_task.length == 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="../img/green.jpeg" alt="empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
    }
    if (mas_task.length > 0){
        const emptyElem = document.querySelector('#emptyList');
        emptyElem ? emptyElem.remove() : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(mas_task));
}