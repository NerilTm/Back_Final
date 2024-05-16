// Создаём роут для запросов пользователей 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const { findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists, filterPassword, hashPassword } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe } = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get(
  '/users',
  findAllUsers,
  filterPassword,
  sendAllUsers
);
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.get(
  '/users/:id',
  findUserById,
  filterPassword,
  sendUserById
);
usersRouter.delete(
  "/users/:id",
  checkAuth,
  deleteUser, 
  sendUserDeleted
);

usersRouter.get("/me", checkAuth, sendMe);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;