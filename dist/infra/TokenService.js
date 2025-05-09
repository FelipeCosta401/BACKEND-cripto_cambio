"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/TokenService.ts
var TokenService_exports = {};
__export(TokenService_exports, {
  default: () => TokenService
});
module.exports = __toCommonJS(TokenService_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/exceptions/AppException.ts
var AppError = class _AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, _AppError.prototype);
  }
};

// src/infra/TokenService.ts
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
