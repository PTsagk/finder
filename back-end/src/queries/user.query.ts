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
