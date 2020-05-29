import express from 'express';
import { OrganizationService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/`, async (req, res, next) => {
  try {
    const organizations = await OrganizationService.getList();

    ResponseHandler(
      res,
      `Got organizations list`,
      { organizations },
    );
  } catch (err) {
    next(err);
  }
});

export const path = `/api/organization`;
export const needsShield = true;
