export interface Class {
  id: number;
  class_name: string;
  subject_id: number;
  semester: number;
  year: number;
  teacher_id: number;
  status: string;
  max_students: number;
  current_students?: number;
  teacher_name?: string;
}

export interface CreateClassInput {
  subject_id: number;
  teacher_id: number;
  semester: number;
  max_students: number;
}

export interface AssignTeacherInput {
  subject_id: number;
  teacher_id: number;
}

export interface UpdateClassTeacherInput {
  class_id: number;
  teacher_id: number;
}

export interface UpdateClassStatusInput {
  class_id: number;
  status: string;
}

export interface AssignStudentInput {
  class_id: number;
  student_id: number;
}

export interface Student {
  id: number;
  full_name: string;
  card_id: string;
}