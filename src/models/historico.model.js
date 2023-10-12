module.exports = (sequelize, DataTypes) => {
    const Historico = sequelize.define("historico", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      dataCriacao: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: false
      }

    } , { 
      // define the table's name
      tableName: 'tb_historico'
    });
  
    return Historico;
  };