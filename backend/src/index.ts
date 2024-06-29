import { Hono } from 'hono';
import mainRouter from './routes/index';

const app = new Hono();

app.route('/api/v1', mainRouter);

export default app
