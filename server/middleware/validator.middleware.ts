import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: AnySchema, where?: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(where ? req[where] : req.body, {
        abortEarly: false,
      });
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      res.status(400).json({ errors: err.errors }); // Send validation errors to the client
    }
  };

export default validateRequest;
