# Aritro Roy's Portfolio Website

This is the official repository for my personal website built with Next.js 15, featuring a modern design and an AI-powered chatbot to interact with visitors.


## ✨ Key Features

- Modern, responsive design built with Next.js 15
- AI-powered chatbot using Groq and vector embeddings
- Email contact form
- MDX support for rich content

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Styling**: GSAP for animations, Shadcn UI for components
- **AI**: Groq AI, MongoDB Vector Search
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: NextAuth.js
- **State Management**: Zustand, React Query

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- yarn
- MongoDB database (local or Atlas)
- Groq AI API key (for chatbot functionality)

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/devfolio.git
cd devfolio
git checkout design-v2
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory, take reference from `.env.sample` file.

1. Run the development server
```bash
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 💬 Chatbot Functionality

The AI chatbot is powered by Groq AI and uses MongoDB vector search to find relevant information about me to answer visitor questions.

For detailed information on how the chatbot works, please see the [Chatbot Documentation](/docs/chatbot.md).

### Running without the chatbot

If you don't want to set up the chatbot functionality, you can comment out the chatbot component in `src/components/wrapper.tsx`:

```tsx
{/* Temporarily disable chatbot
    <ChatBot /> 
*/}
```

## 🔐 Admin Dashboard

The website includes an admin dashboard (accessible only to authorized users) with features for chat monitoring.

For detailed information on the dashboard functionality, please see the [Dashboard Documentation](/docs/dashboard.md).

## 🤖 Content Crawler

This project includes an automated content crawler that processes website content and generates embeddings for the chatbot.

For detailed information on how the crawler works, please see the [Crawler Documentation](/docs/crawler.md).

## 📧 Email Functionality

To see the email designs locally, run:

```bash
yarn email
```

This will start a local server to preview email templates.

## 📚 Technical Documentation

For more detailed technical documentation, please refer to the following:

- [Architecture Overview](/docs/architecture.md)

## 🔧 Customization

To customize the website for your own use:
1. Update personal information in the relevant data files
2. Replace images in the public directory
3. Modify the theme in the tailwind configuration
4. Update content in the MDX files

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Feel free to reach out to me at officialaritro204@gmail.com if you have any questions or feedback.

---

Built with ❤️ by Aritro Roy