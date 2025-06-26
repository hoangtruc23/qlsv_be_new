import { Request, Response } from 'express';
import * as SubjectService from '../services/subject.services';

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await SubjectService.getAllSubjects();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách môn học' });
  }
};

export const postNewSubject = async (req: Request, res: Response) => {
  try {
    const result = await SubjectService.postNewSubject(req.body);
    res.status(201).json({ success: true, message: 'Thêm môn học thành công', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi thêm môn học' });
  }
};

export const assignTeacher = async (req: Request, res: Response) => {
  try {
    const result = await SubjectService.assignTeacher(req.body);
    res.status(201).json({ success: true, message: 'Cập nhật thành công', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi gán giáo viên' });
  }
};

export const removeSubject = async (req: Request, res: Response) => {
  try {
    const subject_id = Number(req.params.subject_id);
    const result = await SubjectService.removeSubject(subject_id);
    if (!result.success) {
      res.status(404).json({ data: result });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi gán giáo viên' });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const result = await SubjectService.updateSubject(req.body);
    if (!result.success) {
      res.status(404).json({ data: result });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi cập nhật môn học' });
  }
};