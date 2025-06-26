import { Request, Response } from 'express';
import * as classService from '../services/class.services';
import {
    AssignStudentInput,
    AssignTeacherInput,
    CreateClassInput,
    UpdateClassStatusInput,
    UpdateClassTeacherInput,
} from '../types/class.type';

export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await classService.getAllClasses();
        res.json(classes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const postAssignClasses = async (req: Request, res: Response) => {
    const input: AssignTeacherInput = req.body;
    try {
        const result = await classService.postAssignClasses(input);
        res.status(201).json({ success: true, message: 'Cập nhật thành công', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const postNewClasses = async (req: Request, res: Response) => {
    const input: CreateClassInput = req.body;
    try {
        const result = await classService.postNewClasses(input);
        res.status(201).json({ success: true, message: 'Thêm lớp học thành công', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const postUpdateClassStatus = async (req: Request, res: Response) => {
    const input: UpdateClassStatusInput = req.body;
    try {
        const result = await classService.postUpdateClassStatus(input);
        res.status(201).json({ success: true, message: 'Cập nhật thành công', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const postUpdateClassTeacher = async (req: Request, res: Response) => {
    const input: UpdateClassTeacherInput = req.body;
    try {
        const result = await classService.postUpdateClassTeacher(input);
        res.status(201).json({ success: true, message: 'Cập nhật thành công', data: result });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const assignStudentToClass = async (req: Request, res: Response) => {
    const input: { class_id: number; student_ids: number[] } = req.body;
    try {
        const result = await classService.assignStudentToClass(input);
        res.status(200).json({ success: true, message: 'Gán sinh viên vào lớp thành công', data: result });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStudentsInClass = async (req: Request, res: Response) => {
    const { class_id } = req.body;
    try {
        const students = await classService.getStudentsInClass(class_id);
        res.json({ success: true, message: 'Thành công', data: students });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getStudentsByClass = async (req: Request, res: Response) => {
    const class_id = Number(req.params.class_id);
    try {
        const students = await classService.getStudentsByClass(class_id);
        res.json({ success: true, data: students });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};