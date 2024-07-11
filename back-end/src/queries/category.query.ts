import { Category } from "../models/category.model";

export async function createNewCategoryQuery(category: Category) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `INSERT INTO category (name) VALUES (?)
         `,
    [category.name]
  );
  return row;
}

export async function updateNewCategoryQuery(category: Category) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `UPDATE category SET name = ? WHERE id = ?
           `,
    [category.name, category.id]
  );
  return row;
}

export async function deleteCategoryQuery(category: Category) {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `DELETE FROM category WHERE id = ?
             `,
    [category.id]
  );
  return row;
}

export async function getCategoriesQuery() {
  // @ts-ignore

  // const [row] = await sqlPool.query<IUser>(
  const [row] = await sqlPool.query<{ id: string }[]>(
    `SELECT * FROM category
               `,
    []
  );
  return row;
}
