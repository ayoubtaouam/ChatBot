import fs from 'fs';
import path from 'path';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export async function loadKnowledgeBase(): Promise<string[]> {
  const filePath = path.join(__dirname, '../../docs/chatbot_source.md');
  const raw = fs.readFileSync(filePath, 'utf-8');

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.splitText(raw);
  return docs;
}