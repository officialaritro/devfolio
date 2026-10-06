export const pathNames = {
  common: {
    '/contact': 'Contact',
    '/experience': 'Experience',
    '/now': 'Now',
    '/projects': 'Projects',
    '/uses': 'Uses',
  },
  projects: {
    'voice-rag-pipeline': 'Project | Voice-Enabled RAG Pipeline',
    'agentturing': 'Project | AgentTuring',
    'prospect-pilot': 'Project | Prospect Pilot',
    'optiresume': 'Project | OptiResume',
    'courtscraper': 'Project | CourtScraper',
  },
};


export const chatIdRegex = /\/chat\/[a-zA-Z0-9_-]+$/;

export const excludedPaths = [
  '/chat',
  '/admin',
  '/api',
];