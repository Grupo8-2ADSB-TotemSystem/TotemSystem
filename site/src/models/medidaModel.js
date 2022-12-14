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

function deletarTotem(idTotem) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarFuncionario(): ", idTotem)
    var instrucao = `
        DELETE FROM totem WHERE idTotem = ${idTotem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMedidasKpi(idEstacao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
        t.idTotem,
        (SELECT top 1 d.processadorUso FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as processadorUso,
        (SELECT top 1 d.memoriaDisponivel FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as memoriaDisponivel,
        (SELECT top 1 disc.volumeTotal FROM disco as disc WHERE fkTotem = t.idTotem ORDER BY idDisco DESC) as memoriaTotal,
        (SELECT top 1 d.memoriaUso FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as "memoriaRamUso",
        (SELECT top 1 mem.memoriaTotal FROM memoria as mem WHERE fkTotem = t.idTotem ORDER BY idMemoria DESC) as "memoriaRamDisponivel"
                FROM [dbo].[estacao] as e
                    INNER JOIN Empresa as emp ON emp.fkEstacao = e.idEstacao
                    INNER JOIN totem as t ON t.fkEstacao = e.idEstacao
                    INNER JOIN Dado as d ON d.fkTotem = t.idTotem
                            WHERE 1=1 and e.idEstacao = 1
                                GROUP BY
                                    e.nomeEstacao,
                                    t.idTotem;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT
        t.idTotem,
        (SELECT top 1 d.processadorUso FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as processadorUso,
        (SELECT top 1 d.memoriaDisponivel FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as memoriaDisponivel,
        (SELECT top 1 disc.volumeTotal FROM disco as disc WHERE fkTotem = t.idTotem ORDER BY idDisco DESC) as memoriaTotal,
        (SELECT top 1 d.memoriaUso FROM dado as d WHERE fkTotem = t.idTotem ORDER BY idDado DESC) as "memoriaRamUso",
        (SELECT top 1 mem.memoriaTotal FROM memoria as mem WHERE fkTotem = t.idTotem ORDER BY idMemoria DESC) as "memoriaRamDisponivel"
                FROM [dbo].[estacao] as e
                    INNER JOIN Empresa as emp ON emp.fkEstacao = e.idEstacao
                    INNER JOIN totem as t ON t.fkEstacao = e.idEstacao
                    INNER JOIN Dado as d ON d.fkTotem = t.idTotem
                            WHERE 1=1 and e.idEstacao = 1
                                GROUP BY
                                    e.nomeEstacao,
                                    t.idTotem;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return database.executar(instrucaoSql);
    }

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
    deletarTotem,
    buscarTotem,
    buscarMedidasKpi
}
