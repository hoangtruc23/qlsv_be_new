import { Request, Response } from 'express';
import * as AuthService from '../services/auth.services';

export const getAllLogins = async (req: Request, res: Response) => {
    try {
        const results = await AuthService.getAllLogins();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

export const checkLogin = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.checkLogin(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.registerUser(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message || 'Lỗi khi tạo người dùng' });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.changePassword(req.body);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message || 'Lỗi khi đổi mật khẩu' });
    }
};