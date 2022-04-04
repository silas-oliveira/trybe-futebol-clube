import { Service } from "typedi";
import { LeaderboardGeneralService } from "../services/leaderboardGeneral";

@Service()
export class LeaderboardGeneralController {
  constructor(
    readonly leaderboardGeneralService: LeaderboardGeneralService,
  ) {}

  async get() {
    const result = await this.leaderboardGeneralService.leaderboardGeneral();
    return result;
  }
}