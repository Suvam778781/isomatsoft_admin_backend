const AboutUs = require("../models/aboutus.model");
const Carausel = require("../models/carausels.model");
const Footer = require("../models/footer.model");
const Header = require("../models/header.model");
const HeroSection = require("../models/hero.model");

const GetConditionalData = async (req, res) => {
    try {
      const { section } = req.query; // Get the section from the query params
  
      let data;
      
      // Fetch data based on the requested section
      switch (section) {
        case 'header':
          data = await Header.findOne();
          break;
        case 'hero_section':
          data = await HeroSection.findOne();
          break;
        case 'footer':
          data = await Footer.findOne();
          break;
        case 'carausel':
          data = await Carausel.find();
          break;
        case 'aboutus':
          data = await AboutUs.find();
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid section. Available sections are: header, hero_section, footer, site_info.'
          });
      }
  
      if (!data) {
        return res.status(404).json({
          success: false,
          message: `No data found for section: ${section}`
        });
      }
  
      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching data',
        error: error.message
      });
    }
  };



  const UpdateConditionalData = async (req, res) => {
    try {
      const { section, data } = req.body; // Get section and data from the request body
  
      if (!section || !data) {
        return res.status(400).json({
          success: false,
          message: 'Section and data are required.'
        });
      }
  
      // Update the specified section based on the section key
      switch (section) {
        case 'header':
          await Header.updateOne({}, data, { upsert: true });
          break;
        case 'hero_section':
          await HeroSection.updateOne({}, data, { upsert: true });
          break;
        case 'footer':
          await Footer.updateOne({}, data, { upsert: true });
          break;
        case 'carausel':
          await Carausel.updateOne({}, data, { upsert: true });
          break;
        case 'aboutus':
          await AboutUs.updateOne({}, data, { upsert: true });
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid section. Available sections are: header, hero_section, footer, site_info.'
          });
      }
  
      res.status(200).json({
        success: true,
        message: `Data for section ${section} updated successfully`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating data',
        error: error.message
      });
    }
  };

  
  module.exports = {
    GetConditionalData, UpdateConditionalData
  }  