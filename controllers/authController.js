import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { SECRET_KEY, JWT_EXPIRES_IN } from '../config/config.js';

const { sign } = jwt;

// POST /api/login
export const login = (req, res) => {
  const { email, password } = req.body;

  const user = User.findByCredentials(email, password);

  if (!user) {
    return res.status(401).json({ error: "Identifiants incorrects." });
  }

  const token = sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.json({ token });
};

// GET /api/me
export const getProfile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role
  });
};

// POST /api/admin
export const getAdminAccess = (req, res) => {
  res.json({
    status: "Succès",
    message: "Accès autorisé au back-office"
  });
};