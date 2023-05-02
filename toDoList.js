// SELECTION OF THE ELEMENTS
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-input");
const toDoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue; // creating a variable to the old name of the title

// FUNCTIONS
const saveToDo = (text) => {
    // it is coding the html part where you can find the todo-list
    // if you inspect the code you will see the the JS is producing the same "div", "h3" that is written in the html for this part
    const toDo = document.createElement("div"); 
    toDo.classList.add("todo");

    const toDoTitle = document.createElement("h3");
    toDoTitle.innerText = text;
    toDo.appendChild(toDoTitle);

    // creating the buttons
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("edit-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("finish-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDo.appendChild(editBtn)

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toDo.appendChild(removeBtn);

    toDoList.appendChild(toDo);
    toDoInput.value = ""; // it helps cleaning the search box when the user finish writing.
    toDoInput.focus();

}

// here you start the function for toggleForms
const toggleForms = () => {
    editForm.classList.toggle("hide") // I used this to show only the edition part and not the rest of the tool, you can check the hidden part in the HTML
    toDoForm.classList.toggle("hide") 
    toDoList.classList.toggle("hide")     
}

// creating the function of the update
const updateToDo = (text) => {
    const toDos = document.querySelectorAll(".todo") // select all the todos, you need to put the .todo because it's a class

    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector("h3") // as the tasks can change in the process, we'll go for each one of them

        console.log(toDoTitle, text)

        if(toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = text
        }
    })
}

// EVENTS
// This first event happens because of the first function (saveToDo)
toDoForm.addEventListener("submit", (e => {
    e.preventDefault(); // it makes the tool submits the form without refreshing the page.

    const inputValue = toDoInput.value; // it is made to avoid users save tasks without writing anything.
    if(inputValue) {
        saveToDo(inputValue)
    }
}))

// this next event will repeat the same action for the buttons listed
document.addEventListener("click", (e) => {
    const targetEl = e.target; // you take the target itself
    const parentEl = targetEl.closest("div"); // here you take the closest div to the target
    let toDoTitle; // I created a variable for the title of the list

    // Now I checked if there is a title
    if(parentEl && parentEl.querySelector("h3")) {
        toDoTitle = parentEl.querySelector("h3").innerText; // if it exists and has a name, the title will have the same name
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done"); // if you click on the button to finish the task it will activate the status done (view CSS)
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove(); 
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms(); 
        editInput.value = toDoTitle;
        oldInputValue = toDoTitle;
    }
})

// a new event: to cancel an edition
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

// creating the event of editing the task
editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateToDo(editInputValue)
    }
    
    toggleForms();
})