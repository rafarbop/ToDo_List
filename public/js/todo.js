
// Carregando configurações e dados iniciais
window.onload = () => {
    var user = localStorage.getItem("user");
    var allTasksLocalStorage = localStorage.getItem("listAllTask");
    if (user) {
        document.getElementById("userLocal").innerText = user;
    } else {
        document.getElementById("userLocal").innerHTML = "<em>Convidado</em>";
    }
    if (allTasksLocalStorage) {
        document.getElementById("listAllTask").innerHTML = allTasksLocalStorage;
    } else {
        document.getElementById("listAllTask").innerHTML = "<li>Nenhuma Tarefa Planejada</li>";
    }
};

// Informar ou Alterar nome do usuário
document.querySelector("header p sup").onclick = () => {
    document.getElementById("new-username").classList.toggle("d-none")
    document.getElementById("newUser").value = ""
}
document.getElementById("confirmNewUser").onclick = () => {
    var newUser = document.getElementById("newUser");
    if (newUser.value) {
        localStorage.setItem("user", newUser.value);
        document.getElementById("userLocal").innerText = newUser.value;
    } else {
        window.alert("Nenhum nome informado");
    }
    document.getElementById("new-username").classList.toggle("d-none")
};


// Ler tarefa a incluir, criar novo elemento li e incluir texto
document.getElementById("confirmNewTask").onclick = () => {
    var newTask = document.getElementById("newTask");
    var listAllTask = document.getElementById("listAllTask");
    if (newTask.value) {
        var itemList = document.createElement("li");
        var inputList = document.createElement("input");
        var labelInputList = document.createElement("label");
        inputList.type = "checkbox";
        inputList.checked = false;
        inputList.style.marginRight = "0.5rem"
        inputList.setAttribute("onclick","labelChanged(this)");
        labelInputList.innerText = newTask.value
        itemList.appendChild(inputList);
        itemList.appendChild(labelInputList);
        newTask.value = "";

        if (!localStorage.getItem("listAllTask")){
            listAllTask.innerHTML = "";
        }
        listAllTask.appendChild(itemList);
        localStorage.setItem("listAllTask", listAllTask.innerHTML);
    } else {
        window.alert("Nenhuma tarefa informada!");
    }
};

function labelChanged(inputItemList) {
    var listAllTask = document.getElementById("listAllTask");
    console.log(inputItemList.parentElement.lastChild)
    if (inputItemList.checked == true){
        inputItemList.parentElement.lastChild.style.textDecoration = "line-through"
        inputItemList.setAttribute("checked","true")
        console.log(inputItemList)
    }
    else {
        inputItemList.parentElement.lastChild.style.textDecoration = "none"
        inputItemList.setAttribute("checked","false")
        console.log(inputItemList)
    }
    localStorage.setItem("listAllTask", listAllTask.innerHTML);
}

// Opções de limpeza de dados
document.getElementById("cleanAllTask").onclick = () => {
    localStorage.removeItem("listAllTask");
    document.getElementById("listAllTask").innerHTML = "<li>Nenhuma Tarefa Planejada</li>";
};
document.getElementById("clean-username").onclick = () => {
    localStorage.removeItem("user");
    document.getElementById("userLocal").innerText = "Convidado";
};
document.getElementById("clean-all-data").onclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("listAllTask");
    document.getElementById("userLocal").innerText = "Convidado";
    document.getElementById("listAllTask").innerHTML = "<li>Nenhuma Tarefa Planejada</li>";
};
// Salvando lista em formato json
document.getElementById("exportar-json").onclick = () => {
    var listTaks = []
    var idTask = 0
    document.querySelectorAll("#listAllTask > input").forEach((task) => {
        listTaks.push(`{"id":"${idTask}","Tarefa":"${task.innerText}"}`)
        idTask += 1
        
    });
    var username = document.getElementById("userLocal").innerText
    var tasksJsonText = `{"Usuário": "${username}" , "Tarefas" : [${listTaks}]}`
    var tasksJsonParsed = JSON.parse(tasksJsonText)
    console.log(tasksJsonParsed)

    // Download JSON file
    var dataStr = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(JSON.stringify(tasksJsonParsed));
    var dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "task.json");
    dlAnchorElem.click();
}
