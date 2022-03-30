import { Service } from "typedi";
import { ClubsService } from "../services/clubs.service";

@Service()
export class ClubsController {
  constructor (
    readonly clubsService: ClubsService,
  ) {}

  async get() {
    const result = await this.clubsService.get();
    return result;
  }

  async getById(_authorization: any, {id}: any) {
    const result = await this.clubsService.getById(_authorization, id);
    return result;
  }
}