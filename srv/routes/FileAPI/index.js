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

router.put(`/:id/publish`,
  async (req, res, next) => {
    try {
      const { body: { file, file: { pages } }, params: { id } } = req;

      for (const page of pages) {
        await PageService.update(page.id, page);
      }

      delete file.pages;
      delete file.organization;
      delete file.uploader;

      file.published = true;

      await FileService.update(id, file);
      const updatedFile = await FileService.getById(id);

      ResponseHandler(
        res,
        `Successfully Published File`,
        { file: updatedFile },
      );
    } catch (err) {
      next(err);
    }
  });

router.put(`/:id`,
  async (req, res, next) => {
    try {
      const { body: { file, file: { pages } }, params: { id } } = req;

      for (const page of pages) {
        await PageService.update(page.id, page);
      }

      delete file.pages;
      delete file.organization;
      delete file.uploader;

      await FileService.update(id, file);
      const updatedFile = await FileService.getById(id);

      ResponseHandler(
        res,
        `Successfully Saved File`,
        { file: updatedFile },
      );
    } catch (err) {
      next(err);
    }
  });

router.put(`/:id/unpublish`,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      await FileService.update(id, { published: false });
      const file = await FileService.getById(id);

      ResponseHandler(
        res,
        `Successfully Unpublished File`,
        { file },
      );
    } catch (err) {
      next(err);
    }
  });

router.delete(`/:id`,
  async (req, res, next) => {
    try {
      const { params: { id }, user } = req;

      await FileService.update(id, {
        deleted_by: user.id,
        deleted_on: new Date(),
      });

      ResponseHandler(
        res,
        `Successfully Deleted File`,
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
