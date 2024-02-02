export type Referral = {
  id?: string;
  givenName?: string;
  surname?: string;
  phone?: string;
  email?: string;
  homeNameNumber?: string;
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

export type GetAllReferrals = {
  getAllReferrals: Referral[];
};
