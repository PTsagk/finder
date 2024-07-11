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
  return rows[0];
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
  console.log(rows);
  //@ts-ignore
  return rows[0];
}

export async function createNewUser(user: User) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `INSERT INTO user (email, username, password, is_admin, address, phone) VALUES (?, ?, ?, ?, ?, ?)
       `,
    [user.email, user.name, user.password, 0, user.address]
  );
  console.log(row);
  return row;
}

export async function updateExistingUser(user: User) {
  // @ts-ignore

  const [row] = await sqlPool.query<User>(
    `UPDATE user SET username = ?, email = ?, password = ?, phone = ? WHERE id = ?
       `,
    [user.name, user.email, user.password, user.phone, user.id]
  );
  return row;
}
