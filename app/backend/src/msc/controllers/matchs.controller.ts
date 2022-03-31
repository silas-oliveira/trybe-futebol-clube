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

    async update(id: any) {
      const result = await this.matchsService.update(id);
      return result;
    }

    async editInProgress(id: any, body: any) {
      const result = await this.matchsService.editInProgress(id, body);
      return result;
    }

    async editByFinished(id: any) {
      const result = await this.matchsService.editByFinished(id);
      return result;
    }
  
}