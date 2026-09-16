export const impactStats = [
  { value: '60%', label: 'faster document ingestion after parallelizing Celery stages' },
  { value: '96ms', label: 'P50 latency for the RAG pipeline, against a 200ms budget' },
  { value: '25%', label: 'higher semantic query accuracy over a keyword baseline' },
  { value: '0.848 -> 0.916', label: 'recall@5 after adding cross-encoder reranking' },
  { value: '22%', label: 'cut in application load latency from index restructuring' },
];
