import {
  IBrandCreate,
  IBrandDelete,
  IBrandUpdate,
} from "../interfaces/brand.interface";
import { sqlPool } from "../mysqlPool";

export async function createNewBrandQuery(brand: IBrandCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `CREATE brand (name) VALUES (?) `,

    [brand.name]
  );
  //@ts-ignore
  return rows[0];
}

export async function updateBrandQuery(brand: IBrandUpdate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `UPDATE brand SET name = ? WHERE id = ?`,

    [brand.name, brand.id]
  );
  //@ts-ignore
  return rows[0];
}

export async function getBrandsQuery() {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `SELECT * FROM brand`,

    []
  );
  //@ts-ignore
  return rows[0];
}

export async function deleteBrandByIdQuery(brand: IBrandDelete) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `DELETE FROM brand WHERE id = ?`,

    [brand.id]
  );
  //@ts-ignore
  return rows[0];
}
