const { UserObject, User, Object } = require('../../models');
const _ = require('lodash');

module.exports = {
    async index(req, res) {
        try {
            const userobjects = await UserObject.findAll({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Object
                    }
                ]
            });
            res.send(userobjects);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the userobjects'
            });
        }
    },
    async getUserObjects(req, res) {
        try {
            const userobjects = await UserObject.findAll({
                where: {
                    UserId: req.params.userId
                },
                include: [
                    {
                        model: User
                    },
                    {
                        model: Object
                    }
                ]
            });
            res.send(userobjects);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the userobjects'
            });
        }
    },
    async getObjectUsers(req, res) {
        try {
            const objectusers = await UserObject.findAll({
                where: {
                    ObjectId: req.params.objectId
                },
                include: [
                    {
                        model: Object
                    },
                    {
                        model: User
                    }
                ]
            });
            res.send(objectusers);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to get the ObjectUsers'
            });
        }
    },
    async post(req, res) {
        try {
            const { UserId, ObjectId } = req.body;
            const userobject = await UserObject.create({
                UserId: UserId,
                ObjectId: ObjectId
            });
            res.send(userobject);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to create the userobject'
            });
        }
    },
    async delete(req, res) {
        try {
            const { userobjectId } = req.params;

            const userobject = await UserObject.findOne({
                where: {
                    id: userobjectId
                }
            });
            if (!userobject) {
                return res.status(403).send({
                    error: 'you do not have access to this userobject'
                });
            }
            await UserObject.destroy();
            res.send(userobject);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to delete the userobject'
            });
        }
    },
    async put(req, res) {
        try {
            const userobject = await UserObject.update(req.body, {
                where: {
                    id: req.params.userobjectId
                }
            });
            res.send(userobject);
        } catch (err) {
            res.status(500).send({
                err: 'An error has occured while trying to update the userobject'
            });
        }
    }
};
