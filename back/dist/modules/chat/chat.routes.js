"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("./chat.controller"));
const router = (0, express_1.Router)();
router.post('/', chat_controller_1.default.sendMessage);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map