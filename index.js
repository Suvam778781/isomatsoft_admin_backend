const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const Header = require('./models/header.model');
const HeroSection = require('./models/hero.model');
const Footer = require('./models/footer.model');
const Carausel = require('./models/carausels.model');
const AboutUs = require('./models/aboutus.model');
const { upload } = require('./middlewares/middlewares');
const { GetConditionalData, UpdateConditionalData, get_image_link } = require('./controllers/controllers');
const { connection } = require('./config/db');

// Load environment variables from .env file
dotenv.config();

const server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

// Routes
server.get('/api/getData', GetConditionalData); // Route to get data by section
server.post('/api/updateData', UpdateConditionalData); // Route to update data by section'
server.post("/api/get-image-url",upload.single('post_img'),get_image_link)

// Start the server
const PORT = process.env.PORT || 8081;
server.listen(PORT, async (error) => {
    if (error) {
      console.log(error);
    } else {
      try {
        await connection;
        console.log(PORT || 8099, "Connected successfully.");
      } catch (error) {
        console.log("Error while connecting to the database:", error);
      }
    }
  });




const pushDataToAllModels = async (data) => {
  try {
    // Push data to the Header model
    if (data.header) {
      await Header.updateOne({}, data.header, { upsert: true });
      console.log('Header data inserted/updated successfully');
    }

    // Push data to the Hero Section model
    if (data.hero_section) {
      await HeroSection.updateOne({}, data.hero_section, { upsert: true });
      console.log('Hero section data inserted/updated successfully');
    }

    // Push data to the Footer model
    if (data.footer) {
      await Footer.updateOne({}, data.footer, { upsert: true });
      console.log('Footer data inserted/updated successfully');
    }

    // Push data to the Site Info model
    if (data.site_info) {
      await Carausel.updateOne({}, data.site_info, { upsert: true });
      console.log('Site info data inserted/updated successfully');
    }
    if (data.aboutus) {
      await AboutUs.updateOne({}, data.site_info, { upsert: true });
      console.log('Site info data inserted/updated successfully');
    }

    return { success: true, message: 'Data inserted/updated in all models successfully' };

  } catch (error) {
    console.error('Error inserting/updating data in models:', error.message);
    return { success: false, message: 'Failed to insert/update data', error: error.message };
  }
};


const dummyData = {
    header: {
      logo: 'https://example.com/logo.png',
      links: [
        { name: 'Home', link: '/', button_text: 'Go Home' },
        { name: 'About Us', link: '/about', button_text: 'Learn More' },
        { name: 'Contact', link: '/contact', button_text: 'Get In Touch' }
      ]
    },
    hero_section: {
      title: 'Welcome to Our Website!',
      sub_title: 'The best place to explore amazing features.',
      description: 'We offer a wide variety of services to cater to all your needs. Discover more about what we do.',
      button_text: 'Explore Now'
    },
    footer: {
      links: [
        { name: 'Privacy Policy', link: '/privacy', icon: 'privacy_icon.png' },
        { name: 'Terms of Service', link: '/terms', icon: 'terms_icon.png' },
        { name: 'Help', link: '/help', icon: 'help_icon.png' }
      ]
    },
    site_info: {
      logo: 'https://example.com/site-logo.png',
      links: 
        { name: 'Betfair', link: 'https://betfair.com', icon: 'betfair.png' },
      description: 'This is the official site of our amazing platform. We strive to bring you the best experience.',
    },
    aboutus:{
      "title": "WHY ISOMATSOFT",
      "providers": ["evolution.png", "netent.png", "playngo.png"],
      "description": "Isomatsoft's premium approach empowers affiliates to stay focused on their core business while increasing profits via multiple long-term benefits of owning casino brands.",
      "card_details": [
        {
          "icon": "https://dainty-mandazi-b28226.netlify.app/assets/affiliateIcon-Bzmk6_4y.png",
          "title": "Affiliates First Solution",
          "description": "We built Extendy to meet affiliates’ major goal of owning online casinos - get maximum extra earnings from their traffic volumes with minimum investments."
        },
        {
          "icon": "https://dainty-mandazi-b28226.netlify.app/assets/casinoIcon-xyz123.png",
          "title": "Casino Management",
          "description": "Our casino management system provides a seamless experience, maximizing player engagement and profits."
        },
        {
          "icon": "https://dainty-mandazi-b28226.netlify.app/assets/supportIcon-abc456.png",
          "title": "24/7 Support",
          "description": "Round-the-clock support ensuring your business runs smoothly, with no downtime or issues."
        }
      ]
    }
    
  };
  

  
  const insertDummyData = async () => {
    try {
      const response = await pushDataToAllModels(dummyData);
      console.log(response.message);
    } catch (error) {
      console.error('Error inserting dummy data:', error.message);
    }
  };
  
  // Insert the dummy data when the server starts
  // insertDummyData();
  