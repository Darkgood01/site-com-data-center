const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Rota para adicionar item
router.post('/', async (req, res) => {
  const { name, category } = req.body;

  try {
    const newItem = new Item({ name, category });
    await newItem.save();
    res.status(201).json({ message: 'Item adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar item', error });
  }
});

// Rota para listar itens
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar itens', error });
  }
});

module.exports = router;
