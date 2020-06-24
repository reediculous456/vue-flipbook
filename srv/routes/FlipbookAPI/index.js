import express from 'express';
import { ResponseHandler } from '../../utils';
import { FlipbookService } from '../../services';

export const router = express.Router();

router.get(`/:org_code/:url`,
  async (req, res, next) => {
    try {
      const { org_code, url } = req.params;
      const flipbook = await FlipbookService.get({ org_code, url });

      ResponseHandler(
        res,
        `Successfully Got Flipbook`,
        { flipbook },
      );
    } catch (err) {
      next(err);
    }
  });

export const path = `/api/flipbook`;
