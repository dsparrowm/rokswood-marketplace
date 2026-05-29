Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

build the backend checkout support data integration for the marketplace

Requirements:
- Load checkout support data from the backend public endpoints
- Use the backend currency options endpoint for currency-related checkout UI
- Use the backend bank lookup endpoint for local bank transfer selection
- Use the backend marketplace delivery-country allowlist for delivery availability UI
- Keep checkout support data cached through React Query
- Fall back gracefully when support data is temporarily unavailable

Implementation notes:
- Keep checkout form layout and validation local to the marketplace
- Only integrate the support data needed by the existing checkout experience
- Preserve the current design system tokens and checkout layout