const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client also delete accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  // check if refreshToken is in DB
  const foundUser = await User.findOne({ refreshToken }).exec();

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
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  //! debug
  // console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204); // No content
};

module.exports = { handleLogout };
