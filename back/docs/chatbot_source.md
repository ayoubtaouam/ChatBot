# Chatbot Technical Knowledge Base (Consolidated)

This document serves as a comprehensive knowledge source for the application's chatbot, detailing technical specifications, features, and configuration options for core application components.

---

## 1. AI Characters

AI Characters define the "soul" of the assistants, providing personality, voice, and behavioral traits. They are the base upon which all AI interactions are built.

### Key Features

- **Personality Design**: Create unique personalities from scratch with custom behavioral instructions.
- **Voice Configuration**: Multi-provider voice synthesis from industry leaders (Azure, ElevenLabs, Deepgram, OpenAI).
- **Personality Traits**: Define detailed behavioral guidelines and communication styles using Markdown.
- **Character Duplication**: Quickly replicate successful personalities to iterate on new variations.
- **Visibility Management**: Granular control (Private, Internal, Public) to manage organizational sharing and security.
- **Multi-language Support**: Native support for various target languages for international use cases.

### Configuration Details

| Category | Field | Description |
| :--- | :--- | :--- |
| **Basic Info** | Name | A unique identifier for the character. |
| | Description | A brief summary of the character's purpose (what it represents). |
| | Visibility | Private (Creator), Internal (Org), Public (Global). |
| | Target Language | The primary language the character is designed to speak. |
| **Voice & Speech** | Voice Provider | Azure (Cloud), ElevenLabs (Natural), Deepgram (Fast), OpenAI (Advanced). |
| | STT Type | Speech-To-Text processing via Apifant, Azure, Whisper, or Deepgram. |
| **Personality** | Instructions | Detailed Markdown behavioral prompt (Tone, Role, Constraints). |

### Personality & Behavior Guidelines

When defining character instructions, the system supports full Markdown to specify:
- **Tone of voice**: Professional, friendly, sarcastic, or persona-specific.
- **Role and context**: Specific role definitions (e.g., "Specialized travel agent").
- **Constraints**: Security rules and operational boundaries ("Never mention competitors").
- **Communication style**: Formatting preferences (e.g., "Use short sentences and bullet points").

### Actions & Management

- **Edit**: Modify personality or voice configs (requires edit permissions).
- **Duplicate**: Create a 1:1 copy as a starting point for new characters.
- **Delete**: Permanently remove a character from the system.
- **Search & Filter**: Effortlessly find characters by name, description, or visibility status.

---

## 2. AI Assistants

AI Assistants are the functional agents that interact with users. They combine a Character personality with tools, knowledge bases, and advanced logic.

## Chat Interface & Interaction

The AI Assistant Hub provides multiple chat interfaces tailored for different use cases, from single-agent conversations to complex multi-agent workflows.

### Chat Interface (ChatPage)

The core chat interface focuses on deep interaction with a single AI Assistant.

- **Real-time Tool Notifications**: Uses Server-Sent Events (SSE) to provide live feedback when an assistant triggers a tool. Users see "Tool Started" and "Tool Finished" updates autonomously.
- **Knowledge Base Integration**: Assistants with an attached knowledge base are marked with a badge. The interface supports managing knowledge records specific to the current chat session.
- **Context Injection**: The **Chat Knowledge Manager** allows users to inject facts, instructions, or emergency context into a specific conversation to guide behavior without modifying the base assistant configuration.
- **Assistant Rating**: Users can rate assistant responses directly within the chat to provide feedback on accuracy and helpfulness.
- **Session Management**: A sidebar provides history, search by assistant/model, and multi-select deletion of conversations.

### Assistant Chain Chat (ChainChatPage)

A specialized interface for interacting with visual workflows (Agentchains).

- **Workflow Visualization**: Displays the progress of the chain, showing which node (agent) is currently active and the overall path of execution.
- **Complex Session State**: Handles the restoration of multi-step execution states, ensuring users can resume chain interactions seamlessly.

### Floating Chat Widget

A lightweight, overlay-based chat component for quick previews or temporary interactions.

- **Ephemeral Conversations**: Messages are persisted in `localStorage` for the duration of the browser session, allowing for stateless testing.
- **Conversion to Persistent Chat**: Users can "Save" a floating conversation to convert it into a permanent chat session with history.

### Real-time Communication (SSE)

- **Protocol**: WebSockets are NOT used; the system relies on **Server-Sent Events (SSE)** for push notifications.
- **Authentication**: Since `EventSource` doesn't support custom headers, the JWT token is passed as a query parameter for secure streaming.
- **Event Types**: Supports `tool_call_start`, `tool_call_end`, `message_start`, and `message_end`.

### Glossary Expansion

- **SSE (Server-Sent Events)**: A standard allowing servers to push real-time updates to web pages over HTTP, used here for tool call notifications.
- **Agentchain**: A visual node-based workflow connecting multiple AI Assistants for complex automation.
- **Knowledge Injection**: The process of adding temporary facts or context to a live chat session.
- **Survey**: Optimized for data collection and structured questions.
- **Calendar**: Integrated for scheduling and calendar management.

### Features & Capabilities

- **AI-Powered Instructions**: Native tool to generate optimal instructions based on assistant metadata.
- **Multi-Context Detection**: Custom instructions for different interaction modes (Voice, Text, Multimodal).
- **Tool Integration**: Extensibility via marketplace tools with custom parameters.
- **Knowledge Base (RAG)**: Retrieval Augmented Generation using uploaded documents or URLs.
- **Guardrails**: Option to restrict assistant responses strictly to the provided knowledge base.

### Functional Configuration

| Tab | Feature | Technical Details |
| :--- | :--- | :--- |
| **Basic Info** | Name & Description | Core identity metadata. |
| | Character Link | Link to a pre-defined AI Character (`character_id`) |
| | Visibility | Private, Internal, Public (inherits character visibility constraints) |
| | Detection Type | Voice, Text, or Multimodal recognition mode |
| | Tags | Organizational labels for filtering and management |
| | Overdial Code | Unique 2-digit numeric code for specific routing |
| **Instructions** | Greeting | The first message the assistant sends. |
| | Main Instructions | Core behavior prompt (Markdown). |
| | AI Generator | Uses models like GPT-4o to write instructions based on description. |
| | Detection Prompts | Specific instructions for voice (TTS-optimized) vs text. |
| **Tools** | Tool Assignment | Marketplace tools with custom config and execution order. |
| **Knowledge** | KB Sources | Files (Base64), URLs, or Manual text entries. |
| **Webhooks** | Result Webhook | URL and Auth for sending session data after completion. |
| | Conversation Webhook | Real-time webhook for conversation events. |
| **Settings** | Parallel Mode | Concurrent processing for improved performance. |
| | Knowledge Restriction | Toggle to prevent LLM from hallucinating outside KB. |
| | DB/API Logs | `writeToDb`, `sendToLeadApi` toggles. |

---

## 3. Assistant Chains (Agentchains)

Assistant Chains enable the creation of complex, multi-agent workflows by visually linking multiple AI Assistants.

### Core Concept

Chains allow the hand-off of a conversation between different specialized assistants based on predefined logic or sequential flow. This is visualized and managed through a drag-and-drop builder interface.

### Visual Builder Features

- **Node-Based Interface**: Each node represents a specific AI Assistant with its own personality and tools.
- **Logical Connections**: Link nodes to define the path of a conversation.
- **Conditional Routing**: Connections can store "Conditions" (logic) to determine which assistant should take over the conversation next.
- **Visual Feedback**: Nodes display active tools for easy reference during chain design.
- **Editing Controls**:
  - **Lock State**: Chains can be locked (`is_lock`) to prevent accidental changes to positions or logic.
  - **Zoom & Pan**: Built-in controls for navigating large, complex chains.

### Technical Data Components

| Entity | Description | Key Attributes |
| :--- | :--- | :--- |
| **Agentchain** | The top-level container for a workflow. | Name, Description, Visibility, Lock Status. |
| **Nodes** | Individual assistant instances in the chain. | `assistant_id`, X/Y Coordinates, Inputs/Outputs. |
| **Connections** | Logical links between two assistant nodes. | `source_node_id`, `target_node_id`, `condition` (optional logic). |

### Workflow Types

- **Sequential**: A simple A → B → C flow where assistants are triggered one after another.
- **Conditional**: A branching flow where the system evaluates user input or context to choose the next assistant node.

### Chain Verification

- **Unified Testing**: A specialized chat dialog allows developers to test the entire chain's execution in a single debugging session.

---

## 4. Global Settings & Configuration

The Settings module manages foundational integrations and system-wide behavior.

### AI Model Providers (Custom LLMs)

The platform supports both managed cloud LLMs and self-hosted models.

- **System Providers**: Native support for OpenAI, Azure OpenAI, and Google Gemini.
- **Custom Providers (Ollama)**: Connect to self-hosted Ollama instances.
- **Configuration Fields**:
    - **Endpoint URL**: The base URL for API requests.
    - **API Key**: Authentication credential.
    - **Model Selection**: Granular control over which specific models are available for assistants.
    - **Pricing**: Capability to define per-token costs for input and output.
- **Tool Support Verification**: For custom providers, the system includes a testing suite to verify if a specific model supports function calling (tools).

### Voice & Speech Services

Centralized management of Text-to-Speech (TTS) and Speech-to-Text (STT) providers.

| Service Type | Supported Providers | Key Components |
| :--- | :--- | :--- |
| **TTS** | Azure, ElevenLabs, Deepgram, OpenAI | API Key, Region (Azure), Voice Selection. |
| **STT** | Apifant, Azure, Whisper (OpenAI), Deepgram | API Key, Region (Azure), Model Type. |

#### Voice Management

A global database of voices available for use by AI Characters.
- **Attributes**: Name, Voice ID, Provider, and Language.
- **Conventions**: Deepgram voices typically follow the `aura-2-{name}-{language}` naming pattern.

### Phone & Infrastructure

- **Phone Management**: Integration for inbound calling. Allows mapping specific phone numbers to AI Assistants or Assistant Chains.
- **Call Cleanup**: Configurable "Cleanup Period" (minutes) to determine how long call session data remains in server memory after a call ends.

---

## Glossary of Terms

- **STT**: Speech-to-Text conversion (e.g., Whisper, Deepgram).
- **TTS**: Text-to-Speech synthesis (e.g., Azure, ElevenLabs).
- **RAG**: Retrieval-Augmented Generation (Assistant knowledge base).
- **Internal Visibility**: Visible to anyone in the same Keycloak organization.
- **Multimodal**: Able to process both voice and text inputs simultaneously.
- **Agentchain**: A visual node-based workflow connecting multiple AI Assistants for complex automation.
- **Drawflow**: The underlying library used for the visual node builder.
- **Ollama**: A tool for running large language models locally or on private servers.
- **SSE (Server-Sent Events)**: A standard for real-time server push over HTTP, used for tool call notifications.
- **Knowledge Injection**: The process of adding temporary facts or context to a live chat session.
- **Custom LLM**: Self-hosted or third-party AI models (OpenAI, Azure, Google, Ollama).
- **Overdial Code**: A numeric code mapped to an assistant for telephone routing.
