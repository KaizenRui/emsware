const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

// ✅ Middleware
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

// ✅ Recursive route loader
function loadRoutes(folderPath, baseRoute = '') {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively load subfolders
      loadRoutes(fullPath, `${baseRoute}/${file}`);
    } else if (file.endsWith('.js')) {
      const route = require(fullPath);
      const routeName = `${baseRoute}/${file.replace('.js', '')}`;
      app.use(routeName, route);
      console.log(`Loaded route: ${routeName}`);
    }
  });
}

// ✅ Load all routes from the routes folder
loadRoutes(path.join(__dirname, 'routes'));

// ✅ Default route
app.get('/', (req, res) => {
  res.send('SERVER IS STABLE AND RUNNING');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
