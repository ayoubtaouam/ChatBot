import { loadKnowledgeBase } from './markdown.loader';
import { openai } from './openai.client';
import modelsRepository from '../modules/models/models.repository';

interface ChatContext {
  userMessage: string;
}

export class RAGService {
  private kbChunks: string[] = [];
  private kbEmbeddings: number[][] = [];

  constructor() {}

  async init() {
    this.kbChunks = await loadKnowledgeBase();

    try {
      const embedRes = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: this.kbChunks,
      });

      const data = embedRes?.data ?? [];
      this.kbEmbeddings = data.map((d: any) => d.embedding as number[]);
    } catch (err) {
      console.warn('Failed to compute embeddings for KB, falling back to token overlap', err);
      this.kbEmbeddings = [];
    }
  }

  private async similaritySearch(query: string, topK = 3): Promise<string[]> {
    // If we have embeddings, use cosine similarity for more robust matches
    if (this.kbEmbeddings && this.kbEmbeddings.length === this.kbChunks.length) {
      try {
        const qRes = await openai.embeddings.create({ model: 'text-embedding-3-small', input: query });
          const qEmb = qRes?.data?.[0]?.embedding as number[] | undefined;
          if (!qEmb) {
            throw new Error('no embedding returned for query');
          }

        const cosine = (a: number[], b: number[]) => {
          let dot = 0,
            na = 0,
            nb = 0;
          for (let i = 0; i < a.length; i++) {
            const av = a[i] ?? 0;
            const bv = b[i] ?? 0;

            dot += av * bv;
            na += av * av;
            nb += bv * bv;
          }
          return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-12);
        };

        const scores: { idx: number; score: number }[] = this.kbEmbeddings.map((emb, idx) => ({ idx, score: cosine(qEmb, emb) }));
        const top = scores
          .sort((a, b) => b.score - a.score)
          .slice(0, topK)
          .filter((s) => s.score > 0.12);

        return top.map((t) => this.kbChunks[t.idx]).filter((v): v is string => typeof v === 'string');
      } catch (err) {
        console.warn('Embedding search failed, falling back to token overlap', err);
      }
    }

    // Fallback token-overlap method
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

    const qTokens = normalize(query).filter((t) => t.length > 2);

    const scores = this.kbChunks.map((chunk) => {
      const cTokens = normalize(chunk);
      let overlap = 0;
      const cSet = new Set(cTokens);
      for (const t of qTokens) {
        if (cSet.has(t)) overlap++;
      }
      return { chunk, score: overlap };
    });

    const filtered = scores
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((s) => s.chunk);

    return filtered;
  }

  async getAnswer({ userMessage }: ChatContext) {
    const relevantChunks = await this.similaritySearch(userMessage);

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