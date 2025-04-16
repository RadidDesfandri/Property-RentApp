import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import schedule from 'node-schedule';
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routers/user.router';
import { TenantRouter } from './routers/tenant.router';
import { ReservationRouter } from './routers/reservation.user.router';
import { DecodeTokenRouter } from './routers/decode.route';
import { PropertyRouter } from './routers/property.route';
import path from 'path';
import { RoomRouter } from './routers/rooms.router';
import { ReservationInfoRouter } from './routers/reservation.info.router';
import { TenantTransactionRouter } from './routers/tenant.transaction.router';
import { ReviewRouter } from './routers/review.router';
import { SosmedLoginRouter } from './routers/sosmedlogin.router';
import { scheduleReminders } from './helper/reminder';
import { ReportSalesRouter } from './routers/reportsales.router';
import corsOptions from './config/corsOption';

export default class App {
  private app: Express;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
    this.scheduler();
  }
  private configure(): void {
    this.app.use(cors(corsOptions));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(
      '/api/public',
      express.static(path.join(__dirname, '../public')),
    );
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }
  private scheduler(): void {
    schedule.scheduleJob('00 00 10 * * *', scheduleReminders);
  }
  private routes(): void {
    const userRouter = new UserRouter();
    const tenantRouter = new TenantRouter();
    const reservationRouter = new ReservationRouter();
    const decodeTokenRouter = new DecodeTokenRouter();
    const propertyRouter = new PropertyRouter();
    const roomRouter = new RoomRouter();
    const reservationInfo = new ReservationInfoRouter();
    const transactionTenant = new TenantTransactionRouter();
    const review = new ReviewRouter();
    const sosmedlogin = new SosmedLoginRouter();
    const reportSales = new ReportSalesRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/tenant', tenantRouter.getRouter());
    this.app.use('/api/reservation', reservationRouter.getRouter());
    this.app.use('/api/decode', decodeTokenRouter.getRouter());
    this.app.use('/api/property', propertyRouter.getRouter());
    this.app.use('/api/rooms', roomRouter.getRouter());
    this.app.use('/api/reservationInfo', reservationInfo.getRouter());
    this.app.use('/api/transaction', transactionTenant.getRouter());
    this.app.use('/api/review', review.getRouter());
    this.app.use('/api/auth', sosmedlogin.getRouter());
    this.app.use('/api/report', reportSales.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
