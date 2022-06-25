let mensagem;

function entrarNaSala(){
    let nome = prompt('Olá! Qual o seu nome?')
    const nomeUsuario = {
        nome: nome
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promise.then(buscarMsg);
    promise.catch(alertaErro);
    buscarMsg();
}

function mantemConectado (){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeUsuario);
    promise.then(buscarMsg);
}

setInterval(mantemConectado, 5000);

function buscarMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(pegaMsg);
}

function pegaMsg (resposta){
    mensagem = resposta.data;
    renderizaMsg();
}

function renderizaMsg(){
    const ulMsg = document.querySelector('.mensagens');
    
    ulMsg.innerHTML = "";
    const liMsg = document.querySelector('li');
    for (let i = 0; i < mensagem.length; i++) {
        if (mensagem[i].type === 'status'){
            ulMsg.innerHTML += `
        <li class="entrada">
            <span>${mensagem[i].time} ${mensagem[i].from} ${mensagem[i].text}...</span>
        </li>`
        } else if (mensagem[i].type === 'message'){
            ulMsg.innerHTML += `
        <li class="msg">
            <span>${mensagem[i].time} ${mensagem[i].from} para ${mensagem[i].to}: ${mensagem[i].text}</span>
        </li>`
        }  else if (mensagem[i].type === 'private_message'){
            ulMsg.innerHTML += `
        <li class="reservado">
            <span>${mensagem[i].time} ${mensagem[i].from} reservadamente para ${mensagem[i].to}: ${mensagem[i].text}</span>
        </li>`
        }  
    }
        
}

function enviarMsg(){
    let msgEscrita = document.querySelector('.aEnviar').value;
    let novaMsg = {
        from: 'dani',
        to:'todos',
        text: msgEscrita,
        type:'message'
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMsg);
    promise.then(renderizaMsg);
    alert('oi')
}

function alertaErro(error){
    if (error.response.status === 404){
        alert('Este nome já está sendo utilizado');
        entrarNaSala();
    }
}

entrarNaSala();