import 'reflect-metadata'
import * as express from 'express';
import userRoute from './routes/userRoute';
import clubsRoute from './routes/clubs.route';
import matchsRoute from './routes/matchs.route';
import  * as cors from 'cors';
import { error } from './msc/middlewares';

class App {
  public app: express.Express;
  // ...
  
  constructor() {
    // ...
    this.app = express();
    this.config();
    this.Router();
    // ...
  }
  
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    // ...
  }

  private Router(): void {
    this.app.use('/login', userRoute);
    this.app.use('/login/validate', userRoute);
    this.app.use('clubs/:id', clubsRoute);
    this.app.use('/clubs', clubsRoute);
    // this.app.use('/matchs/:id', matchsRoute);
    // this.app.use('/matchs/:id/finish', matchsRoute)
    this.app.use('/matchs', matchsRoute)
    this.app.use(error);
  }
  // ...
  public start(PORT: string | number):void {
    app.listen(PORT, () => {
      console.log(`escutando na porta ${PORT}!`)
    })
  }

}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
