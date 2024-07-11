import { User } from "../models/user.model";
import { sqlPool } from "../mysqlPool";

export async function getUserByIdQuery(id: number) {
  // @ts-ignore

  const [rows] = await sqlPool.query<User[]>(
    `SELECT * FROM user WHERE id = ?
      `,
    [id]
  );
  // @ts-ignore
  return rows[0][0];
}

export async function getUserByUsernameAndPassword(
  username: string,
  password: string
) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `SELECT * FROM user WHERE username = ? AND password = ?
       `,
    [username, password]
  );
  //@ts-ignore
  return rows[0][0];
}

export async function createNewUser(user: User) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `INSERT INTO user (email, username, password) VALUES (?, ?, ?)
       `,
    [user.email, user.username, user.password]
  );
  return row;
}

export async function updateExistingUser(user: User) {
  // @ts-ignore

  const [row] = await sqlPool.query<User>(
    `UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?
       `,
    [user.username, user.email, user.password, user.id]
  );
  return row;
}
