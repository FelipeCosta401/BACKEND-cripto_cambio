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

// src/services/CoinGekkoService.ts
var CoinGekkoService_exports = {};
__export(CoinGekkoService_exports, {
  default: () => CoinGekkoService
});
module.exports = __toCommonJS(CoinGekkoService_exports);

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
