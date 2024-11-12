const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Para permitir requisições de diferentes domínios (se necessário)
const authRoutes = require('./routes/auth'); // Certifique-se de que o arquivo auth.js existe
const itemRoutes = require('./routes/item'); // Certifique-se de que o arquivo item.js existe

const app = express();
const port = 5000;

// Conectar ao MongoDB (use o URI de conexão real aqui)
mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB');
})
.catch((err) => {
  console.log('Erro ao conectar ao MongoDB:', err);
});

// Middleware para analisar JSON e permitir CORS
app.use(express.json());
app.use(cors());

// Definir rotas
app.use('/api/register', authRoutes); // Rota de registro
app.use('/api/login', authRoutes); // Rota de login
app.use('/api/items', itemRoutes); // Rota de itens

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando na porta 5000');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
