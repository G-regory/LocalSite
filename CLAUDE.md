# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Test local mode functionality
npm run test:local

# Check Ollama models
npm run ollama:check
```

## Core Architecture

LocalSite is a Next.js 15 application that provides a web development IDE with AI capabilities. Key architectural components:

- **Next.js App Router** with React 19 and TypeScript
- **Dual Mode System**: Cloud providers (OpenRouter, Fireworks, etc.) + Local (Ollama)
- **TanStack Query** for server state management
- **MongoDB** with Mongoose ODM
- **shadcn/ui** components (New York style) with TailwindCSS

### Key Patterns

- AI provider abstraction with dynamic switching between cloud/local
- Feature-based organization with server/client component separation
- Context + hooks pattern for state management
- Route handlers for API endpoints

### Project Structure
```
/app
├── (public)/     # Public routes
├── api/         # API routes
├── auth/        # Authentication
├── projects/    # Project management
└── layout.tsx   # Root layout

/components
├── contexts/    # React contexts
├── editor/     # Code editor
├── ui/         # shadcn/ui components
└── [feature]/  # Feature components
```

## Configuration Requirements

1. **ESLint**: Uses Next.js core web vitals rules with TypeScript support (FlatConfig format)
2. **TypeScript**: Strict mode with path mapping (@/* → ./)
3. **Environment**: 
   - Required vars for cloud mode: API keys for providers
   - Local mode: Ollama connection settings