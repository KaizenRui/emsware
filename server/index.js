const express = require('express');
const session = require('express-session');
const cors = require('cors');
const addPart = require('./routes/addPart');
const searchPart = require('./routes/searchPart');
const partdupliCheck = require('./routes/partdupliCheck');
const loginlogut = require('./routes/sessions/login-out');
const uploadBom = require('./routes/uploadBom');

const app = express();
const PORT = 4000;

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

app.use('/partadd', addPart);
app.use('/partsearch', searchPart);
app.use('/partduplicheck', partdupliCheck);
app.use('/bomupload', uploadBom);
app.use('/sessions', loginlogut);

app.get('/', (req, res) => {
  res.send('SERVER IS STABLE AND RUNNING');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
