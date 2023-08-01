'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Shoddy Apartment',
        description: 'Includes the printer from Office Space',
        price: 100.00,
        previewImage: 'https://c1.wallpaperflare.com/preview/784/104/992/apartment-building-highrise-poor-balconies-tower-architecture.jpg'
      },
      {
        userId: 2,
        address: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Glass House',
        description: 'A luxurious house with multiple china cabinets. \
        Great for Greek wedding parties and throwing stones in!',
        price: 500.00,
        previewImage: 'https://cdn.pixabay.com/photo/2017/09/28/16/44/glass-house-2796146_1280.jpg'
      },
      {
        userId: 3,
        address: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        lat: 41.8781,
        lng: -87.6298,
        name: 'House of Cards',
        description: 'Sleep on the ground floor!',
        price: 200.00,
        previewImage: 'https://c1.wallpaperflare.com/preview/926/405/240/house-of-cards-fragile-patience-sensitive.jpg'
      },
      {
        userId: 4,
        address: '987 Pine St',
        city: 'San Francisco',
        state: 'CA',
        country: 'Straw House',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Leaning Tower',
        description: 'Tower? Hardly knew her!',
        price: 150.00,
        previewImage: 'https://media.istockphoto.com/id/1289575928/photo/thatched-house.jpg?s=612x612&w=0&k=20&c=uD33asItIOqDklLAZbIWmTHvV8pkHYNTj-1cjU9DHFM='
      },
      {
        userId: 5,
        address: '654 Cedar St',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Balsa Wood Hovel',
        description: 'Great for punching holes into walls',
        price: 300.00,
        previewImage: 'https://2.bp.blogspot.com/-uYSl0n9wos4/WwvU92jA-dI/AAAAAAAAFEQ/31NDqMMYEfgyX-5L2mvjF3E1SEGeTcEygCEwYBhgL/s1600/vanga04.jpg'
      },
      {
        userId: 6,
        address: '321 Maple St',
        city: 'Denver',
        state: 'CO',
        country: 'United States',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Thin Walls Apartment',
        description: 'A cozy apartment with walls thinner than prosciutto',
        price: 120.00,
        previewImage: 'https://i.pinimg.com/originals/ca/ab/7c/caab7c67150b36c45359834c41e3f5e7.jpg'
      }
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.op;
    return queryInterface.bulkDelete(options, null,{});
  }
};
