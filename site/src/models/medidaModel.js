var database = require("../database/config");

function buscarUltimasMedidas(idTotem, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 7 processadorUso, memoriaUso, memoriaDisponivel, FORMAT(data_dado, 'HH:mm:ss') as momento_grafico from dado where fkTotem = ${idTotem} order by idDado desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT top ${limite_linhas} d.processadorUsoProcesso
        FROM Totem as t
            INNER JOIN Dado as d    
                ON d.fkTotem = t.idTotem
            INNER JOIN estacao as e
                ON t.fkEstacao = e.idEstacao
            INNER JOIN Empresa as emp
                ON emp.fkEstacao = e.idEstacao
                    where emp.idEmpresa = 1
                        and t.idTotem = ${idTotem};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 processadorUso, memoriaUso, memoriaDisponivel, FORMAT(data_dado, 'HH:mm:ss') as momento_grafico from dado where fkTotem = ${idTotem} order by idDado desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 processadorUso from dado where temperatura > 3;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTotem(idEstacao) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT * FROM totem WHERE fkEstacao = ${idEstacao}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM totem WHERE fkEstacao = ${idEstacao}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarTotem
}
