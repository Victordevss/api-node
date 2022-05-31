const Sequelize = require('sequelize')
const connection = new Sequelize('banco', 'root','victor123',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection