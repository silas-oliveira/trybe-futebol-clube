import { Service } from "typedi";
import { LeaderboardAwayService } from '../services/leaderboardAway.service';


@Service()
export class LeaderboardAwayController {
  constructor(
    readonly leaderbordAwayService: LeaderboardAwayService,
  ) {}

  async get() {
    const result = await this.leaderbordAwayService.get();
    return result;
  }
}