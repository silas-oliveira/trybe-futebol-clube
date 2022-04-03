import { Service } from "typedi";
import { LeaderboardService } from "../services/leaderboard.service";

@Service()
export class LeaderboardController {
  constructor(
    readonly leaderboardService: LeaderboardService,
  ) {}

  async get() {
    const result = await this.leaderboardService.get();
    return result;
  }
}