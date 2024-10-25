const mongoose = require('mongoose')
const headerSchema = new mongoose.Schema({
    logo: {
      type: String, // URL to the logo image
      default:"images/logo.png"
    },
    favicon: {
        type: String, // URL to the logo image
        default:"images/favicon"
      },
    links: [
      {
        name: {
          type: String, // Name of the link
          default:"White Label"
        },
        link: {
          type: String, // URL of the link
          default:"/whitelabel"
        },
        button_text: {
          type: String, // Text for buttons in the header (if applicable)
          default:"White Label"
        },
      },
    ],
  });
  
  const Header = mongoose.model('Header', headerSchema);
  
  module.exports =Header
  