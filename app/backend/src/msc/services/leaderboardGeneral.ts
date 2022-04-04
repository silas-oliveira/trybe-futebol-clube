import Clubs from "../../database/models/Clubs";
import { Service } from "typedi";
import { throwNotFoundError } from "./_services";
import { LeaderboardService } from "./leaderboard.service";

@Service()
export class LeaderboardGeneralService {
  constructor(readonly leaderboardService: LeaderboardService) {}

  async allMatchs() {
    return await this.leaderboardService.allMatchs();
  }

  async allClubs() {
    return await this.leaderboardService.allClubs();
  }

  async leaderboardGeneral() {
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
        console.log("matchs", matchs);
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
        if (club.id === match.awayTeam) {
          if (match.awayTeamGoals > match.homeTeamGoals) {
            totalPoints += 3;
            totalGames += 1;
            totalVictories += 1;
            goalsFavor += match.awayTeamGoals;
            goalsOwn += match.homeTeamGoals;
          } else if (match.awayTeamGoals < match.homeTeamGoals) {
            totalGames += 1;
            totalLosses += 1;
            goalsFavor += match.awayTeamGoals;
            goalsOwn += match.homeTeamGoals;
          } else {
            totalDraws += 1;
            totalPoints += 1;
            totalGames += 1;
            goalsFavor += match.awayTeamGoals;
            goalsOwn += match.homeTeamGoals;
          }
        }
      });

      const goalsBalance = goalsFavor - goalsOwn;
      const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
      const result = {
        name: club.clubName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency,
      };
      return result;
    });

    const orderingOfPoints = createLeaderBoard.sort((a: any, b: any): any => {
      // if (a.totalPoints < b.totalPoints) return 1;
      // if (a.totalPoints > b.totalPoints) return -1;
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;

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
}
