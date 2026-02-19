"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversations_controller_1 = require("./conversations.controller");
const router = (0, express_1.Router)();
router.post('/', conversations_controller_1.ConvController.create);
exports.default = router;
//# sourceMappingURL=conversations.routes.js.map