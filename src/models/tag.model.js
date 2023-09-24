module.exports = (sequelize, DataTypes) => {
    const Tab = sequelize.define("tag", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cor: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
    } , { 
      // define the table's name
      tableName: 'tb_tag'
    });
  
    return Tab;
  };