export interface SubjectInput {
    subject_name: string;
    credit: number;
}

export interface AssignTeacherInput {
    subject_id: number;
    teacher_id: number;
}

export interface UpdateSubjectInput {
    subject_id: number;
    subject_name: string;
    credit: number;
}