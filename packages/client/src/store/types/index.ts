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

interface ICookie {
  cookie?: string;
}
interface ILogin {
  username: string;
  email: string;
}

interface IWinner {
  computerMove: number;
  winner: Winner;
}

export type { IStats, IMove, Winner, ICookie, ILogin, IWinner };
