const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./API/logs');

// const bcrypt = require('bcrypt');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening at port ${port}`));
app.use(express.static('public'));


// app.post('/users', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.name, password: hashedPassword };
//     users.push(user);
//     res.status(201).send();
//   }
//   catch {
//     res.status(500).send();
//   }
// });

// app.post('/users/login', async (req, res) => {
//   const user = users.find(({ name }) => name.valueOf() === req.body.name.valueOf());
//   if (user == null) {
//     return res.status(400).send(`Cannot find user`);
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send(`Success`);
//     }
//     else {
//       res.status(500).send();
//     }
//   }
//   catch{
//     res.status(500).send();
//   }
//   console.log(user);
// });

// const users = [{ name: 'kkasd' }];

// app.get('/users', (req, res) => {
//   res.json(users);
// });
