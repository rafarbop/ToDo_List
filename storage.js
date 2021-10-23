// Ler tarefa a incluir, criar novo elemento li e incluir texto
document.getElementById("confirmNewTask").onclick = () => {
    var newTask = document.getElementById("newTask");
    var listAllTask = document.getElementById("listAllTask");
    if (newTask.value){
        var itemList = document.createElement('li')
        itemList.textContent = newTask.value
        console.log(newTask.value);
        newTask.value = ""
        listAllTask.appendChild(itemList)

        console.log(listAllTask.innerHTML)
        localStorage.setItem('listAllTask',listAllTask.innerHTML)
    }
    else {
        window.alert("Nenhuma tarefa informada!")
    }
}

document.getElementById('confirmNewUser').onclick = () => {
    var newUser = document.getElementById("newUser");
    if (newUser.value) {
        localStorage.setItem('user', newUser.value)
        document.getElementById('userLocal').innerText = newUser.value
    }
    else {
        window.alert("Informe seu Nome")
    }
}

document.getElementById('cleanAllTask').onclick = () => {
    localStorage.removeItem('listAllTask')
    document.getElementById('listAllTask').innerHTML = ''
}

window.onload = () => {
    var user = localStorage.getItem('user');
    var listAllTask = localStorage.getItem('listAllTask')
    if (user){
        document.getElementById('userLocal').innerText = user
    }
    else{
        console.log('Nenhum usuário salvo em localStorage')
    }
    if (listAllTask) {
        document.getElementById('listAllTask').innerHTML = listAllTask
    }
    else {
        console.log('Nenhuma tarefa salva em localStorage')
    }
}