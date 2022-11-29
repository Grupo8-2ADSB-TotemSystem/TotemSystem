var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/buscarPorId/:idUsuario", function (req, res) {
    usuarioController.buscarPorId(req, res);
});

router.get("/deletarFuncionario/:idUsuario", function (req, res) {
    usuarioController.deletarFuncionario(req, res);
})
//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/atualizarFuncionario/:idUsuario", function (req, res) {
    usuarioController.atualizarFuncionario(req, res);
})



router.post("/cadastrarDependente", function (req, res) {
    usuarioController.cadastrarDependente(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;