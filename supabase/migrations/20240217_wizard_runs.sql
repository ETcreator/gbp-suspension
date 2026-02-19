create table if not exists public.wizard_runs (
  -- Primary key with auto-generated UUID
  id uuid primary key default gen_random_uuid(),
  
  -- Timestamps
  created_at timestamptz not null default now(),
  
  -- Version tracking
  spec_version text not null,
  rules_version text not null,
  
  -- JSON data
  answers jsonb not null,
  evaluation jsonb not null,
  
  -- Deterministic hash for result verification
  evaluation_hash text not null,
  
  -- Indexes
  constraint wizard_runs_evaluation_hash_idx unique (evaluation_hash)
);