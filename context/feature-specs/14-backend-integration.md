Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

Read the backend(rokswood-hive-backend-api)

You are a senior frontend engineer on allowed to work on the two frontends, the backend is only here for context.
occasionally, you can fetch latest updates from origin/staging branch and have it locally for context.

setup backend integration so subsequent requests to the backend will be using env variables, no hardcoded backend url
stores listed on the stores page should not be static, the number of stores available should come from the backend
the store cards will also render data from the backend, whatever is not gotten from the backend should remain static(it's intentional)