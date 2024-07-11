import { User } from "../models/user.model";
import { sqlPool } from "../mysqlPool";

export async function getUserByIdQuery(id: number) {
  // @ts-ignore

  const [rows] = await sqlPool.query<User[]>(
    `CALL sp_GetUserById(?)
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
    `CALL sp_GetUserByUsernameAndPassword(?,?)
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
    `CALL sp_CreateUser(?,?,?)
       `,
    [user.email, user.username, user.password]
  );
  return row;
}
