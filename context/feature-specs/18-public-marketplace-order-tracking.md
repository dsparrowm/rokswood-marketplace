Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

build the backend marketplace order tracking integration

Requirements:
- Connect the track-order page to the backend public order lookup endpoint
- Display backend order state, shipment status, and timeline data in the existing tracking UI
- Keep the lookup form lightweight and simple
- Show clear loading, empty, and not-found states
- Preserve the current mobile-first single-column tracking layout

Implementation notes:
- Use React Query for the public order lookup request
- Keep the result display component reusable and typed
- Avoid adding extra checkout or auth complexity to the tracking flow