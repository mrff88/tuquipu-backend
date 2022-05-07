import express from 'express';

const app = express();

// server routes
app.get('/', (req, res) => {
  res.send('API TUQUIPU');
});

export default app;
