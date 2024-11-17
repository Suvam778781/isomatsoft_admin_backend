const AboutUs = require("../models/aboutus.model");
const Carausel = require("../models/carausels.model");
const ContactResponseModel = require("../models/contactresponse.model");
const Footer = require("../models/footer.model");
const Header = require("../models/header.model");
const HeroSection = require("../models/hero.model");

const { initializeApp } = require("firebase/app");
require('dotenv').config()

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} = require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnvG3bujEbu9VGmUGL3i5WRuCaD3N4ZAs",
  authDomain: "kudos-next.firebaseapp.com",
  projectId: "kudos-next",
  storageBucket: "kudos-next.appspot.com",
  messagingSenderId: "899472045604",
  appId: "1:899472045604:web:545f0eb0c744c8b19c8ab1",
  measurementId: "G-3EMHS3V6GL",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);


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
        case 'contact_request':
          data = await ContactResponseModel.find();
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
      const { section, data, action } = req.body; // Get section, data, and action from the request body
  
      if (!section || !data) {
        return res.status(400).json({
          success: false,
          message: 'Section and data are required.'
        });
      }
  
      const id = data._id;
  
      // Handle delete action
      if (action === 'delete') {
        switch (section) {
          case 'hero_section':
            await HeroSection.deleteOne({ _id: id });
            break;
          case 'carausel':
            await Carausel.deleteOne({ _id: id });
            break;
          case 'aboutus':
            await AboutUs.deleteOne({ _id: id });
            break;
          default:
            return res.status(400).json({
              success: false,
              message: 'Invalid section for deletion.'
            });
        }
  
        return res.status(200).json({
          success: true,
          message: `Data for section ${section} with ID ${id} deleted successfully`
        });
      }
  
      // Delete the _id field from data before updating
      delete data._id;
  
      // Update the specified section based on the section key
      switch (section) {
        case 'header':
          await Header.updateOne({}, data, { upsert: true });
          break;
        case 'hero_section':
          await HeroSection.updateOne({ _id: id }, data, { upsert: true });
          break;
        case 'footer':
          await Footer.updateOne({}, data, { upsert: true });
          break;
        case 'carausel':
          await Carausel.updateOne({ _id: id }, data, { upsert: true });
          break;
        case 'aboutus':
          await AboutUs.updateOne({}, data, { upsert: true });
          break;
        case 'contact_request':
          await ContactResponseModel.create(data);
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

  const imageLink=async(req,res)=>{
    
    try {
       const postImgBuffer = req.file.buffer;
  
       console.log(postImgBuffer,"postImagebferr")
       const dateTime = new Date().getTime();
       const storageRef = ref(
         storage,
         `/blog/${req.file.originalname + "" + dateTime}`
       );
       const metadata = {
         contentType: req.file.mimetype,
       };
       const snapshot = await uploadBytesResumable(storageRef, postImgBuffer, metadata);
        
       const post_img_url=await getDownloadURL(snapshot.ref)
       return post_img_url
   
    } catch (error) {
       console.log(error)
       return {"error":"unable to genrate link",error}
    }
  }
  
  const get_image_link = async (req, res) => {
    try {
      const post_img = await imageLink(req, res);
      return res.status(200).json({
        status: 200,
        success: true,
        url: post_img,
        message: "Image url generate succesfully",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Error while creating image url",
      });
    }
  };

  
  module.exports = {
    GetConditionalData, UpdateConditionalData, storage,ref,getDownloadURL,uploadBytes,uploadBytesResumable ,imageLink, get_image_link
  }  

  