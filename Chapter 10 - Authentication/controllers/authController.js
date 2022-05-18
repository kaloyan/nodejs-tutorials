const bcrypt = require("bcrypt");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  const foundUser = usersDB.users.find((x) => x.username === user);

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    //TODO - create JWTs
    return res.json({ success: `User: ${user} is logged in!` });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { handleLogin };
