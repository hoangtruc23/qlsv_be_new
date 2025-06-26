import db from '../config/db';
import bcrypt from 'bcrypt';
import { LoginInput, RegisterInput, ChangePasswordInput } from '../types/auth.type';

export const getAllLogins = async () => {
    const [results] = await db.query('SELECT * FROM Login');
    return results;
};

export const checkLogin = async ({ username, password }: LoginInput) => {
    const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]) as any;
    const user = rows[0];
    if (!user) return { success: false, message: 'Tài khoản không tồn tại' };

    const match = await bcrypt.compare(password, user.password);
    if (!match) return { success: false, message: 'Mật khẩu không đúng' };

    delete user.password;
    return { success: true, message: 'Đăng nhập thành công', data: user };
};

export const registerUser = async ({ full_name, role, username }: RegisterInput) => {
    if (!full_name || !role) throw new Error('Vui lòng nhập đầy đủ họ tên và vai trò.');

    let finalUsername = username;
    let rawPassword = '';
    let card_id = '';
    const currentYear = new Date().getFullYear().toString().slice(-2);

    const generateRandomCode = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    if (role == 3) {
        const prefix = `SVIT${currentYear}`;
        let formattedNumber = '';
        let isUnique = false;

        while (!isUnique) {
            formattedNumber = generateRandomCode();
            finalUsername = `${prefix}${formattedNumber}`;
            const [check] = await db.query(`SELECT id FROM user WHERE username = ?`, [finalUsername]) as any;
            if (check.length === 0) isUnique = true;
        }

        card_id = formattedNumber;
        rawPassword = 'sinhvien123';
    } else if (role == 2) {
        if (!username) throw new Error('Vui lòng nhập tên đăng nhập cho giảng viên.');

        const [exists] = await db.query(`SELECT * FROM user WHERE username = ?`, [username]) as any;
        if (exists.length > 0) throw new Error('Tên đăng nhập đã tồn tại.');

        rawPassword = 'giaovien123';
    } else {
        throw new Error('Vai trò không hợp lệ.');
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    await db.query(
        `INSERT INTO user (full_name, card_id, username, password, role) VALUES (?, ?, ?, ?, ?)`,
        [full_name, card_id, finalUsername, hashedPassword, role]
    );

    return {
        success: true,
        message: 'Tạo tài khoản thành công',
        user: { full_name, username: finalUsername, role, default_password: rawPassword },
    };
};

export const changePassword = async ({ user_id, old_password, new_password }: ChangePasswordInput) => {
    if (!old_password || !new_password) throw new Error('Vui lòng nhập đầy đủ mật khẩu cũ và mới.');

    const [rows] = await db.query(`SELECT password FROM user WHERE id = ?`, [user_id]) as any;
    if (rows.length === 0) throw new Error('Người dùng không tồn tại.');

    const isMatch = await bcrypt.compare(old_password, rows[0].password);
    if (!isMatch) return { success: false, message: 'Mật khẩu cũ không chính xác.' };

    const newHashedPassword = await bcrypt.hash(new_password, 10);
    await db.query(`UPDATE user SET password = ? WHERE id = ?`, [newHashedPassword, user_id]);

    return { success: true, message: 'Đổi mật khẩu thành công.' };
};