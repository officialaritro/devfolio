export const pathNames = {
  common: {
    '/contact': 'Contact',
    '/experience': 'Experience',
  },
  projects: {
    'agentturing': 'Project | AgentTuring',
    'cirrhosis-stage-prediction': 'Project | Cirrhosis Stage Prediction',
    'automailer-cold-emailing-automation': 'Project | Automailer - Cold Emailing Automation',
    'optiresume': 'Project | OptiResume',
    'devfolio': 'Project | Devfolio',
    'bitbybit': 'Project | BitByBit',
  },
};


export const chatIdRegex = /\/chat\/[a-zA-Z0-9_-]+$/;

export const excludedPaths = [
  '/chat',
  '/admin',
  '/api',
];