const { response } = require("express");
var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

async function cadastrar(req, res) {

    var email = req.body.emailServer;


        var resultado = await usuarioModel.validarEmail(email)
        if (resultado[0].contagem > 0) {
            res.status(409).json({ message: "Email ja existe" });
        } else {
            var nomeEmpresa = req.body.nomeEmpresaServer.toUpperCase();
            var nomeEstacao = req.body.nomeEstacaoServer.toUpperCase();
            var cnpj = req.body.cnpjServer;
            var nomeUsuario = req.body.nomeUsuarioServer.toUpperCase();
            var cep = req.body.cepServer;
            var numero = req.body.numeroServer;
            var senha = req.body.senhaServer;
            var tipoUsuario = req.body.tipoUsuarioServer;
            var fkEndereco;
            var fkEstacao;
            var fkEmpresa;
        
            function finalizarCadastro(resultado) {
                res.json(resultado);
            }
        
            if (nomeUsuario == undefined) {
                res.status(400).send("Seu nome está undefined!");
            } else if (email == undefined) {
                res.status(400).send("Seu email está undefined!");
            } else if (senha == undefined) {
                res.status(400).send("Sua senha está undefined!");
            } else if (numero == undefined) {
                res.status(400).send("Seu número está undefined!");
            } else if (cep == undefined) {
                res.status(400).send("Seu CEP está undefined!");
            } else if (nomeUsuario == undefined) {
                res.status(400).send("Seu nome do usuário está undefined!");
            } else if (nomeEstacao == undefined) {
                res.status(400).send("Seu nome da empresa está undefined!");
            } else if (cnpj == undefined) {
                res.status(400).send("Seu CNPJ está undefined!");
            } else if (nomeEmpresa == undefined) {
                res.status(400).send("Seu CNPJ está undefined!");
            } else {
        
                try {
                    var cadastrarEndereco = await usuarioModel.cadastrarEndereco(numero, cep)
                    var resultado = cadastrarEndereco[0].maxId;
                    fkEndereco = resultado;
                } catch (error) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        
                try {
                    var cadastroEstacao = await usuarioModel.cadastrarEstacao(fkEndereco, nomeEstacao);
                    var resultado = cadastroEstacao[0].maxId;
                    fkEstacao = resultado;
                } catch (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        
                try {
                    var cadastroEmpresa = await usuarioModel.cadastrarEmpresa(fkEstacao, nomeEmpresa, cnpj);
                    var resultado = cadastroEmpresa[0].maxId;
                    fkEmpresa = resultado;
                } catch (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        
                try {
                    usuarioModel.cadastrarUsuario(fkEmpresa, nomeUsuario, email, senha, tipoUsuario);
                } catch (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        
                finalizarCadastro();
            }
        }
}

async function cadastrarDependente(req, res) {
    var nomeUsuario = req.body.nomeUsuarioServer.toUpperCase();
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUsuarioServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    function finalizarCadastro(resultado) {
        res.json(resultado);
    }

    if (nomeUsuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        try {
            usuarioModel.cadastrarUsuario(fkEmpresa, nomeUsuario, email, senha, tipoUsuario);
        } catch (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }

        finalizarCadastro();
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarDependente,
    listar,
    testar
}