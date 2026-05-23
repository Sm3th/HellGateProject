const express = require("express");
const router = express.Router();

const tickets = [
  {
    id: 1,
    name: "Early Bird",
    price: "25€",
    description: "Limited discounted tickets for early buyers!",
    available: true,
  },
  {
    id: 2,
    name: "Regular",
    price: "40€",
    description: "Standard ticket for the rave.",
    available: true,
  },
  {
    id: 3,
    name: "VIP",
    price: "70€",
    description: "Includes backstage access + 1 free drink.",
    available: false,
  },
];

router.get("/", (req, res) => {
  res.json(tickets);
});

module.exports = router;
