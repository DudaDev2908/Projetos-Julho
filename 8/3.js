const emoji = document.getElementById('emoji');
const emoji2 = document.getElementById('emoji2');
const resultado = document.getElementById('resultado');

let pos1 = 0;
let pos2 = 0;
let corridaAtiva = false;

function comecarCorrida() {
    if (corridaAtiva) return;

    corridaAtiva = true;
    pos1 = 0;
    pos2 = 0;
    emoji.style.left = '0px';
    emoji2.style.left = '0px';
    resultado.textContent = '';

    const intervalo = setInterval(() => {
        pos1 += Math.random() * 10;
        pos2 += Math.random() * 10;

        emoji.style.left = `${pos1}px`;
        emoji2.style.left = `${pos2}px`;

        if (pos1 >= 700 || pos2 >= 700) {
            clearInterval(intervalo);
            corridaAtiva = false;

            if (pos1 > pos2) {
                resultado.textContent = '🌙Venceu a corrida!';
            } else if (pos2 > pos1) {
                resultado.textContent = '☀️Venceu a corrida'
            } else {
                resultado.textContent = 'Empate!';
            }
        }
    }, 100);
}