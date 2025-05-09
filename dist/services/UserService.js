"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/services/UserService.ts
var UserService_exports = {};
__export(UserService_exports, {
  default: () => UserService
});
module.exports = __toCommonJS(UserService_exports);
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
