let saldo = 0;

function depositar() {
    const valor = parseFloat(document.getElementById("valor").value);
    if (isNaN(valor) || valor <= 0) {
        mostrarMensagem("Valor inválido. Por favor, insira um número positivo.");
        return; 
    }
    saldo += valor;
    mostrarMensagem(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    limparCampo();
}

function sacar() {
    const valor = parseFloat(document.getElementById("valor").value);
    if (isNaN(valor) || valor <= 0) {
        mostrarMensagem("Valor inválido. Por favor, insira um número positivo.");
        return; 
    }
    if (valor > saldo) {
        mostrarMensagem("Saldo insuficiente para realizar o saque.");
        return; 
    }
    saldo -= valor;
    mostrarMensagem(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    limparCampo();
}
function mostrarSaldo() {
    mostrarMensagem(`Saldo atual: R$ ${saldo.toFixed(2)}`);
}
function limpar() {
    limparCampo();
    mostrarMensagem("");
}
function mostrarMensagem(msg) {
    document.getElementById('mensagem').textContent = msg;
}
function limparCampo() {
    document.getElementById("valor").value = "";
}
