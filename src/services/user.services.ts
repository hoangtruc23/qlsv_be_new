import db from '../config/db';

export const getAllUsersByRole = async (role: number) => {
  const [rows] = await db.query('SELECT * FROM user WHERE role = ?', [role]);
  return rows;
};