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
  public in_progress: boolean;
} 

Matches.init({
  // ... Campos
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  home_team: DataTypes.NUMBER,
  home_team_goals: DataTypes.NUMBER,
  away_team: DataTypes.NUMBER,
  away_team_goals: DataTypes.NUMBER,
  in_progress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
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
