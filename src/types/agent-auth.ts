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

export type AgentAuthProfile = {
  id: string;
  fullName?: string;
  email?: string;
  status?: string;
  kycStatus?: string;
  agreementVerified?: boolean;
};

export type AgentAuthSession = {
  accessToken?: string;
  expiresAt?: string;
  access?: AgentAuthAccess;
  agent?: AgentAuthProfile;
  user?: unknown;
  profile?: unknown;
};

export type AgentAuthMessageResponse = {
  email?: string;
  expires?: number;
};
