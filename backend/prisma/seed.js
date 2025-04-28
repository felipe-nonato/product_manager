"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../generated/prisma");
var faker_1 = require("@faker-js/faker");
// Inicializar o Prisma Client
var prisma = new prisma_1.PrismaClient();
// Configurações de quantidade
var NUM_CATEGORIES = 10;
var NUM_SUBCATEGORIES = 3; // Por categoria principal
var NUM_PRODUCTS = 100;
var MAX_CATEGORIES_PER_PRODUCT = 3;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var mainCategories, i, category, allCategories, _i, mainCategories_1, mainCategory, i, subcategory, i, numCategories, selectedCategoryIds, randomCategory, product, categoryCount, productCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Iniciando o seed do banco de dados...');
                    // Limpar dados existentes
                    console.log('🧹 Limpando dados existentes...');
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 2:
                    _a.sent();
                    // Criar categorias principais
                    console.log('📁 Criando categorias principais...');
                    mainCategories = [];
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < NUM_CATEGORIES)) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                name: faker_1.faker.commerce.department(),
                            },
                        })];
                case 4:
                    category = _a.sent();
                    mainCategories.push(category);
                    console.log("   \u2705 Categoria criada: ".concat(category.name));
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    // Criar subcategorias
                    console.log('📂 Criando subcategorias...');
                    allCategories = __spreadArray([], mainCategories, true);
                    _i = 0, mainCategories_1 = mainCategories;
                    _a.label = 7;
                case 7:
                    if (!(_i < mainCategories_1.length)) return [3 /*break*/, 12];
                    mainCategory = mainCategories_1[_i];
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < NUM_SUBCATEGORIES)) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                name: faker_1.faker.commerce.productAdjective() + ' ' + mainCategory.name,
                                parentId: mainCategory.id,
                            },
                        })];
                case 9:
                    subcategory = _a.sent();
                    allCategories.push(subcategory);
                    console.log("   \u2705 Subcategoria criada: ".concat(subcategory.name, " (pai: ").concat(mainCategory.name, ")"));
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 8];
                case 11:
                    _i++;
                    return [3 /*break*/, 7];
                case 12:
                    // Criar produtos
                    console.log('🛍️ Criando produtos...');
                    i = 0;
                    _a.label = 13;
                case 13:
                    if (!(i < NUM_PRODUCTS)) return [3 /*break*/, 16];
                    numCategories = Math.floor(Math.random() * MAX_CATEGORIES_PER_PRODUCT) + 1;
                    selectedCategoryIds = new Set();
                    while (selectedCategoryIds.size < numCategories) {
                        randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
                        selectedCategoryIds.add(randomCategory.id);
                    }
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: faker_1.faker.commerce.productName(),
                                qty: faker_1.faker.number.int({ min: 1, max: 1000 }),
                                price: parseFloat(faker_1.faker.commerce.price({ min: 1, max: 1000 })),
                                photo: faker_1.faker.image.url(),
                                categories: {
                                    connect: Array.from(selectedCategoryIds).map(function (id) { return ({ id: id }); }),
                                },
                            },
                        })];
                case 14:
                    product = _a.sent();
                    console.log("   \u2705 Produto criado: ".concat(product.name, " - $").concat(product.price, " (").concat(product.qty, " em estoque)"));
                    _a.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16: return [4 /*yield*/, prisma.category.count()];
                case 17:
                    categoryCount = _a.sent();
                    return [4 /*yield*/, prisma.product.count()];
                case 18:
                    productCount = _a.sent();
                    console.log('\n🌟 Seed concluído com sucesso!');
                    console.log("\uD83D\uDCCA Estat\u00EDsticas:");
                    console.log("   - ".concat(categoryCount, " categorias criadas"));
                    console.log("   - ".concat(productCount, " produtos criados"));
                    return [2 /*return*/];
            }
        });
    });
}
// Executar o seed
main()
    .catch(function (error) {
    console.error('❌ Erro durante o seed:');
    console.error(error);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Fechar conexão com o banco de dados
            return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                // Fechar conexão com o banco de dados
                _a.sent();
                console.log('🔌 Conexão com o banco de dados fechada.');
                return [2 /*return*/];
        }
    });
}); });
