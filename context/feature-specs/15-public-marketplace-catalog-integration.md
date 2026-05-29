Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

build the backend-powered public catalog integration for the marketplace

Requirements:
- Hydrate the `/stores` directory from the backend public stores API
- Merge backend store data with local branding defaults for fields the API does not provide
- Hydrate store detail pages from backend store, category, and product payloads
- Hydrate individual product pages from backend product detail payloads
- Use React Query for server state, loading, caching, and refetch behavior
- Keep store and product pages functional with backend 404 and loading states
- Preserve the current marketplace visual language and responsive layout patterns

Implementation notes:
- Reuse the existing store and product presentational components
- Keep backend fetch logic out of leaf components
- Prefer typed data adapters for normalizing backend responses before rendering