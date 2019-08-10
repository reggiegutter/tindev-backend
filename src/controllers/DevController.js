const api = require('../utils');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    try {
      const { user } = req.headers;

      const loggedDev = await Dev.findById(user);

      const usersToBeLiked = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.dislikes } },
        ],
      });

      return res.json({
        success: true,
        data: usersToBeLiked,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: [],
      });
    }
  },

  async store(req, res) {
    try {
      const { username: user } = req.body;

      const userExists = await Dev.findOne({ user });

      if (userExists) {
        return res.json({
          success: true,
          data: userExists,
        });
      }

      const {
        data: { name, bio, avatar_url: avatar },
      } = await api.get(`/users/${user}`);

      const dev = await Dev.create({
        name,
        user,
        bio,
        avatar,
      });

      return res.json({
        success: true,
        data: dev,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
      });
    }
  },
};
