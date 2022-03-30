import { DataTypes, Model } from 'sequelize';
import db from '.';

class Matches extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: number;
} 

Matches.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: { type: DataTypes.INTEGER, key: 'home_team', },
  homeTeamGoals: { type: DataTypes.INTEGER },
  awayTeam: { type: DataTypes.INTEGER, key: 'away_team' },
  awayTeamGoals: { type: DataTypes.INTEGER },
  inProgress: { type: DataTypes.INTEGER },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

export default Matches;
