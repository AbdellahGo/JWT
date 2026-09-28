import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

const { verify } = jwt;

// Verify JWT Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Accès refusé. Jeton manquant ou format invalide." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Jeton invalide ou expiré." });
  }
};

// Role-Based Access Control
export const requireRole = (expectedRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== expectedRole) {
      return res.status(403).json({ error: "Accès interdit. Droits insuffisants." });
    }
    next();
  };
};