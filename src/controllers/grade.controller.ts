import { Request, Response } from 'express';
import * as gradeService from '../services/grade.services';
import { GradeUpdateInput } from '../types/grade.type';

export const updateGrade = async (req: Request, res: Response) => {
  const input: GradeUpdateInput = req.body;
  try {
    const result = await gradeService.updateGrade(input);
    res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getGradeHistory = async (req: Request, res: Response) => {
  const student_class_id = Number(req.params.student_class_id);

  try {
    const result = await gradeService.getGradeHistory(student_class_id);
    res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};