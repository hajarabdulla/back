const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let users = [
  { id: 0, name: "Hajar", age: 21 },
  { id: 1, name: "Nigar", age: 19 },
];

let idCounter = 2;

//! Get all users
app.get("/users", (req, res) => {
  res.json({
    success: true,
    quantity: users.length,
    data: users,
  });
});

//! Get user by id
app.get("/users/:id/:name?", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user)
    return res.json({
      success: false,
    });

  res.json({
    success: true,
    data: user,
  });
});

//! Add user
app.post("/users", (req, res) => {
  //   const id = uuidv4();

  const newUser = { ...req.body, id: idCounter++ };
  users = [...users, newUser];

  res.json({
    success: true,
    data: users,
  });
});

//! Delete user
app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  users = users.filter((q) => q.id !== id);

  res.json({
    success: true,
    data: users,
  });
});

app.put("/users/:id", (req, res) => {
  const id = +req.params.id;
  users = users.filter((elem) => elem.id !== id);

  const updatedUser = {
    id: +req.params.id,
    name: req.body.name,
    age: req.body.age,
  };

  users.push(updatedUser);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on the Port: ${PORT}`);
});
