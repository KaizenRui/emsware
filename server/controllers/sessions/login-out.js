const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  req.session.user = { id: user.id, username: user.username, role: user.role };
  res.json({ success: true, message: 'Login successful' });
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
};

module.exports = { login, logout };
