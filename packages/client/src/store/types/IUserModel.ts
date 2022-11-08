interface ILoginUserModel {
  username?: string;
  email?: string; 
}
interface IRegisterUserModel extends ILoginUserModel {
  password?: string;
  confirmPassword?: string;
}


export type { IRegisterUserModel, ILoginUserModel };
