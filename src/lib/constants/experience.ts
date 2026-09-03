export const experiences = [
  {
    title: 'Software Development Engineer',
    companyName: 'Whatbytes Technologies',
    workLocation: 'Remote',
    highlights: [
      'Architected a multi-tenant document intelligence platform for commercial real-estate leases on FastAPI — webhook-driven sync across Dropbox, Box, Google Drive and SharePoint (Nango, GCS) feeding a Vertex AI OCR and extraction pipeline that structures 100+ key points per lease into isolated Supabase schemas.',
      'Engineered a Stripe-backed billing engine in Django REST on manual-capture PaymentIntents, atomic rollback and row-level locking (select_for_update), eliminating double-spend and duplicate-redemption races across every purchase flow.',
      'Cut end-to-end ingestion latency 60% by parallelizing Celery async stages and reworking schema throughput.',
      'Designed Airbyte CDK ETL connectors (full and incremental syncs, 20+ SaaS entities) plus the Django REST backend for an AI red-teaming platform, with zero-code YAML tool registration and dependency-graph onboarding.',
      'Built a template-driven notification system covering 33 event types behind an admin-enforced variable allowlist, wiring cron-driven, time-offset triggers across bookings, wallets, referrals and payouts.',
    ],
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
    start: 'July, 2022',
    end: 'May, 2023',
  },
];
