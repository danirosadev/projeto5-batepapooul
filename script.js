let mensagem;
let nome;

function entrarNaSala(){
    nome = prompt('Olá! Qual o seu nome?');
    const nomeUsuario = {
        name: nome
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promise.then(buscaUsuario);
    promise.catch(alertaErro);
    buscarMsg();
}

function buscaUsuario(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(pegaUsuario);
}

function pegaUsuario(resposta){
    nome = resposta.data;
}

function enviarMsg(){
    let msgEscrita = document.querySelector('.aEnviar').value;
    let novaMsg = {
        from: nome,
        to:'todos',
        text: msgEscrita,
        type:'message'
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMsg);
    promise.then(renderizaMsg);
    alert('oi')
}


setInterval(buscarMsg, 3000);

function buscarMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(pegaMsg);
}

function pegaMsg (resposta){
    mensagem = resposta.data;
    renderizaMsg();
}

function scrollMsg(){
    let mensagens = document.querySelectorAll('.mensagem');
    let ultimaMsg = mensagens[mensagens.length - 1];
    ultimaMsg.scrollIntoView();
}

function renderizaMsg(){
    const ulMsg = document.querySelector('.mensagens');
    
    ulMsg.innerHTML = "";
    const liMsg = document.querySelector('li');
    for (let i = 0; i < mensagem.length; i++) {
        if (mensagem[i].type === 'status'){
            ulMsg.innerHTML += `
        <li class="mensagem entrada">
            <span>${mensagem[i].time} ${mensagem[i].from} ${mensagem[i].text}...</span>
        </li>`
        } else if (mensagem[i].type === 'message'){
            ulMsg.innerHTML += `
        <li class="mensagem msg">
            <span>${mensagem[i].time} ${mensagem[i].from} para ${mensagem[i].to}: ${mensagem[i].text}</span>
        </li>`
        }  else if (mensagem[i].type === 'private_message'){
            ulMsg.innerHTML += `
        <li class="mensagem reservado">
            <span>${mensagem[i].time} ${mensagem[i].from} reservadamente para ${mensagem[i].to}: ${mensagem[i].text}</span>
        </li>`
        }  
    }
    scrollMsg();
        
}


function alertaErro(error){
    // if (error.response.status === 400){
    //     alert('Este nome já está sendo utilizado');
    //     entrarNaSala();
    // }

    alert('deu erro')
}

entrarNaSala();