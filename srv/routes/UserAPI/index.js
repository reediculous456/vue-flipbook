import express from 'express';
import { ActiveDirectoryService, UserService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/whoami`, (req, res, next) => {
  try {
    ResponseHandler(
      res,
      `Got logged in user`,
      { user: req.user },
    );
  } catch (err) {
    next(err);
  }
});

router.get(`/`, async (req, res, next) => {
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

router.get(`/org/:organization_id`, async (req, res, next) => {
  try {
    const users = await UserService.getByOrganization(req.params.organization_id);

    ResponseHandler(
      res,
      `Got users list`,
      { users },
    );
  } catch (err) {
    next(err);
  }
});

router.get(`/role/:role_id`, async (req, res, next) => {
  try {
    const users = await UserService.getByRole(req.params.role_id);

    ResponseHandler(
      res,
      `Got users list`,
      { users },
    );
  } catch (err) {
    next(err);
  }
});

router.post(`/assign`, async (req, res, next) => {
  try {
    const { organization_id, role_id, username } = req.body;
    let user = await UserService.getByUsername({ activeOnly: false, require: false, username });

    if (!user) {
      const [ adUser ] = await ActiveDirectoryService.find({ username });
      user = await UserService.create({
        role_id,
        ...adUser,
      });
    }

    await UserService.assign({
      id: user.id,
      organization_id,
      role_id,
    });

    ResponseHandler(
      res,
      `Assigned User`,
      { user },
    );
  } catch (err) {
    next(err);
  }
});

router.post(`/deassign`, async (req, res, next) => {
  try {
    const { organization_id, user_id } = req.body;

    await UserService.deassign({
      id: user_id,
      organization_id,
    });

    ResponseHandler(
      res,
      `Dessigned User`,
    );
  } catch (err) {
    next(err);
  }
});

export const path = `/api/user`;
export const needsShield = true;
