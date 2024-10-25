const mongoose = require("mongoose");
const heroSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the hero section
    default: "The Ultimate Turnkey Casino Platform",
  },
  description: {
    type: String, // Subtitle of the hero section
    default:
      "Get yourself a Turnkey online casino based on the Isomatsoft proprietary platform",
  },
  button_text: {
    type: String, // Text for the button in the hero section
  },
  image: {
    type: String, // Text for the button in the hero section
    default:"https://dainty-mandazi-b28226.netlify.app/assets/heroSection-B1lKQWAH.webp"
  },
  countdown_numbers: {
    type: Array,
    default: [
      {
        key: "Integrated Games",
        value: 500,
      },
      {
        key: "Game Providers",
        value: 500,
      },
      {
        key: "Payment Solution",
        value: 500,
      },
      {
        key: "Turnkey",
        value: 12,
      },
    ],
  },
});

const HeroSection = mongoose.model("HeroSection", heroSchema);

module.exports = HeroSection;
