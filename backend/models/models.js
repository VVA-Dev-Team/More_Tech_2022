const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    name: {type: DataTypes.STRING, allowNull: false},
    castleName: {type: DataTypes.STRING, allowNull: true},
    castleLevel: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    publicKey: {type: DataTypes.STRING, allowNull: false, unique: true},
    privateKey: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const Cell = sequelize.define('cell', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nftToken: {type: DataTypes.INTEGER, allowNull: false},
    buildingId: {type: DataTypes.INTEGER, allowNull: false}
})

const Building = sequelize.define('building', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.INTEGER, allowNull: false, unique: true},
    level: {type: DataTypes.INTEGER, allowNull: false},
    hashrate: {type: DataTypes.INTEGER, allowNull: false},
    imgURL: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const Shop = sequelize.define('shop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    reward: {type: DataTypes.INTEGER, allowNull: false},
    url: {type: DataTypes.STRING, allowNull: false},
})

const UserResult = sequelize.define('user_result', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time: {type: DataTypes.INTEGER, allowNull: false},
    correctAnswers: {type: DataTypes.INTEGER, allowNull: false},
})

const Battle = sequelize.define('battle', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    reward: {type: DataTypes.STRING, allowNull: false},
    attacking: {type: DataTypes.INTEGER, allowNull: false},
    defending: {type: DataTypes.INTEGER, allowNull: false},
    closed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    questionIds: {type: DataTypes.STRING, allowNull: false}
})

const TestQuestion = sequelize.define('test_question', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    answers: {type: DataTypes.STRING, allowNull: false},
    correctAnswer: {type: DataTypes.INTEGER, allowNull: false}
})

const UserBattle = sequelize.define('type_battle', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const UserTask = sequelize.define('user_task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasMany(Cell)
Cell.belongsTo(User)

Battle.hasMany(UserResult)
UserResult.belongsTo(Battle)

User.hasMany(UserResult)
UserResult.belongsTo(User)

User.belongsToMany(Battle, {through: UserBattle})
Battle.belongsToMany(User, {through: UserBattle})

User.belongsToMany(Task, {through: UserTask})
Task.belongsToMany(User, {through: UserTask})


module.exports = {
    User,
    Cell,
    Building,
    Shop,
    Task,
    UserResult,
    Battle,
    TestQuestion,
    UserBattle,
    UserTask,
}