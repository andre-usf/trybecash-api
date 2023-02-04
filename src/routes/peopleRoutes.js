const express = require('express');
const peopleDB = require('../db/peopleDB');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [result] = await peopleDB.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await peopleDB.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage });
  }
});

router.post('/', async (req, res) => {
  const person = req.body;
  try {
    const [result] = await peopleDB.insert(person);
    console.log(result);
    res.status(201).json({ message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' })
  }
  
});

module.exports = router;
