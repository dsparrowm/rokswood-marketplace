Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

build the backend marketplace order flow integration

Requirements:
- Connect the guest checkout flow to the backend guest order creation endpoint
- Use the backend payment initialization endpoint after a guest order is created
- Keep the cart, checkout summary, and payment method UI in the frontend
- Surface backend validation errors clearly in the checkout experience
- Support order creation for multi-item guest orders from a single store checkout session
- Preserve the current checkout confirmation and payment handoff flow

Implementation notes:
- Keep backend mutation logic in React Query hooks or dedicated service helpers
- Do not move checkout form state into the backend integration layer
- Keep the checkout experience responsive and premium on mobile