import express from 'express';
import { ActiveDirectoryService } from '../../services';
import { ResponseHandler } from '../../utils';

export const router = express.Router();

router.get(`/search`, async (req, res, next) => {
  try {
    /**
     * if only 1 name passed, use it for the username and lastname
     *  2 names, then split first and last name.
     */
    const parsedName = req.params.searchTerm.split(` `);
    const [ username ] = parsedName;
    const firstName = parsedName[1] ? parsedName[0] : undefined;
    const lastName = parsedName[1] ? parsedName[1] : parsedName[0];

    const users = await ActiveDirectoryService.find({
      firstName,
      lastName,
      username,
    });

    ResponseHandler(
      res,
      `Successfully Searched for users!`,
      { users },
    );
  } catch (err) {
    next(err);
  }
});

export const path = `/api/active-directory`;
export const needsShield = true;
