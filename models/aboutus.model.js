const mongoose = require('mongoose');

const abooutUsSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the about us section
    required: true,
    default: "WHY ISOMATSOFT"
  },
  providers: {
    type: Array,
    default:["evolution.png"],
  },
  description: {
    type: String, // Description text for the about us section
    required: true,
    default: "Isomatsoft's premium approach empowers affiliates to stay focused on their core business while increasing profits via multiple long-term benefits of owning casino brands."
  },
  card_details: {
    type: [
      {
        icon: {
          type: String, // URL or name of the icon
          required: false,
        },
        title: {
          type: String, // Title of the card
          required: false,
        },
        description: {
          type: String, // Description of the card
          required: false,
        }
      }
    ],
    default: [
      {
        icon: "https://dainty-mandazi-b28226.netlify.app/assets/affiliateIcon-Bzmk6_4y.png", 
        title: "Affiliates First Solution", 
        description: "We built Extendy to meet affiliates’ major goal of owning online casinos - get maximum extra earnings from their traffic volumes with minimum investments."
      },
      {
        icon: "https://dainty-mandazi-b28226.netlify.app/assets/affiliateIcon-Bzmk6_4y.png", 
        title: "Affiliates First Solution", 
        description: "We built Extendy to meet affiliates’ major goal of owning online casinos - get maximum extra earnings from their traffic volumes with minimum investments."
      },
      {
        icon: "https://dainty-mandazi-b28226.netlify.app/assets/affiliateIcon-Bzmk6_4y.png", 
        title: "Affiliates First Solution", 
        description: "We built Extendy to meet affiliates’ major goal of owning online casinos - get maximum extra earnings from their traffic volumes with minimum investments."
      }
    ]
  }
});

const AboutUs = mongoose.model('AboutUs', abooutUsSchema);
module.exports = AboutUs;
