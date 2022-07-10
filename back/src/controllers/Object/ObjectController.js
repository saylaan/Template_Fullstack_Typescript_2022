const { Object } = require('../../models');

module.exports = {
    async index(req, res) {
        try {
            let objects = null;
            const search = req.query.search;
            if (search) {
                objects = await Object.findAll({
                    where: {
                        objectname: search
                    }
                });
            } else {
                objects = await Object.findAll({
                    limit: 100
                });
            }
            res.send(objects);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to fetch all the object'
            });
        }
    },
    async getObject(req, res) {
        try {
            const object = await Object.findByPk(req.params.objectId);
            if (!object) {
                return res.status(403).send({
                    error: 'The object does not exist'
                });
            }
            res.send(object);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the object'
            });
        }
    },
    async post(req, res) {
        try {
            const newObject = {
                name: req.body.name
            };
            const object = await Object.create(newObject);
            res.send(object);
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to create a new object'
            });
        }
    },
    async delete(req, res) {
        try {
            const object = await Object.findByPk(req.params.objectId);
            if (!object) {
                return res.status(403).send({
                    error: 'The object does not exist'
                });
            }
            await objectdel.delete(async (err, data) => {
                console.log(data);
            });
            res.send(object);
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured while trying to delete the object'
            });
        }
    },
    async put(req, res) {
        try {
            const object = await Object.update(req.body, {
                where: {
                    id: req.params.objectId
                }
            });
            res.send(object);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the object'
            });
        }
    }
};
