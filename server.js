// server.js — Student REST API using Express (Lab 07, Part D)

const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware: parse incoming JSON request bodies
app.use(express.json());

const DATA_FILE = "students.json";

// Load students from file at startup
let students = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// ─── Helper: persist the in-memory array back to students.json ───────────────
function saveStudents() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf8");
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// GET /students — retrieve all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// Task 3 / Section 22 — Filter by department  ← MUST come BEFORE /students/:id
app.get("/students/department/:department", (req, res) => {
  const department = req.params.department.toLowerCase();
  const result = students.filter(
    item => item.department.toLowerCase() === department
  );
  return res.status(200).json(result);
});

// GET /students/:id — retrieve one student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(item => item.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  return res.status(200).json(student);
});

// POST /students — create a student
app.post("/students", (req, res) => {
  const { name, department } = req.body;

  // Task 4 — Input validation
  if (
    typeof name !== "string" || !name.trim() ||
    typeof department !== "string" || !department.trim()
  ) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings"
    });
  }

  const newId = students.length
    ? Math.max(...students.map(item => item.id)) + 1
    : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    department: department.trim()
  };

  students.push(newStudent);
  saveStudents();                        // Part F — persist to file
  return res.status(201).json(newStudent);
});

// PUT /students/:id — update a student's name and department
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(item => item.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, department } = req.body;

  // Task 4 — Input validation
  if (
    typeof name !== "string" || !name.trim() ||
    typeof department !== "string" || !department.trim()
  ) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings"
    });
  }

  student.name = name.trim();
  student.department = department.trim();
  saveStudents();                        // Part F — persist to file
  return res.status(200).json(student);
});

// DELETE /students/:id — remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const [deletedStudent] = students.splice(index, 1);
  saveStudents();                        // Part F — persist to file
  return res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  START
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
