//Conexão com o banco de dados mysql
const Sequelize = require('sequelize');

const connection = new Sequelize('Aniversariantesbd', 'root', 'cteixeira', {
    host: "localhost",
    dialect: 'mysql'
});


module.exports = connection;