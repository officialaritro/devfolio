# 🏗️ Architecture Overview

## System Architecture

This portfolio website is built as a modern full-stack application using Next.js 15 as its foundation. The architecture follows a clean, modular design with clear separation of concerns.

![architecture](/docs/architecture.png)

## Key Components

### Client-Side

- **Pages and UI Components**: Built with React 19 and styled using TailwindCSS and Shadcn UI
- **State Management**: Zustand for global state, React Query for server state
- **Animations**: GSAP for advanced animations and transitions

### Server-Side

- **API Routes**: Handle chatbot, crawler, and admin functionalities
- **Server Actions**: Manage database operations and secure actions
- **Middleware**: Handle authentication and authorization checks

### External Services

- **Database**: MongoDB Atlas with vector search capabilities
- **AI Services**: 
  - Groq AI for chat response generation
  - Vertex AI for embedding generation
- **Email**: Resend for email delivery
- **Authentication**: NextAuth.js with Google OAuth provider

## Data Flow

### Website Content Flow

1. Content is authored and published to the website
2. The crawler processes the content via sitemap
3. Content is cleaned, transformed to markdown
4. Vertex AI generates embeddings
5. Content and embeddings are stored in MongoDB

### Chatbot Interaction Flow

1. User initiates a chat session
2. User messages are sent to the server
3. Server converts messages to embeddings
4. MongoDB vector search finds relevant content
5. Groq AI generates personalized responses
6. Responses are sent back to the user and stored

### Admin Dashboard Flow

1. Admin authenticates with Google OAuth
2. Dashboard displays site statistics and chat data
3. Admin can view chat histories and trigger crawls
4. Actions are secured with middleware checks

## Authentication and Security

- **User Authentication**: None required for general site visitors
- **Admin Authentication**: Google OAuth restricted to specific email addresses
- **API Security**: Protected routes with session validation
- **Data Security**: Sensitive keys stored in environment variables
- **Rate Limiting**: Implemented on sensitive endpoints

## Performance Optimizations

- **Edge Rendering**: Critical pages rendered at the edge
- **Image Optimization**: Next.js automatic image optimization
- **API Response Caching**: Caching for non-dynamic API responses
- **Embedding Optimization**: Text truncation for efficient embedding
- **Database Indexes**: Optimized indexes for MongoDB queries

## Scalability Considerations

- **Vector Database**: MongoDB scales to millions of embeddings
- **Stateless Design**: API endpoints are stateless for horizontal scaling
- **Resource Optimization**: Efficient use of AI API calls
- **Crawling Efficiency**: Incremental crawling to reduce processing

## Deployment Architecture

The application is deployed using Vercel with the following setup:

- **Production Environment**: Main branch deployment
- **Preview Environments**: PR-based preview deployments
- **Environment Variables**: Securely stored in Vercel
- **Edge Network**: Global CDN for static assets
- **Serverless Functions**: API routes run as serverless functions