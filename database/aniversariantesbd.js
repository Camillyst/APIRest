const Sequelize = require('sequelize');
const connection = require('./database');

const Aniversariantesbd = connection.define("aniversariantes", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mes: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Aniversariantesbd.sync({force:true});

module.exports = Aniversariantesbd;