import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './Matches';

class Clubs extends Model {
  public id: number;
  public clubName: string;
}

Clubs.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clubName: DataTypes.STRING,

}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

Matches.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Matches.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });

Clubs.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatches' });
Clubs.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatches' });




export default Clubs;
