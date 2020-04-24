import express from 'express';
import cors from 'cors';

export default ({ app }: { app: express.Application }) => {
  app.use(cors({ origin: 'https://circle.dimigo.in', credentials: true }));

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
};
