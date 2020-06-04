import { parse } from 'path';
import express from 'express';
import appRoot from 'app-root-path';
import { ResponseHandler, Upload } from '../../utils';
import { FileService, PageService } from '../../services';

export const router = express.Router();

router.get(`/`,
  async (req, res, next) => {
    try {
      const files = await FileService.getList();

      ResponseHandler(
        res,
        `Successfully Got Files`,
        { files },
      );
    } catch (err) {
      next(err);
    }
  });

router.get(`/:id`,
  async (req, res, next) => {
    try {
      const file = await FileService.getById(req.params.id);

      ResponseHandler(
        res,
        `Successfully Got File`,
        { file },
      );
    } catch (err) {
      next(err);
    }
  });

router.post(`/`,
  Upload.single(`file`),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line no-empty-pattern
      const { file: { filename, mimetype, originalname, path: filepath, size }, params: { }, user } = req;

      const file = await FileService.create({
        file_size: size,
        localname: filename,
        mime_type: mimetype,
        name: parse(originalname).name,
        uploaded_by: user.id,
        uploaded_on: new Date(),
      });

      await PageService.bulkCreate(`${appRoot}/${filepath}`, file.id);

      ResponseHandler(
        res,
        `Successfully Created File`,
        { file },
      );
    } catch (err) {
      next(err);
    }
  });

export const path = `/api/file`;
export const needsShield = true;
