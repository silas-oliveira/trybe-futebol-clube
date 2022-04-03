export type User = {
  id: number;
  username: string;
  password?: string;
  role: string;
  email: string;
};

export type Indexable = {
  id: number;
};

export type loginInfo = {
  email: string;
  password: string;
};

export type ILeaderBoard = {
  name: any;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number | void | any;
}

// export type Entity = Indexable & {
//   createdAt: Date
//   updatedAt?: Date
// }

// export type User = Entity & {
//   displayName: string
//   email: string
//   password: string,
//   photoURL?: string
// }

// export type AddUser = Omit<User, keyof Entity>

// export type EditUser = Partial<Omit<User, keyof Entity>>

export type UserWithoutPassword = Omit<User, "password">;
