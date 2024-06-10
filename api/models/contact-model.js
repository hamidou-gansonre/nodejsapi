const {Sequelize, DataTypes} = require('sequelize');
const mysql = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:'mysql',
    pool: {min: 0 , max: 5}

});

const Contact = mysql.define('Contacts', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(155),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(55),
            allowNull: true
        }
}, 
{
    indexes: [
        {fields: ['user_id']}
    ]
}) ;

Contact.sync();

module.exports = Contact ;