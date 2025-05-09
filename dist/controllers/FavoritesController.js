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

// src/controllers/FavoritesController.ts
var FavoritesController_exports = {};
__export(FavoritesController_exports, {
  getFavoritesCoinsList: () => getFavoritesCoinsList,
  handleFavoriteCoin: () => handleFavoriteCoin
});
module.exports = __toCommonJS(FavoritesController_exports);

// src/services/FavoriteService.ts
var import_client = require("@prisma/client");

// src/exceptions/AppException.ts
var AppError = class _AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, _AppError.prototype);
  }
};

// src/services/FavoriteService.ts
var FavoriteService = class {
  constructor() {
    this.db = new import_client.PrismaClient();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFavoritesCoinsList,
  handleFavoriteCoin
});
