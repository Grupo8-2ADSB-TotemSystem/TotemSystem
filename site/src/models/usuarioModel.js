var database = require("../database/config")

function listar(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select * from [dbo].[empresa]
    join [dbo].[usuario] on fkEmpresa = idEmpresa
        where idEmpresa = ${idEmpresa} and tipoUsuario = 2;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarFuncionario(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarFuncionario(): ", idUsuario)
    var instrucao = `
        DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT count(*) as contagem FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEndereco(numero, cep) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numero, cep);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `

    INSERT INTO endereco (numero, cep) VALUES ('${numero}', '${cep}');

    `;

    var consultaResultado = `

    SELECT MAX(idEndereco) as maxId FROM endereco;

    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao)

    return database.executar(consultaResultado);
}

function cadastrarEstacao(fkEndereco, nomeEstacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEndereco, nomeEstacao);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `

    INSERT INTO estacao (fkEndereco, nomeEstacao) VALUES ('${fkEndereco}', '${nomeEstacao}');

    `;

    var consultaResultado = `

    SELECT MAX(idEstacao) as maxId FROM estacao;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao);

    return database.executar(consultaResultado);
}

function cadastrarEmpresa(fkEstacao, nomeEmpresa, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEstacao, nomeEmpresa, cnpj);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `

    INSERT INTO empresa (fkEstacao, nomeEmpresa, cnpj) VALUES ('${fkEstacao}', '${nomeEmpresa}', '${cnpj}');

    `;

    var consultaResultado = `

    SELECT MAX(idEmpresa) as maxId FROM empresa;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    database.executar(instrucao);

    return database.executar(consultaResultado);
}

function cadastrarUsuario(fkEmpresa, nomeUsuario, email, senha, tipoUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, nomeUsuario, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    
    INSERT INTO usuario (fkEmpresa, nomeUsuario, email, senha, tipoUsuario) VALUES ('${fkEmpresa}', '${nomeUsuario}', '${email}', '${senha}', '${tipoUsuario}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    validarEmail,
    cadastrarEndereco,
    cadastrarEstacao,
    cadastrarEmpresa,
    cadastrarUsuario,
    listar,
    deletarFuncionario
};