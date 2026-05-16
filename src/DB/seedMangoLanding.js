const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cmsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  description: String,
}, { timestamps: true });

const CMS = mongoose.model('CMS', cmsSchema);

const mangoLandingData = {
  key: "mango_landing",
  description: "Data for the dedicated mango landing page",
  value: {
    hero: {
      tagline: "রাজশাহীর প্রিমিয়াম আম সরাসরি বাগান থেকে",
      title: "মধুমাস উপলক্ষে রাজশাহীর সেরা আম এখন আপনার ঘরে",
      description: "আমরা সরাসরি রাজশাহীর বাগান থেকে কোনো কেমিক্যাল ছাড়াই প্রাকৃতিকভাবে পাকানো আম পৌঁছে দিচ্ছি আপনার পরিবারের জন্য। স্বাদ ও সুগন্ধে অতুলনীয় প্রিমিয়াম আম।",
      ctaText: "অর্ডার করুন",
      image: "/fresh_mangoes_hero.png"
    },
    carousel: [
      { url: "/fresh_mangoes_hero.png", alt: "হিমসাগর আম" },
      { url: "/fresh_lychees_hero.png", alt: "আমাদের বাগান" },
      { url: "/fresh_mangoes_hero.png", alt: "টাটকা আম" }
    ],
    story: {
      sections: [
        {
          title: "কেন আমাদের আম আলাদা?",
          content: "বাজারে সাধারণত কেমিক্যাল দিয়ে আম পাকানো হয় যা স্বাস্থ্যের জন্য ক্ষতিকর। আমরা নিশ্চিত করি আমাদের আমগুলো গাছে বা প্রাকৃতিকভাবেই পাকানো হয়, কোনো ক্ষতিকর রাসায়নিক ছাড়াই।",
          image: "/fresh_mangoes_hero.png",
          features: ["১০০% কেমিক্যাল মুক্ত", "প্রাকৃতিক স্বাদ", "নিরাপদ খাদ্য"]
        },
        {
          title: "সরাসরি রাজশাহী থেকে ডেলিভারি",
          content: "আমরা রাজশাহীর সেরা আমগুলো আপনার অর্ডারের পর বাগান থেকে সংগ্রহ করি এবং ২৪-৪৮ ঘণ্টার মধ্যে সারা দেশে হোম ডেলিভারি নিশ্চিত করি।",
          image: "/fresh_lychees_hero.png",
          features: ["২৪-৪৮ ঘণ্টা ডেলিভারি", "সারা দেশে হোম ডেলিভারি", "পণ্য বুঝে টাকা দিন"]
        }
      ]
    },
    checkout: {
      deliveryCharge: 150
    }
  }
};

async function seed() {
  try {
    const dbUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/freshmoushum";
    console.log("Connecting to:", dbUrl);
    await mongoose.connect(dbUrl);
    
    const existing = await CMS.findOne({ key: "mango_landing" });
    if (existing) {
      console.log("Mango landing data already exists. Skipping seed.");
    } else {
      await CMS.create(mangoLandingData);
      console.log("Mango landing data seeded successfully!");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding CMS:", error);
    process.exit(1);
  }
}

seed();
