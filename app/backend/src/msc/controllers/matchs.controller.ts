import decodeToken from "../../security/jwt/decode.token";
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
    
    async create(body: any, headers: any) {
      const { authorization } = headers;
      decodeToken(authorization);
      const result = await this.matchsService.create(body);
      return result;
    }

    async finishMatch(id: any) {
      const result = await this.matchsService.finishMatch(id);
      return result;
    }

    async updateById(id: any, body: any) {
      const result = await this.matchsService.updateById(id, body);
      return result;
    }
  
}