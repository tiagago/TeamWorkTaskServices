module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("usuario", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      nomeExibicao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
    } , { 
      // define the table's name
      tableName: 'tb_usuario'
    });
  
    return Usuario;
  };