'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('vehicle', [
      // Hatchback
      { vname: 'Maruti Suzuki Swift', vtypeid: 1, },
      { vname: 'Hyundai Grand i10', vtypeid: 1, },
      { vname: 'Tata Tiago', vtypeid: 1, },


      // SUV
      { vname: 'Toyota Innova Crysta', vtypeid: 2, },
      { vname: 'Mahindra XUV700', vtypeid: 2, },
      { vname: 'Hyundai Creta', vtypeid: 2, },


      // Sedan
      { vname: 'Maruti Suzuki Dzire', vtypeid: 3, },
      { vname: 'Hyundai Verna', vtypeid: 3, },
      { vname: 'Honda City', vtypeid: 3, },


      // Cruiser
      { vname: 'Royal Enfield Meteor 350', vtypeid: 4, },
      { vname: 'Jawa 42 Bobber', vtypeid: 4, },
      { vname: 'Royal Enfield Bullet 350', vtypeid: 4, },


      // Sports Bike
      { vname: 'Yamaha R15 V4', vtypeid: 5, },
      { vname: 'Kawasaki Ninja 300', vtypeid: 5, },
      { vname: 'BMW G310 RR', vtypeid: 5, },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('vehicle', null, {});
  }
};
