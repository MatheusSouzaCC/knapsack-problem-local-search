var instanciaAtual = {};
var otimosLocais = [];

$(document).ready(function () {
    // Check for the various File API support.
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob)
        alert('Algumas das API\'s de leitura de arquivos não estão disponíveis neste navegador, o algoritmo pode não funcionar perfeitamente.');
});

function iniciarBusca() {
    $("#iniciar").prop('disabled', true);
    if (lerStatusAtual() == 'Lendo Arquivo')
        alert('Espere o qrquivo terminar de ser lido');
    else {
        var otimoLocal = executarBuscaLocal(instanciaAtual);
        $("#otimoLocal").html('Peso: ' + otimoLocal.solucao.pesoTotal + ' | Valor: ' + otimoLocal.solucao.valorTotal);
        $("#tempoDecorrido").html(otimoLocal.tempoDecorrido.toFixed(3) + 'ms');
        otimosLocais.push(otimoLocal);
        inserirOtimoLocalTabelaHistorico(otimoLocal);
    }

    $("#iniciar").prop('disabled', false);
}

$("#iniciar").click(iniciarBusca);

function alterarStatus(status) {
    $("#status").html(status);
}

function lerStatusAtual() {
    return $("#status").html();
}

function lerArquivo(evt) {
    alterarStatus('Lendo Arquivo');
    var txt = evt.currentTarget.result;
    var linhas = txt.split('\n');
    var instancia = {
        capacidadeMochila: linhas[0].split(',')[1],
        itens: []
    };

    var pesos = linhas[1].split(',');
    var valores = linhas[2].split(',');

    for (let i = 0; i < pesos.length; i++) {
        instancia.itens.push({
            peso: parseInt(pesos[i]),
            valor: parseInt(valores[i])
        });
    }
    instanciaAtual = instancia;
    alterarStatus('Arquivo lido');
}

$("#arquivo").change(function (evt) {
    var arquivo = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = lerArquivo;
    reader.readAsText(arquivo);
});

function salvarResultados() {
    var textToSave = 'quantidade de itens, tempo decorrido\r\n';

    otimosLocais.forEach(function (element, index) {
        let txt = '';
        txt += element.qtdItens + ',';
        txt += (element.tempoDecorrido).toFixed(3);
        txt += '\r\n';
        textToSave += txt;
    });

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.download = 'dadosBuscasLocais.txt';
    hiddenElement.click();
}

$("#salvar").click(salvarResultados);


function inserirOtimoLocalTabelaHistorico(otimoLocal){
    var linha = '<tr>';
    linha += '<td>' + otimoLocal.solucao.itens.length + '</td>'
    linha += '<td>' + otimoLocal.solucao.valorTotal + '</td>';
    linha += '<td>' + otimoLocal.solucao.pesoTotal + '</td>';
    linha += '<td>' + otimoLocal.tempoDecorrido + '</td>';
    linha += '<td>' + otimoLocal.qtdItens + '</td>';
    linha += '</tr>'
    $("#lista-historico").append(linha);
}