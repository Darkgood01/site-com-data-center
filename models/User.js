const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir o schema do usuário
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Definir um método para comparar a senha
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Criar o modelo com base no schema
const User = mongoose.model('User', userSchema);

module.exports = User;
