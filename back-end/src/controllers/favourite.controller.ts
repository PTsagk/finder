export const createFavourite = async (req: Request, res: Response) => {
  try {
    await createNewProductQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
