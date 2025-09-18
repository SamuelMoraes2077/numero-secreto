let listaDeNumerosSorteador = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função para exibir texto na tela e falar o texto
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função para exibir mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo número secreto');
    exibirTextoNaTela('p', 'Digite um número entre 1 e 10:');
} 

// Exibir mensagem inicial ao carregar a página | Lembre-se de chamar a função por fora 
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagensTentativas);
        // Habilitar o botão de reiniciar para um novo jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('h1', 'O número é menor que o chute!');
        exibirTextoNaTela('p', 'Tente novamente!' );
        } else {
            exibirTextoNaTela('p', 'O número é maior que o chute!'); 
        }
        tentativas++;
        limpaCampo();
}
}

// Função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementos = listaDeNumerosSorteador.length;
    
    // Reinicia a lista se atingir o limite de número conforme varíavel numeroLimite
    if (quantidadeDeElementos == numeroLimite) {
        listaDeNumerosSorteador = [];
    }
    // Verifica se o número já foi sorteado | Uso de includes para verificar se o número já está na lista   
    if (listaDeNumerosSorteador.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número à lista e retorna o número escolhido | Uso de push para adicionar o número na lista
        listaDeNumerosSorteador.push(numeroEscolhido);
        console.log(listaDeNumerosSorteador);
        return numeroEscolhido;
    }
}
// Função para limpar o campo de input
function limpaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Desabilitar o botão de reiniciar até o próximo acerto | Uso de setAttribute para adicionar o atributo disabled e uso de getElementById para selecionar o botão
    document.getElementById('reiniciar').setAttribute('disabled', true);
}



