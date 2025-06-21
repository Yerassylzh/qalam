export interface UserInterestSection {
  id: number;
  icon: string;
  name: string;
}

export interface UserInterest {
  id: number;
  section: UserInterestSection;
  name: string;

  users?: User[];
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  // password is skipped
  isAdmin: boolean;
  interests?: UserInterest[];
}
