import db from '../config/db';
import {
    AssignStudentInput,
    AssignTeacherInput,
    Class,
    CreateClassInput,
    Student,
    UpdateClassStatusInput,
    UpdateClassTeacherInput
} from '../types/class.type';

export const getAllClasses = async (): Promise<Class[]> => {
    const sql = `
    SELECT 
      c.id AS class_id,
      c.class_name,
      c.status,
      c.max_students,
      COUNT(sc.student_id) AS current_students,
      c.teacher_id,
      u.full_name AS teacher_name
    FROM 
      classes c
    LEFT JOIN 
      student_classes sc ON c.id = sc.class_id
    LEFT JOIN 
      user u ON c.teacher_id = u.id
    GROUP BY 
      c.id, c.class_name, c.status, c.max_students, c.teacher_id, u.full_name
  `;
    const [results] = await db.query(sql);
    return results as Class[];
};

export const postAssignClasses = async ({ subject_id, teacher_id }: AssignTeacherInput) => {
    const query = 'UPDATE classes SET teacher_id = ? WHERE id = ?;';
    const [results] = await db.query(query, [teacher_id, subject_id]);
    return results;
};

export const postNewClasses = async (input: CreateClassInput) => {
    const { subject_id, teacher_id, semester, max_students } = input;
    const [subjectResult] = await db.query('SELECT subject_name FROM subjects WHERE id = ?', [subject_id]);

    if (!Array.isArray(subjectResult) || subjectResult.length === 0) {
        throw new Error('Không tìm thấy môn học');
    }

    const subject_name = (subjectResult as any)[0].subject_name;
    const year = new Date().getFullYear();
    const class_name = `${subject_name} - HK${semester} - ${year}`;
    const status = 'active';

    const insertQuery = `
    INSERT INTO classes (class_name, subject_id, semester, year, teacher_id, status, max_students)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    const [insertResult] = await db.query(insertQuery, [
        class_name,
        subject_id,
        semester,
        year,
        teacher_id,
        status,
        max_students,
    ]);

    return insertResult;
};

export const postUpdateClassStatus = async ({ class_id, status }: UpdateClassStatusInput) => {
    const query = 'UPDATE classes SET status = ? WHERE id = ?;';
    const [results] = await db.query(query, [status, class_id]);
    return results;
};

export const postUpdateClassTeacher = async ({ class_id, teacher_id }: UpdateClassTeacherInput) => {
    const query = 'UPDATE classes SET teacher_id = ? WHERE id = ?;';
    const [results] = await db.query(query, [teacher_id, class_id]);
    return results;
};

export const assignStudentToClass = async ({ class_id, student_ids, }: {
    class_id: number; student_ids: number[];
}) => {
    if (!Array.isArray(student_ids)) {
        throw new Error('student_ids phải là một mảng.');
    }

    const [currentRows] = await db.query(
        'SELECT student_id FROM student_classes WHERE class_id = ?',
        [class_id]
    );

    const currentStudentIds = Array.isArray(currentRows)
        ? currentRows.map((row: any) => row.student_id)
        : [];

    const toAdd = student_ids.filter((id) => !currentStudentIds.includes(id));
    const toRemove = currentStudentIds.filter((id) => !student_ids.includes(id));

    for (const student_id of toAdd) {
        await db.query(
            'INSERT INTO student_classes (class_id, student_id) VALUES (?, ?)',
            [class_id, student_id]
        );
    }

    for (const student_id of toRemove) {
        await db.query(
            'DELETE FROM student_classes WHERE class_id = ? AND student_id = ?',
            [class_id, student_id]
        );
    }

    return { added: toAdd, removed: toRemove };
};

export const getStudentsInClass = async (class_id: number): Promise<Student[]> => {
    const sql = `
    SELECT u.id AS student_id, u.full_name, u.card_id
    FROM student_classes sc
    JOIN user u ON sc.student_id = u.id
    WHERE sc.class_id = ?
  `;
    const [students] = await db.query(sql, [class_id]);
    return students as Student[];
};

export const getStudentsByClass = async (class_id: number): Promise<Student[]> => {
    const sql = `
    SELECT s.id, s.full_name, s.card_id
    FROM user s
    JOIN student_classes cs ON s.id = cs.student_id
    WHERE cs.class_id = ?
  `;
    const [students] = await db.query(sql, [class_id]);
    return students as Student[];
};