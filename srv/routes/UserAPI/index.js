import express from 'express';
import { UserService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/list`, async (req, res, next) => {
  try {
    const users = await UserService.getList();

    ResponseHandler(
      res,
      `Got users list`,
      { users },
    );
  } catch (err) {
    next(err);
  }
});

router.get(`/list/admins`, async (req, res, next) => {
  try {
    const users = await UserService.getAdmins();

    ResponseHandler(
      res,
      `Got admin users list`,
      { users },
    );
  } catch (err) {
    next(err);
  }
});

export const path = `/api/user`;
export const needsShield = true;
