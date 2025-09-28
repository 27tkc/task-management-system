import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/User';

const SECRET_KEY = 'your_secret_key';
const users: User[] = []; // in-memory users

const router = Router();

// Register
router.post('/register', async (req, res) => {
  const {
    name,
    email,
    password,
    role,
  }: { name: string; email: string; password: string; role: Role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date(),
  };
  users.push(newUser);
  res.json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).send('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: '1h',
  });
  res.json({ token });
});

export default router;
