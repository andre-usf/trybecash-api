const express = require('express');
const peopleDB = require('../db/peopleDB');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [result] = await peopleDB.findAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await peopleDB.findById(id);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.sqlMessage });
  }
});

router.post('/', async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
    return res.status(201).json({ message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const person = req.body;
    const [result] = await peopleDB.update(person, id);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso` });
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.sqlMessage });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await peopleDB.remove(id);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: `Pessoa de id ${id} excluída com sucesso` });
    } else {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;
