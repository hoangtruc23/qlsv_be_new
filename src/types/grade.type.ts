export interface GradeUpdateInput {
  student_class_id: number;
  process_score?: number;
  midterm_score?: number;
  final_score?: number;
  updated_by: number;
}

export interface GradeHistory {
  process_score: number | null;
  midterm_score: number | null;
  final_score: number | null;
  score_avg: string | null;
  updated_by: number;
  updated_at: string;
  updated_by_name: string;
}