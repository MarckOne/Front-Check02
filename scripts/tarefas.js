const userNameRef = document.querySelector('#userName');
const userFotoRef = document.querySelector('.user-image');
const btnCadastrarTarefasRef = document.querySelector('#cadastrarTarefa');
const inputNovaTarefaRef = document.querySelector('#novaTarefa');
const containerTarefas = document.querySelector('.tarefas-pendentes');
const skeletonRef = document.querySelector('#skeleton');
const btnRemoverTarefaRef = document.querySelector('.bin-img');
const btnCloseAppRef = document.querySelector('#closeApp');

//Formata data
let date = new Date();


//Insere o nome do usuário na tela
const mostraNomeUsuário = () =>{

  let requestHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestHeaders)
    .then(response =>{
      response.json()
      .then(data =>{
        userNameRef.innerHTML = `${data.firstName} ${data.lastName}`;
        userFotoRef.src = '../assets/foto-login.png'
    });
  });
}

//Mostra as tarefas
const mostraTarefas = () =>{

  let requestHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestHeaders)
    .then(response =>{
      response.json()
      .then(data =>{
        skeletonRef.classList.add('display')
        let tasks = data
        for(let task of tasks){
          containerTarefas.innerHTML += `      
          <li class="tarefa">
          <div class="not-done"></div>
          <div class="descricao">
            <p class="nome">${task.description}</p>
            <p class="timestamp">Criada em: ${task.createdAt}</p>
            <img class="bin-img" src="../assets/bin.png" alt="Remover tarefa">
          </div>
        </li>
          `
        }
    });
  });
}

//Posta as novas tarefas
const postNovaTarefa = () => {
  let tasksRegister = {
    description: inputNovaTarefaRef.value,
    completed: false,
  }

  let requestConfig = {
    method: 'POST',
    body: JSON.stringify(tasksRegister),
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  if(tasksRegister.description !== ''){
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', requestConfig)
      .then(response => {
        response.json()
        .then(data =>{
          console.log(data)
            containerTarefas.innerHTML += `      
            <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${data.description}</p>
              <p class="timestamp">Criada em: ${date.toLocaleDateString()}</p>
              <img class="bin-img"src="../assets/bin.png" alt="Remover tarefa">
            </div>
          </li>
            `
      });
    });
  } else {
     alert('Por favor preencha o nome da tarefa!')
    }
}

//Remove tarefa **não está funcionando pedi ajuda para o assitente técnico
const removerTarefa = () => {

  let requestConfig = {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json',
      Authorization: localStorage.getItem('token')
    }
  }

  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, requestConfig) 
    .then(response => {
      response.json()
    .then(data => {
      console.log(data)
    });
 });
}

//Sai do App
const logoutApp = () => {

}


//Invoca as funções
mostraNomeUsuário();
mostraTarefas();
btnCadastrarTarefasRef.addEventListener('click', e =>{
  e.preventDefault()
  postNovaTarefa()
});
btnRemoverTarefaRef.addEventListener('click', removerTarefa);
btnCloseAppRef.addEventListener('click', logoutApp);


