export interface LoginInput {
    username: string;
    password: string;
}

export interface RegisterInput {
    full_name: string;
    username?: string;
    role: number;
}

export interface ChangePasswordInput {
    user_id: number;
    old_password: string;
    new_password: string;
}