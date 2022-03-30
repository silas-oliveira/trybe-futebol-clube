import Clubs from "../../database/models/Clubs";
import { Service } from "typedi";
import { throwNotFoundError } from "./_services";

@Service()
export class ClubsService {
  constructor() {}

  async get() {
    const searchInfo = await Clubs.findAll({ raw: true });
    return searchInfo;
  }
  
  async getById(_authorization: any, id: number) {
    const searchInfo = await Clubs.findOne({ where: { id }, raw: true });
    if (searchInfo === null) {
      return throwNotFoundError();
    }
    
    return searchInfo;
  }
}
