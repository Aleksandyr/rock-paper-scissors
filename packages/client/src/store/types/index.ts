enum Winner {
  draw,
  win,
  loss
}

interface IMove {
  userMove: number;
}

interface IStats {
  wins: number;
  losses: number;
  draws: number;
}


interface ILoginUser {
  username: string;
  password: string;
}

interface IRegisterUser extends ILoginUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type { IRegisterUser, ILoginUser, IStats, IMove, Winner };
