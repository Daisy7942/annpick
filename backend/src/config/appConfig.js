require("dotenv").config(); // 환경 변수 로드
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sequelize = require("./dbConfig");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const authRoutes = require("../routes/authRoutes");
const animeRoutes = require("../routes/animeRoutes");
const recommendRoutes = require("../routes/recommendRoutes");
const userRoutes = require("../routes/userRoutes");
const pickRoutes = require("../routes/pickRoutes");
const { meiliClient, animeIndex } = require("../config/meiliConfig");
const models = require("../models");

module.exports = {
  express,
  cors,
  bodyParser,
  cookieParser,
  passport,
  sequelize,
  swaggerUi,
  swaggerSpec,
  authRoutes,
  animeRoutes,
  recommendRoutes,
  userRoutes,
  pickRoutes,
  meiliClient,
  animeIndex,
  models,
};
