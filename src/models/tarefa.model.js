module.exports = (sequelize, DataTypes) => {
    const Tarefa = sequelize.define("tarefa", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      prioridade: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false
      },
      dataEntrega: {
        allowNull: true,
        type: DataTypes.DATE,
        unique: false
      },
      dataCriacao: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: false
      }

    } , { 
      // define the table's name
      tableName: 'tb_tarefa'
    });
  
    return Tarefa;
  };