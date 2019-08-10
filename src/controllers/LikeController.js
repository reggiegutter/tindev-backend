// const api = require('../utils');
const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    try {
      const { divId } = req.params;
      const { user } = req.headers;

      const loggedDev = await Dev.findById(user);
      const likedDev = await Dev.findById(divId);

      if (!likedDev) {
        return res.status(400).json({
          success: false,
          data: 'Dev does not exist',
        });
      }

      if (likedDev.likes.includes(user)) {
        console.log("It's a Match");
      }

      if (loggedDev.likes.includes(divId)) {
        return res.json({
          success: true,
          data: loggedDev,
        });
      }

      loggedDev.likes.push(divId);
      await loggedDev.save();

      return res.json({
        success: true,
        data: loggedDev,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
      });
    }
  },
};
