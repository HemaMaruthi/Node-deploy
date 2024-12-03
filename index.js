const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// console.log(mongoose)
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://hakeemmahesh100:W8AAJyo3M8O2J4qp@cluster0.sozig.mongodb.net/College?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((mongoose_connect) =>
    console.log("MongoDB is connected", mongoose_connect)
  );
console.log(process.env.MONGODB_URI, "URI");


const collegeStudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});

const collegeStudent = mongoose.model(
  "collegeStudentDetails",
  collegeStudentSchema
);

const newCollegeStudent = new collegeStudent({
  name: "Hema",
  age: 15,
  major: "Mongoose",
});
// newCollegeStudent.save()

// collegeStudent.updateOne({name:'Hema'},{age:25}).then(res=>console.log(res))
app.use(express.json());

app.get("/college-student", async (req, res) => {
  const student = await collegeStudent.find();
  res.json(student);
});
app.get("/college", async (req, res) => {

  res.json("college student data is coming");
});
app.post("/college-student/post", (req, res) => {
  console.log(req.body);
  const newStudent = new collegeStudent(req.body);
  newStudent.save();
  res.json(newStudent);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is starting on http://localhost:${PORT}`);
});
