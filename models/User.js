// Models/user.js
function userModel(sequelize, DataTypes) {

    var User = sequelize.define('User', 
    {
        Id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FullName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        DeptId: {
            type:DataTypes.INTEGER
        },
        WhId:{
            type:DataTypes.INTEGER
        },
        AuthorityType:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Email:{
            type:DataTypes.STRING,
            validate:{
            isEmail: true
            }
        },
        EmailConfirmed:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        PasswordHash:{
            type:DataTypes.STRING,
            allowNull: false
        },
        SecurityStamp:{
            type:DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber:{
            type:DataTypes.STRING
        },
        PhoneNumberConfirmed:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        TwoFactorEnabled:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        LockoutEndDateUtc:{
            type:DataTypes.DATE
        },
        LockoutEnabled:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        AccessFailedCount:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        UserName:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName:'Users'
    }
    );
    return User;
}

module.exports = userModel;