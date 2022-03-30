import Clubs from "../../database/models/Clubs";
import { Service } from "typedi";
import Matches from "../../database/models/Matches";

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
}
