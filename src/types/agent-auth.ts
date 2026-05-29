export type AgentLoginInput = {
  email: string;
  password: string;
};

export type AgentForgotPasswordInput = {
  email: string;
};

export type AgentResetPasswordInput = {
  email: string;
  token: string;
  password: string;
};

export type AgentAuthAccess = {
  token?: string;
  refresh?: string | null;
  expires?: string;
  expiresTimestamp?: number;
};

export type AgentAuthSession = {
  access?: AgentAuthAccess;
  agent?: unknown;
  user?: unknown;
  profile?: unknown;
};

export type AgentAuthMessageResponse = {
  email?: string;
  expires?: number;
};
