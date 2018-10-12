module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authors', {
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'authors',
  });
};