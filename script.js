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

    for (let i = 0; i < mensagem.length; i++) {
        ulMsg.innerHTML += `
        <li class="msg">
                <span>${mensagem[i].time}${mensagem[i].from}${mensagem[i].to}</span>
            </li>`
    }
}

function enviarMsg(){}

function alertaErro(error){
    if (error.response.status === 404){
        alert('Este nome já está sendo utilizado');
        entrarNaSala();
    }
}

entrarNaSala();