"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysService = void 0;
const hash_1 = require("../../utils/hash");
const keys_repository_1 = __importDefault(require("./keys.repository"));
const openai_client_1 = require("../../ai/openai.client");
const env_1 = require("../../config/env");
exports.KeysService = {
    async saveApiKey(rawKey) {
        const hash = await (0, hash_1.hashValue)(rawKey);
        await keys_repository_1.default.saveHash(hash);
    },
    async getStatus() {
        const hash = await keys_repository_1.default.getHash();
        return { configured: !!hash };
    },
    async validateKey(key) {
        try {
            const client = (0, openai_client_1.createOpenAIClient)(key);
            await client.models.list();
            return true;
        }
        catch {
            return false;
        }
    },
    async resolveKey() {
        return env_1.env.OPENAI_API_KEY;
    },
};
//# sourceMappingURL=keys.service.js.map