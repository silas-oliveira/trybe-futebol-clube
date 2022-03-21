'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('matchs', { 
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true , 
        autoIncrement: true,
        allowNull: false,
      },
      home_team: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'home_team',
          references: {
            model: 'clubs',
            key: 'id',
          },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clubs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};