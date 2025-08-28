require("dotenv").config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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


function loadRoutes(folderPath, baseRoute = '') {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {

      loadRoutes(fullPath, `${baseRoute}/${file}`);
    } else if (file.endsWith('.js')) {
      const route = require(fullPath);
      const routeName = `${baseRoute}/${file.replace('.js', '')}`;
      app.use(routeName, route);
      console.log(`Loaded route: ${routeName}`);
    }
  });
}

loadRoutes(path.join(__dirname, 'routes'));

app.get('/', (req, res) => {
  res.send('SERVER IS STABLE AND RUNNING');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
