export type AgentRegistrationRequestInput = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  businessName?: string;
  businessType?: string;
  yearsOfExperience?: string;
  preferredProductCategory?: string;
  preferredStoreLocation?: string;
  targetMarketRegion?: string;
  password: string;
  termsAccepted: true;
  policyAccepted: true;
};

export type AgentRegistrationRequestResponse = {
  id: string;
  fullName: string;
  email: string;
  status: "submitted" | "approved" | "rejected";
  createdAt?: string;
};
