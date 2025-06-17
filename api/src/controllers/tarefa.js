const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { descricao, setor, prioridade, status, usuarioId } = req.body;

        if (!descricao || !setor || !prioridade || !usuarioId) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        const tarefa = await prisma.tarefa.create({
            data: {
                descricao,
                setor,
                prioridade,
                status: status || 'a fazer',
                usuarioId: Number(usuarioId)
            }
        });
        res.status(201).json(tarefa).end();
    } catch (e) {
        res.status(400).json({ erro: e.message }).end();
    }
}

const read = async (req, res) => {
    try {
        const tarefas = await prisma.tarefa.findMany();
        res.json(tarefas);
    } catch (e) {
        res.status(400).json({ erro: e.message }).end();
    }
}

const update = async (req, res) => {
    try {
        const { descricao, setor, prioridade, status, usuarioId } = req.body;
        const data = {};
        if (descricao !== undefined) data.descricao = descricao;
        if (setor !== undefined) data.setor = setor;
        if (prioridade !== undefined) data.prioridade = prioridade;
        if (status !== undefined) data.status = status;
        if (usuarioId !== undefined) data.usuarioId = Number(usuarioId);

        const tarefa = await prisma.tarefa.update({
            data,
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(202).json(tarefa).end();
    } catch (e) {
        res.status(400).json({ erro: e.message }).end();
    }
}

const remove = async (req, res) => {
    try {
        const tarefa = await prisma.tarefa.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(tarefa).end();
    } catch (e) {
        res.status(400).json({ erro: e.message }).end();
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}