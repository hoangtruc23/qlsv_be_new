## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/hoangtruc23/qlsv_be_new.git
cd QLSV_BE_New
```

### 2. Install NPM

```bash
npm install
```

### 3. Configure environment

### 4. Import database

Version MacOS: (Dùng MAMP) /Applications/MAMP/Library/bin/mysql57/bin/mysql -u root -proot -h 127.0.0.1 -P 8889 qlsv_db < .sql
	•	-u root: tên username của MySQL
	•	-proot: dùng mật khẩu root
	•	-h 127.0.0.1: địa chỉ IP localhost
	•	-P 3306: port mặc định của MySQL (có thể đổi thành PORT khách nếu db trỏ vào PORT khác, ví dụ: 8889)
    •	qlsv_db: tên của database
	•	.sql: đường dẫn đến file .sql đã push lên GitHub
    
### 5. Run BE

```bash
nodemon src/app.ts
```
