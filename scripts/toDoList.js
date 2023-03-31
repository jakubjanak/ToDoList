const tasksDiv = document.querySelector(".tasksContainer"); // div pro vytvořené úkoly
const userInput = document.querySelector("[data-user-input]"); // user input
const form = document.querySelector("form") // formulář

const LOCAL_STORAGE_KEY = "task.list";
let listOfTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let newId = Date.now();

    listOfTasks.push(fillTaskList(userInput.value, newId));
    saveToLocalStorage();

    const newDiv = document.createElement("div");
    newDiv.classList.add("tasksDiv");

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = newId;

    const newLabel = document.createElement("label");
    newLabel.htmlFor = newId;
    newLabel.innerText = userInput.value;

    const newButton = document.createElement("button");
    newButton.id = newId;
    newButton.innerText = "Delete";

    tasksDiv.append(newDiv);
    newDiv.append(newCheckbox);
    newDiv.append(newLabel);
    newDiv.append(newButton);

    newCheckbox.addEventListener("click", () => isCheckboxChecked(newCheckbox, newLabel));
    // isCheckboxChecked(newCheckbox, newLabel);

    newButton.addEventListener("click", () => {
        newDiv.remove();
        newCheckbox.remove();
        newLabel.remove();
        newButton.remove();
        console.log(listOfTasks)
        saveToLocalStorage(listOfTasks);
        
        for (let i  = 0; i < listOfTasks.length; i++) {
            console.log(listOfTasks[i].id);
            console.log(newButton.id);
            if (listOfTasks[i].id == newButton.id) {
                listOfTasks.splice(i, 1);
                console.log("It fking works!")
                console.log(listOfTasks);
                saveToLocalStorage();
            } else {
                console.log("Nothing yet!");
            }
        }
    })
    clearUserInput(userInput);
})

loadFromLocalStorage();

function fillTaskList(user_input, generated_id) {
    return { id: generated_id, name: user_input, isChecked: 0 }
}

function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listOfTasks));
}

function loadFromLocalStorage() {
    for (let x = 0; x < listOfTasks.length; x++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("tasksDiv");

        const newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.id = listOfTasks[x].id;
        

        const newLabel = document.createElement("label");
        newLabel.htmlFor = listOfTasks[x].id;
        newLabel.innerText = listOfTasks[x].name;
        
        // kontroluje, jestli uživatel před refreshem zaškrtl checkbox
        if (listOfTasks[x].isChecked == 1) {
            newCheckbox.checked = true;
            newLabel.classList.add("checkedCheckbox");
        }

        const newButton = document.createElement("button");
        newButton.id = listOfTasks[x].id;
        newButton.innerText = "Delete";

        tasksDiv.append(newDiv);
        newDiv.append(newCheckbox);
        newDiv.append(newLabel);
        newDiv.append(newButton);

        newCheckbox.addEventListener("click", () => isCheckboxChecked(newCheckbox, newLabel));
    
        newButton.addEventListener("click", () => {
            newDiv.remove();
            newCheckbox.remove();
            newLabel.remove();
            newButton.remove();
            console.log(listOfTasks)
            saveToLocalStorage(listOfTasks);
            
            for (let i  = 0; i < listOfTasks.length; i++) {
                console.log(listOfTasks[i].id);
                console.log(newButton.id);
                if (listOfTasks[i].id == newButton.id) {
                    listOfTasks.splice(i, 1);
                    console.log("It fking works!")
                    console.log(listOfTasks);
                    saveToLocalStorage();
                } else {
                    console.log("Nothing yet!");
                }
            }
        })
    }
}

function isCheckboxChecked(checkboxInput, label) {
    const index = listOfTasks.map(object => object.name).indexOf(label.innerText);
    let indexIndex = index;
    if (checkboxInput.checked) {
        label.classList.add("checkedCheckbox");
        listOfTasks[indexIndex].isChecked = 1;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listOfTasks));
    } else {
        label.classList.remove("checkedCheckbox");
        listOfTasks[indexIndex].isChecked = 0;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listOfTasks));
    }
    
    
}

function clearUserInput(input) {
    input.value = null;
}