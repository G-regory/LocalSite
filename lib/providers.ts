export const PROVIDERS = {
  "fireworks-ai": {
    name: "Fireworks AI",
    max_tokens: 131_000,
    id: "fireworks-ai",
  },
  nebius: {
    name: "Nebius AI Studio",
    max_tokens: 131_000,
    id: "nebius",
  },
  sambanova: {
    name: "SambaNova",
    max_tokens: 32_000,
    id: "sambanova",
  },
  novita: {
    name: "NovitaAI",
    max_tokens: 16_000,
    id: "novita",
  },
  hyperbolic: {
    name: "Hyperbolic",
    max_tokens: 131_000,
    id: "hyperbolic",
  },
  together: {
    name: "Together AI",
    max_tokens: 128_000,
    id: "together",
  },
  groq: {
    name: "Groq",
    max_tokens: 16_384,
    id: "groq",
  },
  openrouter: {
    name: "OpenRouter",
    max_tokens: 128000,
    id: "openrouter",
  },
  // Providers locaux
  ollama: {
    name: "Ollama (Local)",
    max_tokens: 131_000,
    id: "ollama",
    isLocal: true,
  },
  "lm-studio": {
    name: "LM Studio (Local)",
    max_tokens: 131_000,
    id: "lm-studio",
    isLocal: true,
  },
};

export const MODELS = [
  // --- OpenRouter Models ---
  {
    value: "moonshotai/kimi-k2:free",
    label: "Kimi K2 (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  {
    value: "z-ai/glm-4.5-air:free",
    label: "GLM 4.5 Air (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  {
    value: "qwen/qwen3-coder:free",
    label: "Qwen3 Coder (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  {
    value: "qwen/qwen-2.5-coder-32b-instruct:free",
    label: "Qwen 2.5 Coder 32B (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  {
    value: "deepseek/deepseek-r1-0528:free",
    label: "DeepSeek R1 0528 (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
    isThinker: true,
  },
  {
    value: "deepseek/deepseek-chat-v3-0324:free",
    label: "DeepSeek Chat v3 0324 (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  {
    value: "deepseek/deepseek-r1:free",
    label: "DeepSeek R1 (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
    isThinker: true,
  },
  {
    value: "deepseek/deepseek-chat-v3.1:free",
    label: "DeepSeek Chat v3.1 (OpenRouter)",
    providers: ["openrouter"],
    autoProvider: "openrouter",
  },
  // --- Other Models ---
  {
    value: "deepseek-ai/DeepSeek-V3-0324",
    label: "DeepSeek V3 O324",
    providers: ["fireworks-ai", "nebius", "sambanova", "novita", "hyperbolic"],
    autoProvider: "novita",
  },
  {
    value: "deepseek-ai/DeepSeek-R1-0528",
    label: "DeepSeek R1 0528",
    providers: [
      "fireworks-ai",
      "novita",
      "hyperbolic",
      "nebius",
      "together",
      "sambanova",
    ],
    autoProvider: "novita",
    isThinker: true,
  },
  {
    value: "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    label: "Qwen3 Coder 480B A35B Instruct",
    providers: ["novita", "hyperbolic"],
    autoProvider: "novita",
  },
  {
    value: "moonshotai/Kimi-K2-Instruct",
    label: "Kimi K2 Instruct",
    providers: ["together", "novita", "groq"],
    autoProvider: "groq",
  },
  {
    value: "deepseek-ai/DeepSeek-V3.1",
    label: "DeepSeek V3.1",
    providers: ["fireworks-ai", "novita"],
    isNew: true,
    autoProvider: "novita"
  },
  // Modèles locaux pour Ollama
  {
    value: "deepseek-r1:7b",
    label: "DeepSeek R1 7B (Local)",
    providers: ["ollama"],
    autoProvider: "ollama",
    isLocal: true,
  },
  {
    value: "deepseek-r1:14b",
    label: "DeepSeek R1 14B (Local)",
    providers: ["ollama"],
    autoProvider: "ollama",
    isLocal: true,
  },
  {
    value: "deepseek-r1:32b",
    label: "DeepSeek R1 32B (Local)",
    providers: ["ollama"],
    autoProvider: "ollama",
    isLocal: true,
  },
  {
    value: "llama3.3:70b",
    label: "Llama 3.3 70B (Local)",
    providers: ["ollama", "lm-studio"],
    autoProvider: "ollama",
    isLocal: true,
  },
  {
    value: "qwen2.5-coder:32b",
    label: "Qwen2.5 Coder 32B (Local)",
    providers: ["ollama", "lm-studio"],
    autoProvider: "ollama",
    isLocal: true,
  },
];
