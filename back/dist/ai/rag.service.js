"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ragService = exports.RAGService = void 0;
const markdown_loader_1 = require("./markdown.loader");
const openai_client_1 = require("./openai.client");
const models_repository_1 = __importDefault(require("../modules/models/models.repository"));
class RAGService {
    kbChunks = [];
    constructor() { }
    async init() {
        this.kbChunks = await (0, markdown_loader_1.loadKnowledgeBase)();
    }
    similaritySearch(query, topK = 3) {
        const matches = this.kbChunks.filter((chunk) => chunk.toLowerCase().includes(query.toLowerCase()));
        return matches.slice(0, topK);
    }
    async getAnswer({ userMessage }) {
        const relevantChunks = this.similaritySearch(userMessage);
        if (relevantChunks.length === 0) {
            return "I can only answer questions related to this application.";
        }
        const prompt = `
You are an AI assistant. Only answer using the context below.
If the question is outside this context, respond with:
"I can only answer questions related to this application."

Context:
${relevantChunks.join('\n\n')}

Question: ${userMessage}
Answer:
`;
        // Dynamically get the selected model from the database
        const selectedModel = (await models_repository_1.default.getSelected())?.name || 'gpt-4o';
        const completion = await openai_client_1.openai.chat.completions.create({
            model: selectedModel,
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        });
        return completion.choices[0]?.message?.content ?? '';
    }
}
exports.RAGService = RAGService;
exports.ragService = new RAGService();
//# sourceMappingURL=rag.service.js.map