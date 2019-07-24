import Koa from 'koa';
import cors from 'koa2-cors';
import Router from 'koa-router';
import {handleRouter} from './router';

const app = new Koa();
export const router = new Router();
app.use(cors());
app.use(router.routes());


handleRouter(router);

app.listen(3000);