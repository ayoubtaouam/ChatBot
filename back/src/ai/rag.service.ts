import { loadKnowledgeBase } from './markdown.loader';
import { openai } from './openai.client';
import modelsRepository from '../modules/models/models.repository';

interface ChatContext {
  userMessage: string;
}

export class RAGService {
  private kbChunks: string[] = [];

  constructor() {}

  async init() {
    this.kbChunks = await loadKnowledgeBase();
  }

  private similaritySearch(query: string, topK = 3): string[] {
      const matches = this.kbChunks.filter((chunk) =>
      chunk.toLowerCase().includes(query.toLowerCase())
    );
    return matches.slice(0, topK);
  }

  async getAnswer({ userMessage }: ChatContext) {
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
    const selectedModel = (await modelsRepository.getSelected())?.name || 'gpt-4o';

    const completion = await openai.chat.completions.create({
      model: selectedModel,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    return completion.choices[0]?.message?.content ?? '';
  }
}

export const ragService = new RAGService();