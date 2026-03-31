export interface ILoginResponse {
    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        needPasswordChange : boolean;
        email : string;
        name : string;
        role : string;
        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "STUDENT" | "ADMIN" | "USER"; // আপনার এনাম অনুযায়ী পরিবর্তন করতে পারেন
  status: "ACTIVE" | "INACTIVE";
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IStudent {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string | null;
  address: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: IUser;
    student: IStudent;
  };
}