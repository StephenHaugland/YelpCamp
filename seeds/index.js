const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //YOUR USER ID
            author: '661ed50ba461e3931fc98f28',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque alias vitae at aperiam exercitationem perspiciatis quasi ex magnam et tenetur suscipit, consequatur odio velit maiores ratione ipsum saepe sunt qui!',
            price,
            geometry: {
              type: "Point",
              coordinates: [cities[random1000].longitude,
                            cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dncarjq0u/image/upload/v1713313928/YelpCamp/avqphc692f7gpbsgxucc.jpg',
                  filename: 'YelpCamp/avqphc692f7gpbsgxucc'
                },
                {
                  url: 'https://res.cloudinary.com/dncarjq0u/image/upload/v1713313928/YelpCamp/kskvnspray5fb03uup9j.jpg',
                  filename: 'YelpCamp/kskvnspray5fb03uup9j'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})