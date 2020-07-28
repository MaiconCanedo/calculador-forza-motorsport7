let resultado = document.querySelector("#resultado");
let campoPeso = document.querySelector("#peso");
let campoDistribuicaoDianteria = document.querySelector("#distribuicao");
let botaoCalcular = document.querySelector("#calcular");

botaoCalcular.onclick = calcular;

function calcular() {
    let peso = campoPeso.value;

    let = distribuicaoPeso = {
        dianteira: campoDistribuicaoDianteria.value,
        traseira: 100 - campoDistribuicaoDianteria.value
    }

    let barraEstabilizadora = {
        dianteira: calcularBarraEstabilizadora(distribuicaoPeso.traseira),
        traseira: calcularBarraEstabilizadora(distribuicaoPeso.dianteira)
    }

    let molas = {
        dianteira: calcularMola(distribuicaoPeso.traseira),
        traseira: calcularMola(distribuicaoPeso.dianteira)
    }

    let rigidezRetorno = {
        dianteira: calcularRigidez(molas.dianteira),
        traseira:  calcularRigidez(molas.traseira)
    }

    let rigidezCompressao = {
        dianteira: calcularCompressao(rigidezRetorno.dianteira),
        traseira: calcularCompressao(rigidezRetorno.traseira)
    }

    let amortercimento = {
        rigidezRetorno,
        rigidezCompressao
    }

    let carro = {
        peso,
        distribuicaoPeso,
        barraEstabilizadora,
        molas,
        amortercimento
    }

    exibir(carro);
    
    function calcularMola(distibuicaoPeso) {
        return arredondar((peso - calcularPorcentagem(distibuicaoPeso, peso)) / 2);
    }

}

function exibir(carro) {
    resultado.textContent = "";
    let tabelaBarra = criarTabela("Barras Estabilizadoras");
    let tabelaMola = criarTabela("Molas");
    let tabelaRigidez = criarTabela("Rigidez Retorno");
    let tabelaCompressao = criarTabela("Compressão");

    addLinha(tabelaBarra, "Dianteira", carro.barraEstabilizadora.dianteira);
    addLinha(tabelaBarra, "Traseira", carro.barraEstabilizadora.traseira);

    addLinha(tabelaMola, "Dianteira", carro.molas.dianteira);
    addLinha(tabelaMola, "Traseira", carro.molas.traseira);

    addLinha(tabelaRigidez, "Dianteria", carro.amortercimento.rigidezRetorno.dianteira);
    addLinha(tabelaRigidez, "Traseira", carro.amortercimento.rigidezRetorno.traseira);

    addLinha(tabelaCompressao, "Dianteria", carro.amortercimento.rigidezCompressao.dianteira);
    addLinha(tabelaCompressao, "Traseira", carro.amortercimento.rigidezCompressao.traseira);

    resultado.appendChild(tabelaBarra);
    resultado.appendChild(tabelaMola);
    resultado.appendChild(tabelaRigidez);
    resultado.appendChild(tabelaCompressao);
}

function calcularBarraEstabilizadora(distibuicaoPeso) {
    const valorMaximo = 40;
    return arredondar(valorMaximo - calcularPorcentagem(distibuicaoPeso, valorMaximo));
}

function calcularRigidez(mola) {
    return arredondar(mola / 100);
}

function calcularCompressao(rigidezRetorno) {
    const percentual = 50;
    return arredondar(rigidezRetorno + calcularPorcentagem(rigidezRetorno, percentual));
}

function arredondar(valor) {
    return Math.round(((valor + Number.EPSILON) * 100), 2) / 100;
}

function calcularPorcentagem(percentual, valor) {
    return valor * (percentual / 100);
}

function criarTabela(titulo) {
    let tabela = document.createElement("table");
    let linhaTitulo = document.createElement("tr");
    let conteudoTitulo = document.createElement("th");
    let textoTitulo = document.createTextNode(titulo);

    conteudoTitulo.appendChild(textoTitulo);
    linhaTitulo.appendChild(conteudoTitulo);
    tabela.className = "respota";
    tabela.appendChild(linhaTitulo);
    return tabela;
}

function addLinha(tabela, chave, valor) {
    let nomeClasse = tabela.childNodes.length % 2 == 0
        ? "linha1"
        : "linha2";

    let linha = document.createElement("tr");
    linha.className = " linha " + nomeClasse ;
    let coluna1 = document.createElement("td");
    let coluna2 = document.createElement("td");
    let textoChave = document.createTextNode(chave);
    let textoValor = document.createTextNode(valor);

    coluna1.style.fontStyle = "bold";

    coluna2.style.textAlign = "right";
    // coluna2.style.borderRadius = "0px 5px 5px 0px"

    coluna1.appendChild(textoChave);
    coluna2.appendChild(textoValor);

    linha.appendChild(coluna1);
    linha.appendChild(coluna2);

    tabela.appendChild(linha);
}