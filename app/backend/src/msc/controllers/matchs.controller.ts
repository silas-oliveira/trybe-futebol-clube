import { Service } from "typedi";
import { MatchsService } from "../services/matchs.service";

@Service()
export class MatchsController {
  constructor(
    readonly matchsService: MatchsService,
  ) {}
  
    async get(query: any) {
      const { inProgress } = query;
      const searchInfo = await this.matchsService.get(inProgress);
      return searchInfo;
    }
    
    async create(body: any) {
      const match = await this.matchsService.create(body);
      return match;
    }
  
}