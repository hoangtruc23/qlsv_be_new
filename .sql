-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS qlsv_db_new;

USE qlsv_db_new;

-- 
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `card_id` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `role` int DEFAULT NULL, -- 2: giảng viên, 3: sinh viên
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

--
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) DEFAULT NULL,
  `credit` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) NOT NULL,
  `subject_id` int NOT NULL,
  `semester` varchar(20) NOT NULL,
  `year` int NOT NULL,
  `teacher_id` int NOT NULL,
  `status` enum ('active', 'closed') DEFAULT 'active',
  `max_students` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `subject_id` (`subject_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 
CREATE TABLE `student_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `student_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_id` (`class_id`, `student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 
CREATE TABLE `grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_class_id` int NOT NULL,
  `process_score` float DEFAULT NULL,
  `midterm_score` float DEFAULT NULL,
  `final_score` float DEFAULT NULL,
  `score_avg` float GENERATED ALWAYS AS (
    ROUND(
      (
        (
          IFNULL (process_score, 0) + IFNULL (midterm_score, 0) + IFNULL (final_score, 0)
        ) / 3
      ),
      2
    )
  ) STORED,
  `updated_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `student_class_id` (`student_class_id`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`student_class_id`) REFERENCES `student_classes` (`id`),
  CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

COMMIT;

-- Giảng viên
INSERT INTO
  `user` (full_name, card_id, username, password, role)
VALUES
  (
    'Nguyễn Hoàng Anh',
    NULL,
    'teacher1',
    '$2b$10$yqG8GdXsbYbBOSMf3ULF2OwZlFgkPeN9Ir88h6GukpgEdDAc99nAa',
    2
  ), -- password: giaovien123
  (
    'Hoàng Văn Thắng',
    NULL,
    'teacher2',
    '$2b$10$yqG8GdXsbYbBOSMf3ULF2OwZlFgkPeN9Ir88h6GukpgEdDAc99nAa',
    2
  );

-- Sinh viên
INSERT INTO
  `user` (full_name, card_id, username, password, role)
VALUES
  (
    'Trần Thị Châu Giang',
    'SVIT2401',
    'SVIT2401',
    '$2b$10$qwrQ4TfqbDtyjdM3C5gF2OhUmpkx3KR8YkzX8E4Eo9vlgFg5t5U0e',
    3
  ), -- password: sinhvien123
  (
    'Lê Văn Dũng',
    'SVIT2402',
    'SVIT2402',
    '$2b$10$qwrQ4TfqbDtyjdM3C5gF2OhUmpkx3KR8YkzX8E4Eo9vlgFg5t5U0e',
    3
  );

-- Môn học
INSERT INTO
  `subjects` (subject_name, credit, teacher_id)
VALUES
  ('Lập trình Web', 3, 1),
  ('Cơ sở dữ liệu', 3, 2);

-- Lớp học
INSERT INTO
  `classes` (
    class_name,
    subject_id,
    semester,
    year,
    teacher_id,
    max_students
  )
VALUES
  ('Lập trình Web 01', 1, 'HK1', 2024, 1, 30),
  ('CSDL 01', 2, 'HK1', 2024, 2, 40);

-- Gán sinh viên vào lớp
INSERT INTO
  `student_classes` (class_id, student_id)
VALUES
  (1, 3), -- Trần Thị C vào Lập trình Web 01
  (2, 4);

-- Lê Văn D vào CSDL 01
-- Điểm
INSERT INTO
  `grades` (
    student_class_id,
    process_score,
    midterm_score,
    final_score,
    updated_by
  )
VALUES
  (1, 7.5, 8.0, 9.0, 1),
  (2, 6.5, 7.0, 8.0, 2);