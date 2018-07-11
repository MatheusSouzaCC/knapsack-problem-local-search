function executarBuscaLocal(instancia) {
    var t0 = performance.now();
    alterarStatus('Executando o algoritmo');    
    var solucaoInicial = pegarSolucaoAleatoria(instancia);
    alterarStatus('Algoritmo Executado');
    return {
        solucao: buscar(solucaoInicial,instancia),
        qtdItens: instancia.itens.length,
        tempoDecorrido: performance.now() - t0
    }
}

function pegarSolucaoAleatoria(instancia) {
    var s = {
        itens: [],
        pesoTotal: 0,
        valorTotal: 0
    };
    let index = parseInt(Math.random() * 100);
    for (index; index < instancia.itens.length; index++) {

        let item = instancia.itens[index];
        if (s.pesoTotal + item.peso <= instancia.capacidadeMochila) {
            s.itens.push(item);
            s.pesoTotal += item.peso;
            s.valorTotal += item.valor;
        } else {
            return s;
        }

    }
    return s;
}

function buscar(solucao, instancia) {
    var novaSolucao = JSON.parse(JSON.stringify(solucao));
    var index = parseInt(Math.random() * (solucao.itens.length - 1));
    var itemTroca = solucao.itens[index];

    for (let i = 0; i < instancia.itens.length; i++) {
        var itemAtual = instancia.itens[i];
        
        if(itemAtual.valor > itemTroca.valor){
            if(!verificarExistencia(itemAtual, novaSolucao.itens)){
                if((novaSolucao.pesoTotal - itemTroca.peso) + itemAtual.peso  < instancia.capacidadeMochila){
                    novaSolucao.itens[index] = itemAtual;
                    novaSolucao.pesoTotal = novaSolucao.pesoTotal - itemTroca.peso + itemAtual.peso;
                    novaSolucao.valorTotal = novaSolucao.valorTotal - itemTroca.valor + itemAtual.valor;
                    
                    if(novaSolucao.valorTotal >= solucao.valorTotal)
                        return buscar(novaSolucao, instancia);
                    return solucao;
                }
            }
        }
    }

    if (novaSolucao.valorTotal > solucao.valorTotal)
        return buscar(novaSolucao, itens);

    return solucao;
}

function verificarExistencia(item, itens) {
    for (let i = 0; i < itens.length; i++) {
        if (itens[i].peso == item.peso && itens[i].valor == item.valor)
            return true;
    }
    return false;
}