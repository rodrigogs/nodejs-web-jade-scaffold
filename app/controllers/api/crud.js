'use strict';

let _model = null;

module.exports = class Crud {

    static model (model) {
        _model = model;
    };

    static list (req, res) {
        _model
            .find({})
            .exec((err, data) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err });
                }
                return res.status(200).json({ success: true, data: data });
            });
    };

    static create (req, res) {
        let data = new _model(req.body);
        data.save(err => {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }
            return res.status(200).json({ success: true, data: data });
        });
    };

    static findById (req, res) {
        _model.find({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }

            if (!data) {
                return res.status(404).json({ success: false, message: 'Not found' });
            }

            return res.status(200).json({ success: true, data: data });
        });
    };

    static update (req, res) {
        let query = { _id: req.params.id };
        _model.find(query, (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }

            if (!data) {
                return res.status(404).json({ success: false, message: 'Not found' });
            }

            _model.update(query, { $set: req.body }, err => {
                if (err) {
                    return res.status(500).json({ success: false, message: err });
                }

                return res.status(200).json({ success: true });
            });
        });
    };

    static delete (req, res) {
        let query = { _id: req.params.id };
        _model.find(query, (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: err });
            }

            if (!data) {
                return res.status(404).json({ success: false, message: 'Not found' });
            }

            _model.remove(query, err => {
                if (err) {
                    return res.status(500).json({ success: false, message: err });
                }
                return res.status(200).json({ success: true });
            });
        });
    };

};