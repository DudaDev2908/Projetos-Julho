function alternarLuz(id, interruptor) {
    const luz = document.getElementById(id);
    luz.classList.toggle('acessa');
    interruptor.classList.toggle('ativo');
}