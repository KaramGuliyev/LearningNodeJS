import { Response, Request } from "express";
import Joi from "joi";
import db from "../db.js";

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200).json(planet)
};

const planetsSchema = Joi.object({
  name: Joi.string().required()
});

const createOne = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  const validateNewPlanet = planetsSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res.status(400).json({
      msg: validateNewPlanet.error.details[0].message,
    });
  } else {
    await db.none(
      `INSERT INTO planets (name) VALUES ($1)`,
      name
    );
    res.status(201).json({
      msg: "Planet created successfully!",
    });
  }
};

const updateOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [
    id,
    name,
  ]);
  res.status(201).json({
    msg: "Planet Updated successfully!",
  });
};

const deleteOneById = async (req: Request, res: Response) => {
  const { id } = req.params;

  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
  res.status(200).json({
    msg: "Planet deleted successfully!",
  });
};

const createImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fileName = req.file?.path;

  if (fileName) {
    db.none("UPDATE planets SET image=$2 WHERE id=$1;", [id, fileName]);

    res
      .status(201)
      .json({ msg: "Planet Image Uploaded Successfully" });
  } else {
    res.status(400).json({ msg: "Bad Request G" });
  }
};



export {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
  createImage,
};

// I already did that part for Ex-12, Everything tested works perfectly!
