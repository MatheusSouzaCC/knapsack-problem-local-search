function executarBuscaLocal(instancia) {
    var t0 = performance.now();
    alterarStatus('Executando o algoritmo');
    var solucao = pegarSolucaoAleatoria(instancia);

    alterarStatus('Algoritmo Executado');
    return {
        solucao: solucao,
        qtdItens: instancia.itens.length,
        tempoDecorrido: performance.now() - t0
    }
}


function pegarSolucaoAleatoria(instancia) {
    var rand = parseInt(Math.random() * 10);
    var s = {
        itens: [],
        pesoTotal: 0,
        valorTotal: 0
    };

    for (let i = 0; i < rand; i++) {
        let index = parseInt(Math.random() * 10);
        let item = instancia.itens[index];
        s.itens.push(item);
        s.pesoTotal += item.peso;
        s.valorTotal += item.valor;
    }

    if (s.pesoTotal == 0 || s.pesoTotal > instancia.capacidadeMochila)
        return pegarSolucaoAleatoria(instancia);

    return s;
}