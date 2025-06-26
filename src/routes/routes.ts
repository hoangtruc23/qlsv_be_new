import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as subjectsController from '../controllers/subject.controller';
import * as userController from '../controllers/user.controller';
import * as classController from '../controllers/class.controller';
import * as gradesController from '../controllers/grade.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Đăng nhập và người dùng
 *   - name: Subjects
 *     description: Quản lý môn học
 *   - name: Students
 *     description: Quản lý học sinh và giáo viên
 *   - name: Classes
 *     description: Quản lý lớp học
 *   - name: Grades
 *     description: Quản lý điểm số
 */

// LOGIN
router.get('/login', authController.getAllLogins);

/**
 * @swagger
 * /api/login/check:
 *   post:
 *     summary: Kiểm tra thông tin đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công hoặc thất bại
 */
router.post('/login/check', authController.checkLogin);

/**
 * @swagger
 * /api/create_user:
 *   post:
 *     summary: Tạo tài khoản người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               role:
 *                 type: integer
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 */
router.post('/create_user', authController.registerUser);

/**
 * @swagger
 * /api/change_password:
 *   post:
 *     summary: Đổi mật khẩu người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 */
router.post('/change_password', authController.changePassword);

// SUBJECTS
/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Lấy danh sách tất cả môn học
 *     tags: [Subjects]
 */
router.get('/subjects', subjectsController.getAllSubjects);

/**
 * @swagger
 * /api/add_subject:
 *   post:
 *     summary: Thêm môn học mới
 *     tags: [Subjects]
 */
router.post('/add_subject', subjectsController.postNewSubject);

/**
 * @swagger
 * /api/assign_subject:
 *   post:
 *     summary: Gán giáo viên cho môn học
 *     tags: [Subjects]
 */
router.post('/assign_subject', subjectsController.assignTeacher);

/**
 * @swagger
 * /api/remove_subject/{subject_id}:
 *   get:
 *     summary: Xóa môn học
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: subject_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.get('/remove_subject/:subject_id', subjectsController.removeSubject);

/**
 * @swagger
 * /api/update_subject:
 *   post:
 *     summary: Cập nhật thông tin môn học
 *     tags: [Subjects]
 */
router.post('/update_subject', subjectsController.updateSubject);

// STUDENTS
/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Lấy danh sách sinh viên
 *     tags: [Students]
 */
router.get('/students', userController.getAllStudents);

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Lấy danh sách giáo viên
 *     tags: [Students]
 */
router.get('/teachers', userController.getAllTeachers);

// CLASSES
/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Lấy danh sách lớp học
 *     tags: [Classes]
 */
router.get('/classes', classController.getAllClasses);

/**
 * @swagger
 * /api/assign_class:
 *   get:
 *     summary: Gán lớp học (GET do định nghĩa ban đầu nhưng nên là POST)
 *     tags: [Classes]
 */
router.get('/assign_class', classController.postAssignClasses);

/**
 * @swagger
 * /api/add_class:
 *   post:
 *     summary: Thêm lớp học mới
 *     tags: [Classes]
 */
router.post('/add_class', classController.postNewClasses);

/**
 * @swagger
 * /api/assign_student_class:
 *   post:
 *     summary: Gán sinh viên vào lớp học
 *     tags: [Classes]
 */
router.post('/assign_student_class', classController.assignStudentToClass);

/**
 * @swagger
 * /api/student_class:
 *   post:
 *     summary: Lấy danh sách sinh viên trong lớp
 *     tags: [Classes]
 */
router.post('/student_class', classController.getStudentsInClass);

/**
 * @swagger
 * /api/classes/{class_id}:
 *   get:
 *     summary: Lấy sinh viên theo ID lớp học
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 */
router.get('/classes/:class_id', classController.getStudentsByClass);

/**
 * @swagger
 * /api/updateClassStatus:
 *   post:
 *     summary: Cập nhật trạng thái lớp học
 *     tags: [Classes]
 */
router.post('/updateClassStatus', classController.postUpdateClassStatus);

/**
 * @swagger
 * /api/updateClassTeacher:
 *   post:
 *     summary: Cập nhật giáo viên lớp học
 *     tags: [Classes]
 */
router.post('/updateClassTeacher', classController.postUpdateClassTeacher);

// GRADES
/**
 * @swagger
 * /api/grades/history/{student_class_id}:
 *   get:
 *     summary: Xem lịch sử điểm của sinh viên
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: student_class_id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/grades/history/:student_class_id', gradesController.getGradeHistory);

/**
 * @swagger
 * /api/update_grades:
 *   post:
 *     summary: Cập nhật điểm số
 *     tags: [Grades]
 */
router.post('/update_grades', gradesController.updateGrade);

export default router;