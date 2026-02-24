import { loadKnowledgeBase } from './markdown.loader';
import { openai } from './openai.client';
import modelsRepository from '../modules/models/models.repository';
import {tools} from './tools';

interface ChatContext {
  userMessage: string;
}

export class OpenaiChatService {
  private knowledgeBase: string = '';

  constructor() {}

  async init() {
    const chunks = await loadKnowledgeBase();
    this.knowledgeBase = chunks.join('\n\n');
    //.log(this.knowledgeBase);
  }

  private buildSystemPrompt() {
    return `
  You are an AI assistant for this application.

  Use the context below as your primary knowledge source.
  If the answer is not clearly in the context, respond with:
  "I can only answer questions related to this application."

  Context:
  ${this.knowledgeBase}
  `;
  }

  private async executeTool(toolName: string) {
    switch (toolName) {
      case "searchModels":
        return modelsRepository.getAll();
      case "getSelectedModel":
        return modelsRepository.getSelected();
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  async getAnswer({ userMessage }: ChatContext) {
    const selectedModel = (await modelsRepository.getSelected())?.name || 'gpt-4o';
    console.log(selectedModel);
    const systemPrompt = this.buildSystemPrompt();

    const completion = await openai.chat.completions.create({
      model: selectedModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      tools,
      tool_choice: "auto",
      temperature: 0,
    });
    const message = completion.choices[0]?.message;
    if (message?.tool_calls?.length) {
      const toolCall = message.tool_calls[0];
      const toolName = toolCall?.function.name!;
      const result = await this.executeTool(toolName);
      const followup = await openai.chat.completions.create({
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
          message,
          {
            role: "tool",
            tool_call_id: toolCall?.id!,
            content: JSON.stringify(result)
          }
        ],
        temperature: 0,
      });
      return followup.choices[0]?.message?.content ?? '';
  }
    return message?.content ?? '';
  }
}

export const openaiChatService = new OpenaiChatService();