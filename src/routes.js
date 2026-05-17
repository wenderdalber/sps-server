const { Router } = require("express");
const jwt = require("jsonwebtoken");

const routes = Router();
const JWT_SECRET = process.env.JWT_SECRET || "segredo_dev";

let nextId = 2;
const users = [
  { id: 1, name: "admin", email: "admin@spsgroup.com.br", type: "admin", password: "1234" }
];

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar e obter token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: "11111"
 *     responses:
 *       200:
 *         description: Token gerado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
routes.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: user.id, email: user.email, type: user.type },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.json({ token });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado
 */
routes.get("/users", authMiddleware, (req, res) => {
  const safeUsers = users.map(({ password, ...rest }) => rest);
  return res.json(safeUsers);
});

/**
 * @swagger
 * /users:
 *   get/:id
 *     summary: Exibe um usuário pelo id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exibe um usuário por id
 *       401:
 *         description: Não autorizado
 *       40:
 *         description: Usuário não existe
 */
routes.get("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  const { password, ...safeUser } = user;
  return res.json(safeUser);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, type, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [admin, user]
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       409:
 *         description: E-mail já cadastrado
 *       401:
 *         description: Não autorizado
 */
routes.post("/users", authMiddleware, (req, res) => {
  const { name, email, type, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: "E-mail já cadastrado" });

  const newUser = { id: nextId++, name, email, type, password };
  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  return res.status(201).json(safeUser);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Editar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               type:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: E-mail já em uso
 *       401:
 *         description: Não autorizado
 */
routes.put("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  const { name, email, type, password } = req.body;
  if (email) {
    const emailInUse = users.find(u => u.email === email && u.id !== id);
    if (emailInUse) return res.status(409).json({ error: "E-mail já está em uso" });
  }

  users[index] = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email,
    type: type || users[index].type,
    password: password || users[index].password,
  };

  const { password: _, ...safeUser } = users[index];
  return res.json(safeUser);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
routes.delete("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  users.splice(index, 1);
  return res.status(204).send();
});

module.exports = routes;