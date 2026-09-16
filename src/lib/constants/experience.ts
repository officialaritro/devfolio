export const experiences = [
  {
    title: 'Software Development Engineer',
    companyName: 'Whatbytes Technologies',
    workLocation: 'Remote',
    highlights: [
      'Architected a multi-tenant document intelligence platform for commercial real-estate leases on FastAPI — webhook-driven sync across Dropbox, Box, Google Drive and SharePoint (Nango, GCS) feeding a Vertex AI OCR and extraction pipeline that structures 100+ key points per lease into isolated Supabase schemas.',
      'Cut end-to-end ingestion latency 60% by parallelizing Celery async stages and optimising schema throughput.',
      'Designed Airbyte CDK ETL connectors (full and incremental syncs, 20+ SaaS entities) and a Django REST backend for an AI red-teaming platform, with zero-code YAML tool registration and dependency-graph onboarding.',
      'Uncovered and independently verified the production fix for an OAuth defect blocking Google Drive integration in a Rust (Axum, Tokio, SQLite) governance daemon with a Svelte dashboard.',
      'Engineered a Stripe-backed billing engine in Django REST on manual-capture PaymentIntents, atomic rollback and row-level locking (select_for_update), eliminating double-spend and duplicate-redemption races across every purchase flow.',
    ],
    stack: ['FastAPI', 'Vertex AI', 'Celery', 'Airbyte CDK', 'Rust', 'Stripe'],
    start: 'October, 2025',
    end: null,
  },
  {
    title: 'Backend Engineering Intern',
    companyName: 'UrbanRider Technologies',
    workLocation: 'Telangana, Hyderabad (Remote)',
    highlights: [
      'Resolved PostgreSQL query bottlenecks and REST API inefficiencies to cut application load latency 22%, restructuring indexing to hold performance under peak traffic.',
      'Removed manual release steps by automating validation, regression testing and CI/CD with Python, Docker and GitHub Actions, ending environment-parity bugs between staging and production.',
    ],
    stack: ['PostgreSQL', 'Docker', 'GitHub Actions'],
    start: 'July, 2022',
    end: 'May, 2023',
  },
];
