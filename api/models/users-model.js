const {Sequelize, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const mysql = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:'mysql',
    pool: {min: 0 , max: 5}

});

const User = mysql.define('Users', {
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
        unique: true,
        validate: {
            isEmail: {msg : "Must be a valid email address"}
        }
    } ,
    password: {
        type: DataTypes.STRING,
        validate: {
            len: {
                message: "Password must be between 8 and 255 characters",
                args: [8, 255]
            }
        }
    }
}, {
    indexes: [
        {fields: ['email']}
    ]
});

User.sync();

User.beforeCreate(async (user, optiions) => {
   const hashed = await bcrypt.hash(user.password, 10);
   user.password = hashed;
});

User.beforeSave(async (user, optiions) => {
    if(user.updatePassword){
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
    }
})
module.exports = User;