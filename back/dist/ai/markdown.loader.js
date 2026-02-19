"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadKnowledgeBase = loadKnowledgeBase;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const text_splitters_1 = require("langchain/text_splitters");
async function loadKnowledgeBase() {
    const filePath = path_1.default.join(__dirname, '../../docs/chatbot_source.md');
    const raw = fs_1.default.readFileSync(filePath, 'utf-8');
    const splitter = new text_splitters_1.RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const docs = await splitter.splitText(raw);
    return docs;
}
//# sourceMappingURL=markdown.loader.js.map