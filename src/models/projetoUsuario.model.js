module.exports = (sequelize, DataTypes) => {
    const ProjetoUsuario = sequelize.define("projetoUsuario", {
      projeto_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false
      },
      usuario_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false
      },
    } , { 
      // define the table's name
      tableName: 'tb_projeto_usuario'
    });
  
    return ProjetoUsuario;
  };