import { parse } from 'path';
import express from 'express';
import { ResponseHandler, Upload } from '../../utils';
import { FileService } from '../../services';

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

router.post(`/`,
  Upload.single(`file`),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line no-empty-pattern
      const { file: { filename, mimetype, originalname, size }, params: { }, user } = req;
      await FileService.create({
        file_size: size,
        localname: filename,
        mime_type: mimetype,
        name: parse(originalname).name,
        uploaded_by: user.id,
        uploaded_on: new Date(),
      });

      ResponseHandler(
        res,
        `Successfully Created File`,
      );
    } catch (err) {
      next(err);
    }
  });

export const path = `/api/file`;
export const needsShield = true;
