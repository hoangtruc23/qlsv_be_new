## ⚙️ Setup Instructions

### 1. Clone the repo
git clone https://github.com/hoangtruc23/qlsv_be_new.git
cd QLSV_BE_New

### 2. Install NPM 
npm install

### 3. Configure environment

### 4. Import database
/Applications/MAMP/Library/bin/mysql57/bin/mysql -u root -proot -h 127.0.0.1 -P 8889 qlsv_db < .sql  

### 5. Run BE
nodemon src/app.ts

