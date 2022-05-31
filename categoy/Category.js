const Sequelize = require('sequelize')
const connection = require('../database/database')
const Article = require('../articles/Article')

const Category = connection.define('categoryes',{

    marca:{
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
})



module.exports = Category
