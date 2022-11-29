var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTotem", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/totem/:idEstacao", function (req, res) {
    medidaController.buscarTotem(req, res);
});

router.get("/deletarTotem/:idTotem", function (req, res) {
    medidaController.deletarOTotem(req, res);
})

router.get("/tempo-real/:idTotem", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscar-kpi/:idEstacao", function (req, res) {
    medidaController.buscarMedidasKpi(req, res);
})




module.exports = router;