module.exports = (sequelize, DataTypes) => {
    const Projeto = sequelize.define("projeto", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      codigo: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      nome: {
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
      tableName: 'tb_projeto'
    });
  
    return Projeto;
  };