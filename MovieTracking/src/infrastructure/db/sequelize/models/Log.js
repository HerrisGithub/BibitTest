const {Sequelize, DataTypes} = require('sequelize');
module.exports = class Log extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      ID: {
        // type: DataTypes.NUMBER,
        // autoIncrement: true,
        // primaryKey: true,
        // allowNull: false,
        // autoIncrement: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        field: 'id',
      },
      URL: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "0",
        field: 'url',
      },
      Params: {
        allowNull: false,
        type: Sequelize.STRING(255),
        defaultValue: "0",
        field: 'params',
      },
      TypeRequest: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type_request',
      },
      Response: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'response',
      },
      CreatedTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_time',
      }
    }, {
      underscored: true,
      freezeTableName: true,
      tableName: 'log',
      sequelize,
    });
  }

  // static associate(models) {
  //   models.Member.hasMany(models.MemberProduct, {
  //     foreignKey: 'fk_member_id',
  //     onDelete: 'cascade',
  //   });
  // }
};
