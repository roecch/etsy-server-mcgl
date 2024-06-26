import db from "../Database/index.js";

export default function Users(app) {
  app.get("/api/users", (req, res) => {
    res.send(db.users);
  });

  const allUsers = (req,res) => {
    res.send(db.users)
  }

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
      req.session.save();
      res.send(user);
    } else {
      res.sendStatus(401);
    }
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.send("User logged out");
  };
  
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(currentUser)
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const profileother = (req, res) => {
    const id = req.params.userId;
    const user = db.users.find((user) => user._id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  const updateProfile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const { username, email } = req.body;
      currentUser.username = username;
      currentUser.email = email;
      res.send(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/profile/:userId", profileother);
  app.put("/api/users/profile", updateProfile);
  
  app.get("/api/allusers", allUsers);
}