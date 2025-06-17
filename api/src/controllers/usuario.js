const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
            data: req.body
        });
        res.status(201).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const read = async (req, res) => {
    const usuario = await prisma.usuario.findMany();
    res.json(usuario);
}

const update = async (req, res) => {
    try {
        const usuario = await prisma.usuario.update({
            data: req.body,
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(202).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const remove = async (req, res) => {
    try {
        const usuario = await prisma.usuario.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(usuario).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}