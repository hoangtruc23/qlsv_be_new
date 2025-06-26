import db from '../config/db';
import { GradeUpdateInput, GradeHistory } from '../types/grade.type';

export const updateGrade = async (input: GradeUpdateInput) => {
  const { student_class_id, process_score, midterm_score, final_score, updated_by } = input;

  const [rows] = await db.query(
    `SELECT process_score, midterm_score, final_score FROM grades WHERE student_class_id = ?`,
    [student_class_id]
  );

  const existing = (Array.isArray(rows) && rows.length > 0 ? rows[0] : {}) as {
    process_score?: number;
    midterm_score?: number;
    final_score?: number;
  };

  const process = process_score ?? existing.process_score;
  const midterm = midterm_score ?? existing.midterm_score;
  const final = final_score ?? existing.final_score;

  let score_avg: string | null = null;
  if (process !== undefined && midterm !== undefined && final !== undefined) {
    score_avg = ((process * 0.2) + (midterm * 0.3) + (final * 0.5)).toFixed(2);
  }

  if (Array.isArray(rows) && rows.length > 0) {
    await db.query(
      `UPDATE grades SET
        process_score = ?, midterm_score = ?, final_score = ?, score_avg = ?, updated_by = ?
        WHERE student_class_id = ?`,
      [process, midterm, final, score_avg, updated_by, student_class_id]
    );
  } else {
    await db.query(
      `INSERT INTO grades (student_class_id, process_score, midterm_score, final_score, score_avg, updated_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
      [student_class_id, process_score ?? null, midterm_score ?? null, final_score ?? null, score_avg, updated_by]
    );
  }

  return { success: true, message: 'Cập nhật điểm thành công' };
};

export const getGradeHistory = async (student_class_id: number): Promise<GradeHistory[]> => {
  const sql = `
    SELECT 
      g.process_score, 
      g.midterm_score, 
      g.final_score, 
      g.score_avg, 
      g.updated_by,
      g.updated_at,
      u.full_name AS updated_by_name
    FROM grades g
    LEFT JOIN user u ON g.updated_by = u.id
    WHERE g.student_class_id = ?
  `;

  const [rows] = await db.query(sql, [student_class_id]);
  return rows as GradeHistory[];
};