import express, { Request, Response } from 'express';
import { checkCountries } from '../utils/utils';

const router = express.Router();

router.post(['/', '/:country'], async (req: Request, res: Response) => {
  const country = req.params.country ?? '';
  const page = parseInt(req.query?.page as string);
  const limit = parseInt(req.query?.limit as string);

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  const dataCountry = await checkCountries(country);

  // const paginatedData = Object.entries(dataCountry).slice(startIndex, endIndex);

  const paginatedData = Object.entries(dataCountry);

  res.status(200).send({
    paginatedData,
    totalPages: Object.entries(dataCountry).length / limit,
    currentPage: page,
  });
});

export default router;
