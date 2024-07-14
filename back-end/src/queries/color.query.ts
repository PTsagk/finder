import {
  IColorCreate,
  IColorUpdate,
  IColorDelete,
} from "../interfaces/color.interface";
import { sqlPool } from "../mysqlPool";

export async function createNewColorQuery(color: IColorCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `INSERT INTO color (name) VALUES (?) `,

    [color.name]
  );
}

export async function updateColorQuery(color: IColorUpdate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `UPDATE color SET name = ? WHERE id = ?`,

    [color.name, color.id]
  );
  //@ts-ignore
  return rows[0];
}

export async function getColorsQuery() {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `SELECT * FROM color LIMIT 1000`,

    []
  );
  //@ts-ignore
  return rows;
}

export async function deleteColorByIdQuery(color: IColorDelete) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `DELETE FROM color WHERE id = ?`,

    [color.id]
  );
  //@ts-ignore
  return rows[0];
}
