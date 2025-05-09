"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_express5 = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));

// src/middlewares/errorHandler.ts
function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor";
  res.status(statusCode).json({ error: message });
}

// src/routes/routes.ts
var import_express4 = require("express");

// src/routes/AuthRoutes.ts
var import_express = require("express");

// src/services/AuthService.ts
var import_client2 = require("@prisma/client");

// src/infra/BcryptService.ts
var import_bcrypt = __toESM(require("bcrypt"));
var BcryptService = class {
  generateHashedPassword(password) {
    return __async(this, null, function* () {
      const salt = yield import_bcrypt.default.genSalt(12);
      const passwordHash = yield import_bcrypt.default.hash(password, salt);
      return { passwordHash };
    });
  }
  passwordMatcher(password, encryptedPassword) {
    return __async(this, null, function* () {
      return yield import_bcrypt.default.compare(password, encryptedPassword);
    });
  }
};

// src/services/UserService.ts
var import_client = require("@prisma/client");

// src/exceptions/AppException.ts
var AppError = class _AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, _AppError.prototype);
  }
};

// src/services/UserService.ts
var UserService = class {
  constructor() {
    this.db = new import_client.PrismaClient();
  }
  getUserById(id) {
    return __async(this, null, function* () {
    });
  }
  userExistsByEmail(email) {
    return __async(this, null, function* () {
      return yield this.db.user.findUnique({
        where: { email }
      });
    });
  }
  getUserByEmail(email) {
    return __async(this, null, function* () {
      const userFound = yield this.db.user.findUnique({
        where: { email }
      });
      if (!userFound) throw new AppError("Usu\xE1rio n\xE3o encontrado!", 404);
      return userFound;
    });
  }
};

// src/infra/TokenService.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var TokenService = class {
  constructor() {
    this.secretKey = process.env.TOKEN_SECRET;
  }
  generateToken(userId) {
    if (!this.secretKey)
      throw new AppError(
        "Houve um erro interno na autentica\xE7\xE3o, lamentamos!",
        500
      );
    return import_jsonwebtoken.default.sign(
      {
        userId
      },
      this.secretKey
    );
  }
  verifyToken(token) {
    if (!this.secretKey)
      throw new AppError(
        "Houve um erro interno na autentica\xE7\xE3o, lamentamos!",
        500
      );
    try {
      return import_jsonwebtoken.default.verify(token, this.secretKey);
    } catch (e) {
      throw new AppError("Token expirado ou inv\xE1lido ", 401);
    }
  }
};

// src/services/AuthService.ts
var AuthService = class {
  constructor() {
    this.db = new import_client2.PrismaClient();
    this.bcryptService = new BcryptService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }
  login(loginCredentials) {
    return __async(this, null, function* () {
      this.validateLoginFields(loginCredentials);
      const _a = yield this.userService.getUserByEmail(
        loginCredentials.email
      ), { password } = _a, loggedUser = __objRest(_a, ["password"]);
      const passwordMatches = yield this.bcryptService.passwordMatcher(
        loginCredentials.password,
        password
      );
      if (!passwordMatches) throw new AppError("Credenciais inv\xE1lidas!", 422);
      const token = this.tokenService.generateToken(loggedUser.id);
      return {
        token,
        loggedUser
      };
    });
  }
  register(registerCredentials) {
    return __async(this, null, function* () {
      this.validateRegisterFields(registerCredentials);
      const isEmailAlreadyRegistered = yield this.userService.userExistsByEmail(
        registerCredentials.email
      );
      if (isEmailAlreadyRegistered)
        throw new AppError("Email j\xE1 cadastrado", 422);
      const { passwordHash } = yield this.bcryptService.generateHashedPassword(
        registerCredentials.password
      );
      const _a = yield this.db.user.create({
        data: {
          email: registerCredentials.email,
          name: registerCredentials.name,
          password: passwordHash
        }
      }), { password } = _a, createdUser = __objRest(_a, ["password"]);
      return createdUser;
    });
  }
  validateLoginFields({ email, password }) {
    if (!email) throw new AppError("Campo 'email' \xE9 obrigat\xF3rio!", 422);
    if (!password) throw new AppError("Campo 'senha' \xE9 obrigat\xF3rio!", 422);
  }
  validateRegisterFields(credentials) {
    const { email, name, password, passwordConfirmation } = credentials;
    if (!email) throw new AppError("Campo 'email' \xE9 obrigat\xF3rio!", 422);
    if (!name) throw new AppError("Campo 'nome' \xE9 obrigat\xF3rio!", 422);
    if (!password) throw new AppError("Campo 'senha' \xE9 obrigat\xF3rio!", 422);
    if (password !== passwordConfirmation)
      throw new AppError("Senhas n\xE3o condizem", 422);
    return;
  }
};

// src/controllers/AuthController.ts
var authService = new AuthService();
function login(req, res) {
  return __async(this, null, function* () {
    const { loggedUser, token } = yield authService.login(req.body);
    res.status(200).json({
      message: "Auternticado com sucesso!",
      loggedUser,
      token
    });
  });
}
function register(req, res) {
  return __async(this, null, function* () {
    const createdUser = yield authService.register(req.body);
    res.status(201).json({
      message: "Usu\xE1rio criado com sucesso!",
      createdUser
    });
  });
}

// src/routes/AuthRoutes.ts
var AuthRoutes = (0, import_express.Router)();
AuthRoutes.post("/login", login);
AuthRoutes.post("/register", register);
var AuthRoutes_default = AuthRoutes;

// src/routes/ConversionRoutes.ts
var import_express2 = require("express");

// src/services/ConversionService.ts
var import_client3 = require("@prisma/client");

// src/config/CoinGekkoApi.ts
var import_axios = __toESM(require("axios"));
var CoinGekkoApi = import_axios.default.create({
  baseURL: "https://api.coingecko.com/api/v3"
});
var CoinGekkoApi_default = CoinGekkoApi;

// src/services/CoinGekkoService.ts
var CoinGekkoService = class {
  getCoinValue(coinId) {
    return __async(this, null, function* () {
      return yield CoinGekkoApi_default.get(`/simple/price?ids=${coinId}&vs_currencies=usd,brl`).then((res) => {
        const brlCurrency = res.data[coinId].brl;
        const usdCurrency = res.data[coinId].usd;
        return { brlCurrency, usdCurrency };
      });
    });
  }
};

// src/utils/DateUtils.ts
var import_dayjs = __toESM(require("dayjs"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
var DateUtils = class {
  static toBRT(rawDate) {
    return (0, import_dayjs.default)(rawDate).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss");
  }
};

// src/services/ConversionService.ts
var ConversionService = class {
  constructor() {
    this.db = new import_client3.PrismaClient();
    this.coinGekkoService = new CoinGekkoService();
  }
  calculateConversion(req) {
    return __async(this, null, function* () {
      var _a;
      this.validateRequestedFields(req);
      const { coinAmount, coinId } = req.body;
      const { brlCurrency, usdCurrency } = yield this.coinGekkoService.getCoinValue(coinId);
      const convertedValues = {
        BRL: coinAmount * brlCurrency,
        USD: coinAmount * usdCurrency
      };
      return yield this.saveConversion(
        {
          coinAmount,
          coinName: coinId,
          convertedValueBRL: convertedValues.BRL,
          convertedValueUsd: convertedValues.USD
        },
        (_a = req.user) == null ? void 0 : _a.id
      );
    });
  }
  getConversionsByUserId(id) {
    return __async(this, null, function* () {
      if (!id) throw new AppError("Erro ao buscar convers\xF5es!", 500);
      const conversions = yield this.db.conversion.findMany({
        where: {
          userId: id
        }
      });
      const conversionListWithCorrectDate = [];
      conversions.forEach((conversion) => {
        conversionListWithCorrectDate.push(__spreadProps(__spreadValues({}, conversion), {
          convertedValueBRL: conversion.convertedValueBRL.toNumber(),
          convertedValueUsd: conversion.convertedValueUsd.toNumber(),
          createdAt: DateUtils.toBRT(conversion.createdAt)
        }));
      });
      return conversionListWithCorrectDate;
    });
  }
  saveConversion(conversion, userId) {
    return __async(this, null, function* () {
      if (!userId) throw new AppError("Erro ao armazenar convers\xE3o!", 500);
      const _a = yield this.db.conversion.create({
        data: __spreadProps(__spreadValues({}, conversion), {
          userId
        })
      }), { createdAt: wrongDateTime, convertedValueBRL, convertedValueUsd } = _a, resto = __objRest(_a, ["createdAt", "convertedValueBRL", "convertedValueUsd"]);
      return __spreadProps(__spreadValues({}, resto), {
        convertedValueBRL: convertedValueBRL.toNumber(),
        convertedValueUsd: convertedValueUsd.toNumber(),
        createdAt: DateUtils.toBRT(wrongDateTime)
      });
    });
  }
  validateRequestedFields(fields) {
    if (!fields.body) throw new AppError("Informe a moeda e a quantidade corretamente!");
    const { coinAmount, coinId } = fields.body;
    if (!coinAmount)
      throw new AppError("Informe a quantidade a ser convertida!", 422);
    if (!coinId)
      throw new AppError("Informe a moeda a ser convertida!", 422);
    return;
  }
};

// src/controllers/ConversionController.ts
var conversionService = new ConversionService();
function converter(req, res) {
  return __async(this, null, function* () {
    const results = yield conversionService.calculateConversion(req);
    res.status(200).json({
      message: "Convers\xE3o bem sucedida!",
      results
    });
  });
}
function getConversionByUser(req, res) {
  return __async(this, null, function* () {
    var _a;
    const conversionList = yield conversionService.getConversionsByUserId((_a = req.user) == null ? void 0 : _a.id);
    res.status(200).json({
      message: "Convers\xF5es encontradas com sucesso!",
      conversions: conversionList
    });
  });
}

// src/middlewares/authMiddleware.ts
var tokenService = new TokenService();
function authMiddleware(req, res, next) {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer "))
    throw new AppError("Usu\xE1rio n\xE3o autenticado!", 401);
  const token = headers.split(" ")[1];
  const { userId } = tokenService.verifyToken(token);
  req.user = {
    id: userId
  };
  next();
}

// src/routes/ConversionRoutes.ts
var ConversionRoutes = (0, import_express2.Router)();
ConversionRoutes.use(authMiddleware);
ConversionRoutes.post("/convert", converter);
ConversionRoutes.get("/conversions", getConversionByUser);
var ConversionRoutes_default = ConversionRoutes;

// src/routes/FavoritesRoutes.ts
var import_express3 = require("express");

// src/services/FavoriteService.ts
var import_client4 = require("@prisma/client");
var FavoriteService = class {
  constructor() {
    this.db = new import_client4.PrismaClient();
  }
  handleFavoriteCoin(req) {
    return __async(this, null, function* () {
      const { body, user } = req;
      this.validateRequestedFields(req);
      if (!(user == null ? void 0 : user.id)) throw new AppError("Erro ao favoritar moeda!", 500);
      const isCoinAlreadyFavorited = yield this.isCoinAlreadyFavorited(body.coinSymbol, user.id);
      if (!isCoinAlreadyFavorited) {
        yield this.db.favoritesCoins.create({
          data: {
            coinSymbol: body.coinSymbol,
            userId: user.id,
            coinName: body.coinName,
            image: body.image
          }
        });
      } else {
        yield this.db.favoritesCoins.deleteMany({
          where: {
            userId: user.id,
            coinSymbol: body.coinSymbol
          }
        });
      }
      return this.getFavoritesCoinsByUser(user.id);
    });
  }
  getFavoritesCoinsByUser(userId) {
    return __async(this, null, function* () {
      if (!userId) throw new AppError("Erro ao carregar lista de moedas favoritas!", 500);
      return this.db.favoritesCoins.findMany({
        where: {
          userId
        }
      });
    });
  }
  isCoinAlreadyFavorited(coinSymbol, userId) {
    return __async(this, null, function* () {
      const coinFound = yield this.db.favoritesCoins.findFirst({
        where: {
          userId,
          coinSymbol
        }
      });
      return !!coinFound;
    });
  }
  validateRequestedFields(req) {
    if (!req.body || !req.body.coinSymbol || !req.body.coinName) throw new AppError("Informe a moeda a ser favoritada!", 422);
    if (!req.body.image) throw new AppError("Informe a imagem da moeda!", 422);
  }
};

// src/controllers/FavoritesController.ts
var favoriteService = new FavoriteService();
function handleFavoriteCoin(req, res) {
  return __async(this, null, function* () {
    const updatedFavoritesCoinsList = yield favoriteService.handleFavoriteCoin(req);
    res.status(200).json({
      message: "Lista de moedas favoritadas atualizada com sucesso!",
      updatedFavoritesCoinsList
    });
  });
}
function getFavoritesCoinsList(req, res) {
  return __async(this, null, function* () {
    var _a;
    const favoritesCoinsList = yield favoriteService.getFavoritesCoinsByUser((_a = req.user) == null ? void 0 : _a.id);
    res.status(200).json({
      message: "Moedas favoritadas econtradas",
      favoritesCoinsList
    });
  });
}

// src/routes/FavoritesRoutes.ts
var FavoritesRoutes = (0, import_express3.Router)();
FavoritesRoutes.use(authMiddleware);
FavoritesRoutes.post("/favorites", handleFavoriteCoin);
FavoritesRoutes.get("/favorites", getFavoritesCoinsList);
var FavoritesRoutes_default = FavoritesRoutes;

// src/routes/routes.ts
var routes = (0, import_express4.Router)();
routes.get("/", (req, res) => {
  res.status(200).json({
    message: "Bem vindo ao cripto cambioawdawd!"
  });
});
routes.use("/auth", AuthRoutes_default);
routes.use(ConversionRoutes_default);
routes.use(FavoritesRoutes_default);
var routes_default = routes;

// src/index.ts
import_dotenv.default.config();
var App = (0, import_express5.default)();
App.use((0, import_cors.default)());
App.use(import_express5.default.json());
App.use("/api", routes_default);
App.use(errorHandler);
var port = process.env.PORT || 8080;
App.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
