import { Request, Response } from 'express';
import * as UserService from '../services/user.services';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await UserService.getAllUsersByRole(3);
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await UserService.getAllUsersByRole(2);
    res.json(teachers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};