module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'authors',
        key: 'authorId'
      }
    },
    publisherId: {
      type: DataTypes.INTEGER(11),
      alloNull: false,
      references: {
        model: 'publishers',
        key: 'publisherId'
      }
    },
    title: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    copyright: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    tableName: 'books',
  });
};
