"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_controller_1 = __importDefault(require("./models.controller"));
const router = (0, express_1.Router)();
router.get('/models', models_controller_1.default.getModels.bind(models_controller_1.default));
router.post('/models/select', models_controller_1.default.selectModel.bind(models_controller_1.default));
exports.default = router;
//# sourceMappingURL=models.routes.js.map