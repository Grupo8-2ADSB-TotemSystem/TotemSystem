var database = require("../database/config");

function buscarUltimasMedidas(idTotem, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 7 temperatura from dado where temperatura > 3;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT top 7 d.processadorUsoProcesso
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
        instrucaoSql = `SELECT top 1 d.processadorUso
        FROM Totem as t
            INNER JOIN Dado as d
                ON d.fkTotem = t.idTotem
            INNER JOIN estacao as e
                ON t.fkEstacao = e.idEstacao
            INNER JOIN Empresa as emp
                ON emp.fkEstacao = e.idEstacao
                    where emp.idEmpresa = 1
                        and t.idTotem = 1;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top 1 temperatura from dado where temperatura > 3;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
