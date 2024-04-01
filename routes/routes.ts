import express, { Request, Response } from 'express';
import { checkCountries } from '../utils/utils';

const router = express.Router();

router.post(['/', '/:country'], async (req: Request, res: Response) => {
  const country = req.params.country ?? '';
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.page ? parseInt(req.query.limit as string) : 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const dataCountry = await checkCountries(country);

  const paginatedData = Object.entries(dataCountry).slice(startIndex, endIndex);

  res.status(200).send({
    paginatedData,
  });
});

export default router;
