export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
};

export type GetAllUsers = {
  getAllUsers: User[];
};
