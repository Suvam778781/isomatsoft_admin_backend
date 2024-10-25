const mongoose = require('mongoose')
const carauselSchema = new mongoose.Schema({
    logo: {
      type: String, // URL to the logo image
      required: true,
    },
    links: {
        name: {
          type: String, // Name of the link
          required: false,
        },
        link: {
          type: String, // URL of the link
          required: false,
        },
      },
    width: {
      type: String, // Width of the logo or image
      required: false,
    },
    image: {
      type: String, // URL of an additional image
      required: false,
    },
    description: {
      type: String, // Description of the site or section
      required: true,
    },
  });
  
  const Carausel = mongoose.model('carausel', carauselSchema);
  
module.exports = Carausel

//   {
//     "logo": "https://example.com/logo.png",
//     "links":{
//         "name": "Support",
//         "link": "/support"},
//     "width": "200px",
//     "image": "https://example.com/banner.jpg",
//     "description": "Our platform offers top-notch services with a user-friendly interface and 24/7 customer support."
//   }
  