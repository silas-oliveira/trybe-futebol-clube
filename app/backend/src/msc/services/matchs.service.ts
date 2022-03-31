import Clubs from "../../database/models/Clubs";
import { Service } from "typedi";
import Matches from "../../database/models/Matches";
import { throwEqualIdsError, throwIdHomeTeamOrAwayTeamNotFound } from "./_services";

@Service()
export class MatchsService {
  constructor() {}

  private progress(matchStatus: any) {
    if (matchStatus === "true") return 1;
    return 0;
  }

  async get(inProgress: any) {
    if (inProgress) {
      const searchInfo = await Matches.findAll({
        include: [
          { model: Clubs, as: "homeClub", attributes: { exclude: ["id"] } },
          { model: Clubs, as: "awayClub", attributes: { exclude: ["id"] } },
        ],
        where: { inProgress: this.progress(inProgress) },
      });
      return searchInfo;
    } else {
      const searchInfo = await Matches.findAll({
        include: [
          { model: Clubs, as: "homeClub", attributes: { exclude: ["id"] } },
          { model: Clubs, as: "awayClub", attributes: { exclude: ["id"] } },
        ],
      });
      return searchInfo;
    }
  }

  async create(body: any) {
    const idTeamHome = body.homeTeam;
    const idAwayTeam = body.awayTeam;

    if (idTeamHome === idAwayTeam) {
      throwEqualIdsError();
    }

    const teams = await Clubs.findAll({ raw: true });

    const resultHome = teams.find((team) => team.id === idTeamHome);
    const resultAway = teams.find((team) => team.id === idAwayTeam);

    if (resultHome && resultAway) {
      return Matches.create(body);
    }
    throwIdHomeTeamOrAwayTeamNotFound();
  }

  async update(id: any) {
    const result = await Matches.update(
      { inProgress: false },
      { where: { id } }
    );
    console.log("result", result);
    return result;
  }

  async edit(id: any, body: any) {
    if (Object.values(body).length <= 0) {
      console.log("passei aq");
      const result = await Matches.update(
        { inProgress: false },
        { where: { id } }
      );
      return result;
    }
    const result = await Matches.update(
      { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
      { where: { id } }
    );
    return result;
  }
}
