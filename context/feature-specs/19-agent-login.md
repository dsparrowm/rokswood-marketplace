Read `AGENTS.md` before starting

Read `context/progress-tracker.md`

read the backend(rokswood-hive-backend-api) for context

implement the agent login flow end to end
generate any missing UI and keep it simple
make sure the form is connected to the backend endpoint at: 
/agents/auth/login -- agent login
/agents/auth/forgot-password  -- initiate agent password reset
/agents/auth/reset-password -- reset agent password with token

(search the backend for schema structure to make sure the frontend is sending the right data)



success criteria:
Agent can login using the agent login form
agent can reset his password by clicking on forgot password and following the flow