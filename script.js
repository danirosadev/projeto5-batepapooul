let mensagem;
let nome;
let meuNome;
let tipo;
let destinatario;

setInterval(buscarMsg, 3000);
setInterval(buscaUsuario, 5000);

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
    tipo = 'message';
    destinatario = 'Todos';

    let novaMsg = {
        from: meuNome,
        to: destinatario,
        text: msgEscrita,
        type: tipo
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMsg);
    promise.then(buscarMsg);
    promise.catch(destAusente);
    document.querySelector('.aEnviar').value = '';
}

function destAusente(){
    alert('Destinatário ausente');
    window.location.reload();

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
            <span><span class="corCinza">(${mensagem[i].time})</span><span class="negrito">${mensagem[i].from}</span> ${mensagem[i].text}...</span>
        </li>`
        } else if (mensagem[i].type === 'message'){
            ulMsg.innerHTML += `
        <li class="mensagem msg">
            <span><span class="corCinza">(${mensagem[i].time})</span><span class="negrito">${mensagem[i].from}</span> para <span class="negrito">${mensagem[i].to}</span>: ${mensagem[i].text}</span>
        </li>`
        }  else if (mensagem[i].type === 'private_message'){
            if (destinatario === meuNome){
                ulMsg.innerHTML += `
            <li class="mensagem reservado">
                <span><span class="corCinza">(${mensagem[i].time})</span><span class="negrito">${mensagem[i].from}</span> reservadamente para <span class="negrito">${mensagem[i].to}</span>: ${mensagem[i].text}</span>
            </li>`
            }
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