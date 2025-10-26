import jwt from 'jsonwebtoken';
import 'dotenv/config';
console.log('🔐 JWT_SECRET atual:', process.env.JWT_SECRET);
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Autorização necessária' });
  }
  const token = authorization.replace('Bearer ', '');
  console.log("🧠 JWT recebido:", token);
  console.log("🔐 JWT_SECRET usado:", process.env.JWT_SECRET || 'dev-secret-key');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key');

    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido' });
  }
};

export default auth;
