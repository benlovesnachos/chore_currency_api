const ChoreCurrencyModel = require('../models/choreCurrency.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    ChoreCurrencyModel.createChoreCurrency(req.body)
        .then((result) => {
            res.status(201).send({choreCurrencyId: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ChoreCurrencyModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ChoreCurrencyModel.findById(req.params.choreCurrencyId)
        .then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send();
            }
        });
};

exports.getByUserId = (req, res) => {
    ChoreCurrencyModel.findByUserId(req.params.userId)
        .then((result) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send();
            }
        });
};

exports.addToChoreCurrency = (req, res) => {
    ChoreCurrencyModel.addToChoreCurrency(req.params.choreCurrencyId, req.body)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        });
};

exports.assignChoreCurrency = (req, res) => {
    ChoreCurrencyModel.assignChoreCurrency(req.params.choreCurrencyId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.patchById = (req, res) => {
    ChoreCurrencyModel.patchChoreCurrency(req.params.choreCurrencyId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    ChoreCurrencyModel.removeById(req.params.choreCurrencyId)
        .then((result)=>{
            res.status(204).send({});
        });
};