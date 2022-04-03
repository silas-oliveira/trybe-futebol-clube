import Matches from "../../database/models/Matches";
import { Service } from "typedi";
import Clubs from "../../database/models/Clubs";
import { MatchsService } from "./matchs.service";

@Service()
export class LeaderboardService {
  constructor(readonly matchsService: MatchsService) {}

  async allMatchs() {
    const matchs = await Matches.findAll({
      include: [
        { model: Clubs, as: "homeClub", attributes: { exclude: ["id"] } },
        { model: Clubs, as: "awayClub", attributes: { exclude: ["id"] } },
      ],
      where: { inProgress: 0 },
      nest: true,
      raw: true,
    });
    return matchs;
  }

  async allClubs() {
    const result = await Clubs.findAll({ raw: true });
    return result;
  }

  async leaderBoard() {
    const clubs = await this.allClubs();
    const matchs = await this.allMatchs();
    const createLeaderBoard = clubs.map((club) => {
      let totalPoints = 0;
      let totalGames = 0;
      let totalVictories = 0;
      let totalDraws = 0;
      let totalLosses = 0;
      let goalsFavor = 0;
      let goalsOwn = 0;
      matchs.forEach((match) => {
        if (club.id === match.homeTeam) {
          if (match.homeTeamGoals > match.awayTeamGoals) {
            totalPoints += 3;
            totalGames += 1;
            totalVictories += 1;
            goalsFavor += match.homeTeamGoals;
            goalsOwn += match.awayTeamGoals;
          } else if (match.homeTeamGoals < match.awayTeamGoals) {
            totalGames += 1;
            totalLosses += 1;
            goalsFavor += match.homeTeamGoals;
            goalsOwn += match.awayTeamGoals;
          } else {
            totalDraws += 1;
            totalPoints += 1;
            totalGames += 1;
            goalsFavor += match.homeTeamGoals;
            goalsOwn += match.awayTeamGoals;
          }
        }
      });
      const balance = goalsFavor - goalsOwn;
      const efficiency = +(totalPoints / (totalGames * 3) * 100).toFixed(2);
      const result = { name: club.clubName, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, balance, efficiency };
      return result;
    });
    
    const orderingOfPoints = createLeaderBoard.sort((a: any, b: any): any => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });

    return orderingOfPoints;
  }

  async get() {
    return this.leaderBoard();
  }
}

