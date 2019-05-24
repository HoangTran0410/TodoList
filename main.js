window.onload = function() {

    // on key enter
    var inp = document.getElementById('myInput');
    inp.addEventListener('keyup', function(ev) {
        if (ev.keyCode == 13) {
            document.getElementById('btnAddTodo').click();
        }
    })

    // event click button add
    var btn = document.getElementById('btnAddTodo');
    btn.addEventListener('click', function() {
        var text = document.getElementById("myInput").value;
        if (text === '') {
            alert("You must write something!");
            return;
        }

        var todo = {};
        todo.text = text;
        todo.date = new Date().toDateString();
        todo.checked = false;

        addTodo(todo);
        refreshTodoList();

        document.getElementById('myInput').value = '';
    })

    // Add a "checked" symbol when clicking on a list item
    var ulList = document.querySelector('ul');
    ulList.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');

            var div = ev.target;
            var t = div.textContent;
            var t = t.substring(0, t.length - 1); // remove x symbol
            var checkStage = (ev.target.classList == 'checked');
            checkedTodo(t, checkStage);

        } else if (ev.target.tagName === 'SPAN' && ev.target.classList == 'close') {
            var div = ev.target.parentElement;
            div.style.display = "none";

            var t = div.textContent; 
            t = t.substring(0, t.length - 1); // remove x symbol
            removeTodo(t);
        }
    }, false);

    refreshTodoList();
}

// -------------- add todo list to ul ----------------
function refreshTodoList() {
    document.getElementById('myUL').innerHTML = '';
    for (var todo of getLocalTodoList()) {
        createNewTodo(todo);
    }
}

// Create a new list item when clicking on the "Add" button
function createNewTodo(todo) {
    // ------------- show todo
    var li = document.createElement("li");
    var t = document.createTextNode(todo.text);
    li.appendChild(t);

    if (todo.checked) li.classList = 'checked';

    // Create a "close" button and append it to each list item
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);
}

// ----------- local storage -------------
function getLocalTodoList() {
    var localList = localStorage.getItem('todolist');
    if (!localList) return [];
    return JSON.parse(localList);
}

function setLocalTodoList(list) {
    localStorage.setItem('todolist', JSON.stringify(list));
}

function checkedTodo(todoText, check) {
    var list = getLocalTodoList();
    for (var t of list) {
        if (t.text == todoText) {
            t.checked = check;
            break;
        }
    }
    setLocalTodoList(list);
}

function removeTodo(todoText) {
    var list = getLocalTodoList();
    for (var t of list) {
        if (t.text == todoText) {
            list.splice(list.indexOf(t), 1);
            break;
        }
    }
    setLocalTodoList(list);
}

function addTodo(todo) {
    var list = getLocalTodoList();

    var alreadyHave = false;
    for (var t of list) {
        if (t.text == todo.text) {
            t = todo;
            alreadyHave = true;
            break;
        }
    }
    if (!alreadyHave) list.push(todo);

    setLocalTodoList(list);
}