const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  // check for duplicate username in database
  const duplicate = usersDB.users.find((x) => x.username === user);
  if (duplicate)
    return res
      .status(409)
      .json({ message: `Username: ${user} allready exist!` });

  // create new user
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store new user
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: {
        User: 2001,
      },
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    fs.writeFileSync(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    return res.status(201).json({ success: `New user: ${user} created.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
