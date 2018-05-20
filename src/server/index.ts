import * as cors from 'cors';
import * as express from 'express';

const PORT = 3039;
const app = express();

app.use(cors());

app.get('/', (__: express.Request, res: express.Response) => {
  return res.json({ data: 'Hello Server' });
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.info(`App listening on ${PORT}`);
});
