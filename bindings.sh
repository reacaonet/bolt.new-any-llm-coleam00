#!/bin/bash

bindings=""

# List all the environment variables you need
keys=(
  "GROQ_API_KEY"
  "OPENAI_API_KEY"
  "ANTHROPIC_API_KEY"
  "OPEN_ROUTER_API_KEY"
  "GOOGLE_GENERATIVE_AI_API_KEY"
  "OLLAMA_API_BASE_URL"
  "OPENAI_LIKE_API_BASE_URL"
  "DEEPSEEK_API_KEY"
  "OPENAI_LIKE_API_KEY"
  "MISTRAL_API_KEY"
  "XAI_API_KEY"
  "VITE_LOG_LEVEL"
)

# Iterate over each key and retrieve its value from the environment
for key in "${keys[@]}"; do
  value=$(printenv "$key")
  if [[ -n "$value" ]]; then
    bindings+="--binding ${key}=${value} "
  fi
done

# Trim any trailing whitespace
bindings=$(echo $bindings | sed 's/[[:space:]]*$//')

echo $bindings
