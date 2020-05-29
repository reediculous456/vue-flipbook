import express from 'express';
import arrify from 'arrify';
import { RoleService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/codes`, async (req, res, next) => {
  try {
    const roles = await RoleService.getByCodes(arrify(req.query.codes));

    ResponseHandler(
      res,
      `Got roles`,
      { roles },
    );
  } catch (err) {
    next(err);
  }
});

export const path = `/api/role`;
export const needsShield = true;
