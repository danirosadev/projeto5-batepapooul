let mensagem;
let nome;
let meuNome;

setInterval(buscarMsg, 3000);

function entrarNaSala(){
    meuNome = prompt('Olá! Qual o seu nome?');
    const nomeUsuario = {
        name: meuNome
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
    console.log(nome);
}

function enviarMsg(){
    
    let msgEscrita = document.querySelector('.aEnviar').value;
    let tipo = 'message';
    let destinatario = 'todos';

    let novaMsg = {
        from: meuNome,
        to: destinatario,
        text: msgEscrita,
        type: tipo
    }
    console.log('novaMsg');
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMsg);
    promise.then(buscarMsg);
    msgEscrita.innerHTML = '';
    alert('oi')
}


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
    if (error.response.status === 400){
        alert('Este nome já está sendo utilizado');
        entrarNaSala();
    }
}

entrarNaSala();