const express = require("express");
const router = express.Router();
const Screen = require("../models/screenSchema");

router.get("/", (req, res) => {
  res.status(200).json({ message: "HomePage" });
});

router.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, email, customMessage } = req.body;
    const newScreen = new Screen({
      firstName,
      lastName,
      email,
      customMessage,
    });

    await newScreen.save();
    console.log("New screen created:", newScreen);
    return res.status(201).json({ message: "New screen created!", screen: newScreen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create screen" });
  }
});




router.get("/user/active", async (req, res) => {
  try {
    const activeUsers = await Screen.find({status:"active"});
    res.json( activeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


router.get("/user/inactive", async (req, res) => {
  try {
    const inactiveUsers = await Screen.find({status:"inactive"});
    res.json( inactiveUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


router.get("/ret", async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json({ screens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});



router.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    const updatedUser = await Screen.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (updatedUser) {
      console.log("User status updated:", updatedUser);
      res.status(200).json({ message: "User status updated!", user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user status" });
  }
});


module.exports = router;
