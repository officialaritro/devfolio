# 🔐 Admin Dashboard Documentation

## Overview

The admin dashboard is a restricted section of the website that provides monitoring capabilities for user interactions. It's accessible only to authorized users with specific email addresses defined in the environment variables.

## Features

The dashboard consists of:

1. **Chats Page**: Displays all user chat sessions and conversation histories

## Authentication

The dashboard uses NextAuth.js for authentication with Google OAuth provider:

```typescript
// Authentication configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific email addresses to access the dashboard
      return user.email === process.env.ALLOWED_DASHBOARD_EMAIL;
    },
  },
  pages: {
    signIn: '/dashboard/login',
    error: '/dashboard/error',
  },
};
```

## Dashboard Home Page

The Home page provides an overview of:

1. **Crawling Status**: Last crawl date and time
2. **Content Statistics**: Number of pages indexed and embedded
3. **Chat Statistics**: Number of active chats and total messages
4. **Manual Trigger**: Button to manually trigger a new crawl

## Chats Page

The Chats page provides:

1. **Chat Listing**: All chat sessions with titles and timestamps
2. **Conversation View**: Detailed view of each conversation
3. **Search and Filtering**: Tools to find specific chats  <!-- TODO  -->
4. **Analytics**: Basic analytics on chat engagement <!-- TODO  -->

## API Endpoints

The dashboard relies on several API endpoints:

### Chats List

```
GET /api/dashboard/chats
```
Returns a list of all chat sessions.

### Chat Detail

```
GET /api/dashboard/chats/:chatId
```
Returns detailed information about a specific chat session.

## Database Schema

The dashboard uses the following collections:

### Chats Collection

```typescript
interface ChatDocument {
  chatId: string;      // Unique chat identifier
  title: string;       // AI-generated chat title
  conversation: {      // Array of messages
    type: 'user' | 'bot';
    message: string;
    timestamp: Date;
  }[];
  createdAt: Date;
}
```

### Crawling Metadata Collection

```typescript
interface CrawlingMetadata {
  lastCrawledAt: Date; // Timestamp of last successful crawl
}
```

## Security Considerations

The dashboard implements several security measures:

1. **Authentication**: Only specified email addresses can access the dashboard
2. **API Protection**: All dashboard API endpoints are protected with session validation
3. **No Sensitive Data**: User identification information is not stored with chat data

## Configuration

The dashboard requires the following environment variables:

```env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
ALLOWED_DASHBOARD_EMAIL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
```

## Best Practices

The dashboard follows these best practices:

1. **Server-Side Rendering**: Sensitive information is rendered server-side
2. **Client-Side Caching**: Commonly accessed data is cached client-side <!-- TODO  -->
3. **Error Handling**: Proper error boundaries and fallbacks
4. **Responsive Design**: Mobile-friendly layout for on-the-go management