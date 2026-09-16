export interface SideProject {
  title: string;
  projLink: string;
  githubLink?: string;
  desc: string;
  descLink: string;
  slug: string;
  image: string | null;
  userCount: number | null;
  activelyWorking: boolean;
  deepDive?: {
    heading: string;
    body: string;
  };
}

export const sideProjects: SideProject[] = [
{
  title: 'Voice-Enabled RAG Pipeline with Measured Guardrails',
  projLink: 'http://ragingoa.duckdns.org/',
  githubLink: 'https://github.com/officialaritro/hhgoa-rag',
  desc: "A live voice-to-answer RAG service over a 99K-passage corpus (ElevenLabs STT -> FAISS -> cross-encoder rerank -> Claude) on AWS EC2, holding a P50 of 96ms against a 200ms budget. Cross-encoder reranking lifted recall@5 from 0.848 to 0.916, with per-sentence groundedness guards catching 100% of ungrounded answers at zero false refusals.",
  descLink: "/project/voice-rag-pipeline/",
  slug: "voice-rag-pipeline",
  image: null,
  userCount: null,
  activelyWorking: true,
  deepDive: {
    heading: "Why reranking, not chunking, was the real lever",
    body: "The obvious place to spend effort on a RAG pipeline is chunking - so that's where I started, benchmarking 8 chunking strategies against a 99K-passage corpus. None of them moved the needle. Retrieval quality was gated by ranking, not segmentation, so I ran BM25/RRF hybrid retrieval and cross-encoder reranking through the same benchmark harness, scoring every configuration with paired bootstrap 95% confidence intervals over 500 labelled queries instead of a single point estimate. Cross-encoder reranking was the one change that was statistically significant: recall@5 moved from 0.848 to 0.916. That result set the shape of the rest of the system - a lightweight first-pass retriever feeding a heavier reranker, with per-sentence groundedness guards on the output layer catching 100% of ungrounded answers at zero false refusals. The latency budget stayed intact throughout: removing a redundant re-embedding step cut that stage from 111ms to 12ms, holding the full retrieval-to-answer path to a P50 of 96ms against a 200ms budget.",
  },
},
{
  title: 'AgentTuring',
  projLink: 'https://github.com/officialaritro/mcp-math-agent',
  desc: "A FastAPI query router dispatching requests across Qdrant vector and structured data stores, with tool-use agentic workflows and async concurrency for multi-user workloads, improving semantic query accuracy 25% over a keyword baseline.",
  descLink: "/project/agentturing/",
  slug: "agentturing",
  image: "/projects/agentturing.png",
  userCount: null,
  activelyWorking: true
},
{
  title: 'Prospect Pilot - Cold Email Automation',
  projLink: 'https://github.com/officialaritro/prospect-pilot',
  desc: "An AI-powered cold email platform for automated outreach campaigns, with contact extraction, personalized templating, scheduling, and a response-tracking dashboard.",
  descLink: "/project/prospect-pilot/",
  slug: "prospect-pilot",
  image: null,
  userCount: null,
  activelyWorking: true
},
{
  title: 'OptiResume',
  projLink: 'https://optiresumeats.streamlit.app/',
  desc: "a cloud-native resume analysis tool with real-time PDF parsing and LLM integration.",
  descLink: "/project/optiresume/",
  slug: "optiresume",
  image: "/projects/optiresume.png",
  userCount: null,
  activelyWorking: true
},
{
  title: 'CourtScraper',
  projLink: 'https://github.com/officialaritro/CourtScraper',
  desc: "A Python scraper for extracting structured case data from public court records, built for reliable, repeatable data collection at scale.",
  descLink: "/project/courtscraper/",
  slug: "courtscraper",
  image: null,
  userCount: null,
  activelyWorking: true
}
];
