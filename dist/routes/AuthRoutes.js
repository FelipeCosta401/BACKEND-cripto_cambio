"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/routes/AuthRoutes.ts
var AuthRoutes_exports = {};
__export(AuthRoutes_exports, {
  default: () => AuthRoutes_default
});
module.exports = __toCommonJS(AuthRoutes_exports);
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
