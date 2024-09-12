import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import planetsRouter from './planets';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(morgan('dev'));


app.use('/api/planets', planetsRouter);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});