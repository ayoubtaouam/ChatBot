"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
};
// optional: quick sanity check
if (!exports.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing in .env file');
}
//# sourceMappingURL=env.js.map