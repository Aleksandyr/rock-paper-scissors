enum UserResult {
  draw,
  win,
  loss
}

interface IFight {
  result: UserResult;
}

interface IStats {
  wins?: number;
  losses?: number;
  draws?: number;
}
interface ILoginUserModel {
  username?: string;
  email?: string;
  stats?: IStats;
}
interface IRegisterUserModel extends ILoginUserModel {
  password?: string;
  confirmPassword?: string;
}

export type { IRegisterUserModel, ILoginUserModel, IStats, IFight, UserResult };
