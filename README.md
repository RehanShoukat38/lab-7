# 🧪 Lab 07 — Node.js Modules & REST API with Express

A modular Node.js lab project demonstrating CommonJS modules, file-system persistence, and a full CRUD REST API built with Express.js.

---

## 📁 Project Structure

```
Lab7/
├── app.js            # Entry point — demonstrates the calculator module
├── calculator.js     # Reusable calculator module (add, subtract, multiply, divide)
├── employees.js      # File-system demo — reads & updates employees.json
├── server.js         # Express REST API server for Student management
├── students.json     # Persistent data store for students
├── employees.json    # Persistent data store for employees
├── books.json        # Sample books data
├── package.json      # Project metadata & dependencies
└── postman/          # Postman collections & environments for API testing
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/RehanShoukat700/Lab-7.git
cd Lab-7
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the calculator demo
```bash
node app.js
```

**Expected output:**
```
Addition:       15
Subtraction:    5
Multiplication: 50
Division:       2
```

### 4. Start the REST API server
```bash
npm start
# OR
node server.js
```
Server listens on **http://localhost:3000**

---

## 🧮 Part A — Calculator Module (`calculator.js`)

A reusable CommonJS module exporting four arithmetic functions:

| Function | Description | Example |
|---|---|---|
| `add(a, b)` | Returns `a + b` | `add(10, 5)` → `15` |
| `subtract(a, b)` | Returns `a - b` | `subtract(10, 5)` → `5` |
| `multiply(a, b)` | Returns `a * b` | `multiply(10, 5)` → `50` |
| `divide(a, b)` | Returns `a / b` (throws on `b === 0`) | `divide(10, 5)` → `2` |

---

## 📂 Part B — File System Module (`employees.js`)

Demonstrates Node.js built-in `fs` module to:
- Read `employees.json` synchronously at startup
- Log existing employees
- Append a new employee record and persist the changes back to disk

---

## 🌐 Part C & D — Student REST API (`server.js`)

A full **CRUD REST API** powered by **Express.js** with JSON file persistence.

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/students` | Get all students |
| `GET` | `/students/:id` | Get a student by ID |
| `GET` | `/students/department/:dept` | Filter students by department |
| `POST` | `/students` | Create a new student |
| `PUT` | `/students/:id` | Update an existing student |
| `DELETE` | `/students/:id` | Delete a student |

---

### 🔍 API Examples

#### Get all students
```http
GET http://localhost:3000/students
```
```json
[
  { "id": 1, "name": "Ali",   "department": "BSCS" },
  { "id": 2, "name": "Ahmed", "department": "BSIT" },
  { "id": 3, "name": "Sara",  "department": "BSCS" }
]
```

#### Get student by ID
```http
GET http://localhost:3000/students/1
```
```json
{ "id": 1, "name": "Ali", "department": "BSCS" }
```

#### Filter by department
```http
GET http://localhost:3000/students/department/BSCS
```
```json
[
  { "id": 1, "name": "Ali",  "department": "BSCS" },
  { "id": 3, "name": "Sara", "department": "BSCS" }
]
```

#### Create a student
```http
POST http://localhost:3000/students
Content-Type: application/json

{
  "name": "Rehan",
  "department": "BSCS"
}
```
```json
{ "id": 4, "name": "Rehan", "department": "BSCS" }
```

#### Update a student
```http
PUT http://localhost:3000/students/4
Content-Type: application/json

{
  "name": "Rehan Shoukat",
  "department": "BSSE"
}
```
```json
{ "id": 4, "name": "Rehan Shoukat", "department": "BSSE" }
```

#### Delete a student
```http
DELETE http://localhost:3000/students/4
```
```json
{
  "message": "Student deleted successfully",
  "student": { "id": 4, "name": "Rehan Shoukat", "department": "BSSE" }
}
```

---

## ✅ Input Validation

The `POST` and `PUT` endpoints validate that:
- `name` is a **non-empty string**
- `department` is a **non-empty string**

**Error response (400 Bad Request):**
```json
{ "message": "name and department are required as non-empty strings" }
```

---

## 💾 Data Persistence

All student create, update, and delete operations are **automatically persisted** to `students.json`, so data survives server restarts.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js v5 | HTTP server & routing |
| `fs` module | File-system read/write |
| Postman | API testing |

---

## 📬 Postman Collection

Import the collection from the `postman/` directory into Postman to quickly test all API endpoints with pre-configured requests.

---

## 👤 Author

**Rehan Shoukat**  
GitHub: [@RehanShoukat700](https://github.com/RehanShoukat700)
