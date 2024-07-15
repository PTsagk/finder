import {
  ISizeCreate,
  ISizeDelete,
  ISizeUpdate,
} from "../interfaces/size.inteface";
import { sqlPool } from "../mysqlPool";

export async function createNewSizeQuery(size: ISizeCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `INSERT INTO size (name) VALUES (?) `,

    [size.name]
  );
  const [newSize] = await sqlPool.query(
    "SELECT * FROM size WHERE id = LAST_INSERT_ID()"
  );
  //@ts-ignore
  return newSize[0];
}

export async function updateSizeQuery(size: ISizeUpdate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `UPDATE size SET name = ? WHERE id = ?`,

    [size.name, size.id]
  );
  //@ts-ignore
  return rows[0];
}

export async function getSizesQuery() {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `SELECT * FROM size LIMIT 1000`,

    []
  );
  //@ts-ignore
  return rows;
}

export async function deleteSizeByIdQuery(size: ISizeDelete) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `DELETE FROM size WHERE id = ?`,

    [size.id]
  );
  //@ts-ignore
  return rows[0];
}
