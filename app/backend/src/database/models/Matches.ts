import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Matches extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
  public in_progress: number;
} 

Matches.init({
  // ... Campos
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  home_team: { type: DataTypes.INTEGER, key: 'home_team', },
  home_team_goals: { type: DataTypes.INTEGER },
  away_team: { type: DataTypes.INTEGER, key: 'away_team' },
  away_team_goals: { type: DataTypes.INTEGER },
  in_progress: { type: DataTypes.INTEGER },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
