const cores = ['verde', 'vermelho', 'azul', 'amarelo'];
let sequencia = [];
let jogador = [];
let nivel = 0;
let bloqueado = false;

const status = document.getElementById('status');
const nivelEl = document.getElementById('nivel');

function iniciarJogo() {
    sequencia = [];
    jogador = [];
    nivel = 0;
    proximaRodada();
}
function proximaRodada() {
    jogador = [];
    bloqueado = true;
    nivel++;
    nivelEl.textContent = 'Nível:' + nivel;
    status.textContent = 'Aguarde...';

    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    sequencia.push(novaCor);

    reproduzirSequencia(sequencia);
}
function reproduzirSequencia(seq) {
    let i = 0;
    const intervalo = setInterval(() => {
        acender(seq[i]);
        i++;
        if (i >= seq.length) {
            clearInterval(intervalo);
            bloqueado = false;
            status.textContent = 'Sua vez!';
        }
    }, 800);
}

function acender(cor) {
    const el = document.getElementById(cor);
    el.classList.add('ativa');
    setTimeout(() => el.classList.remove('ativa'), 400);
}

function clique(cor) {
    if (bloqueado) return;

    jogador.push(cor);
    acender(cor);

    const i = jogador.length - 1;
    if (jogador[i] !== sequencia[i]) {
        status.textContent = 'Você errou! Tente novamente.';
        bloqueado = true;
        return;
    }

    if (jogador.length === sequencia.length) {
        status.textContent = 'Boa! Próximo nível.';
        setTimeout(() => proximaRodada(), 1000);
    }
}

cores.forEach(cor => {
    document.getElementById(cor).addEventListener('click', () => clique(cor));
});
