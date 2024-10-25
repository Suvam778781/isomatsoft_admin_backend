const mongoose = require("mongoose");
const footerSchema = new mongoose.Schema({
  social_media: [
    {
      link: {
        type: String, // URL of the link
        required: true,
      },
      icon: {
        type: String, // URL or name of the icon for the link
        required: false,
      },
    },
  ],
  links: [
    {
      name: {
        type: String, // Name of the link
        required: true,
      },
      link: {
        type: String, // URL of the link
        required: true,
      },
      icon: {
        type: String, // URL or name of the icon for the link
        required: false,
      },
    },
  ],
  rights: {
    type: String, // Text for the rights section
    default: "© 2024 Your Company. All rights reserved.",
  },
});

const Footer = mongoose.model("Footer", footerSchema);

module.exports = Footer;
//   {
//     "links": [
//       {
//         "name": "Privacy Policy",
//         "link": "/privacy-policy",
//         "icon": "https://example.com/icons/privacy.png"
//       },
//       {
//         "name": "Terms of Service",
//         "link": "/terms",
//         "icon": "https://example.com/icons/terms.png"
//       },
//       {
//         "name": "Contact Us",
//         "link": "/contact",
//         "icon": "https://example.com/icons/contact.png"
//       }
//     ]
//   }
