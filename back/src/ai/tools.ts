import type { ChatCompletionTool } from "openai/resources/chat/completions";

export const tools = [
  {
    type: "function",
    function: {
      name: "searchModels",
      description: "Get all available models",
      parameters: {
        type: "object",
        properties: {},
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getSelectedModel",
      description: "Get the currently selected model",
      parameters: {
        type: "object",
        properties: {},
      }
    }
  }
] satisfies ChatCompletionTool[];