import * as cors from 'cors';
import * as express from 'express';

const PORT = 3030;
const app = express();

app.use(cors());

app.get('/', (__: express.Request, res: express.Response) => {
  return res.send('Hello Server');
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.info(`App listening on ${PORT}`);
});
