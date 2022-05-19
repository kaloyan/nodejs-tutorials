const bcrypt = require("bcrypt");

const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  }

  // check for duplicate username in database
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate)
    return res
      .status(409)
      .json({ message: `Username: ${user} allready exist!` });

  // create new user
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store new user
    const retult = await User.create({
      username: user,
      password: hashedPwd,
    });

    return res.status(201).json({ success: `New user: ${user} created.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
