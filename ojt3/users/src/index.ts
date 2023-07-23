import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { init } from "./db"
import User, { UserWithNoId } from "./model/userModel";
import { Request, Response, NextFunction} from 'express';

const envPath = resolve(__dirname, '../../.env')
dotenv.config()

const ROUTE_NAME_USERS = process.env.ROUTE_NAME_USERS


async function createRouter() {
  // create use router
  const DB = await init()
  const router = express.Router();
  router.post<{}, User, UserWithNoId>(`/${ROUTE_NAME_USERS}`, async (req, res) => {
      const { name, city, country, street, zip_code} = req.body;
      const user = await DB.user.createUser({
          name, city,country, street, zip_code,
      })
      res.json(user)
  })
  return router
}

createRouter().then(router => {
  // create express app
  const app = express();
  app.use(express.json())
  app.use(cors())
  app.use(router);

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('body = ', req.body);
    console.log('params = ', req.params);
    console.log('url = ', req.url);
    console.log('\n');
    next();
  });
  
  // const HOST = process.env.DB_HOST as string;
  const PORT = parseInt(process.env.MYPORT_USERS as string);
  app.listen(PORT,  () =>  console.log(`Example app listening on port :${PORT}`))
  // app.listen(PORT,  '127.0.0.1', () =>  console.log(`************************//////***********************Example app listening on port  '127.0.0.1':${PORT}`))
})



