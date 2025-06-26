import db from '../config/db';
import { SubjectInput, AssignTeacherInput, UpdateSubjectInput } from '../types/subject.type';

export const getAllSubjects = async () => {
    const sql = `
    SELECT 
        s.id AS subject_id,
        s.subject_name,
        s.credit,
        s.teacher_id,
        u.full_name AS teacher_name
    FROM 
        subjects s
    LEFT JOIN 
        user u ON s.teacher_id = u.id
  `;

    const [results] = await db.query(sql);
    return results;
};

export const postNewSubject = async (input: SubjectInput) => {
    const { subject_name, credit } = input;

    const query = 'INSERT INTO subjects (subject_name, credit) VALUES (?, ?)';
    const [results] = await db.query(query, [subject_name, credit]);
    return results;
};

export const assignTeacher = async (input: AssignTeacherInput) => {
    const { teacher_id, subject_id } = input;

    const query = 'UPDATE subjects SET teacher_id = ? WHERE id = ?;';
    const [results] = await db.query(query, [teacher_id, subject_id]);
    return results;
};

export const removeSubject = async (subject_id: number) => {
    const [result] = await db.query('DELETE FROM subjects WHERE id = ?', [subject_id]);

    if ((result as any).affectedRows === 0) {
        return { success: false, message: 'Không tìm thấy môn học để xóa' };
    }

    return { success: true, message: 'Xóa môn học thành công' };
};

export const updateSubject = async (input: UpdateSubjectInput) => {
    const { subject_id, subject_name, credit } = input;

    const [result] = await db.query(
        'UPDATE subjects SET subject_name = ?, credit = ? WHERE id = ?',
        [subject_name, credit, subject_id]
    );

    if ((result as any).affectedRows === 0) {
        return { success: false, message: 'Không tìm thấy môn học để cập nhật' };
    }

    return { success: true, message: 'Cập nhật môn học thành công' };
};