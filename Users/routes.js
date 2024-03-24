import db from "../Database/index.js";

export default function Users(app) {
  app.get("/api/users", (req, res) => {
    res.send(db.users);
  });

  const register = (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find((user) => user.username === username);
    if (user) {
      res.send(400);
    } else {
      const newUser = { username, password, _id: Date.now().toString() };
      req.session["currentUser"] = newUser;
      db.users.push(newUser);
      res.send(newUser);
    }
  };
  const login = (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      req.session["currentUser"] = user;
      res.send(user);
    } else {
      res.send(401);
    }
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.send("User logged out");
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.send(401);
    }
  };
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
}