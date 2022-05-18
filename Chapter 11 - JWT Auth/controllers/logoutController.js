const fs = require("fs");
const path = require("path");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = (req, res) => {
  // On client also delete accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  // check if refreshToken is in DB
  const foundUser = usersDB.users.find((x) => x.refreshToken === refreshToken);

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(204); // No content
  }

  // remove refreshToken from the DB
  const otherUsers = usersDB.users.filter(
    (u) => u.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };

  usersDB.setUsers([...otherUsers, currentUser]);
  fs.writeFileSync(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204); // No content
};

module.exports = { handleLogout };
