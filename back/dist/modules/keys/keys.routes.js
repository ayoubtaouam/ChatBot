"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const keys_controller_1 = require("./keys.controller");
const router = (0, express_1.Router)();
router.post('/api-key', keys_controller_1.KeysController.save);
router.get('/api-key/status', keys_controller_1.KeysController.status);
exports.default = router;
//# sourceMappingURL=keys.routes.js.map