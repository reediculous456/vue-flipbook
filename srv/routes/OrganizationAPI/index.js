import express from 'express';
import arrify from 'arrify';
import { OrganizationService, UserService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/`, async (req, res, next) => {
  try {
    let organizations;

    if (req.user.role.code === `ADMIN`) {
      organizations = await OrganizationService.getList();
    }
    else {
      [{ organizations }] = await UserService.getByIds(arrify(req.user.id));
    }

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
