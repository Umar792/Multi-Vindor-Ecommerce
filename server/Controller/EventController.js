const EventModel = require("../Model/EventsSchema");
const cloudinary = require("cloudinary");
const ShopModal = require("../Model/ShopCreateSchema");

module.exports = {
  // ------------------------- create Products
  createEventProducts: async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        Tags,
        originalPrice,
        discountPrice,
        stock,
        startDate,
        endDate,
      } = req.body;
      if (
        !name ||
        !description ||
        !category ||
        !Tags ||
        !originalPrice ||
        !discountPrice ||
        !stock ||
        !startDate ||
        !endDate
      ) {
        let missingFields = [];
        if (!name) {
          missingFields.push("name");
        }
        if (!description) {
          missingFields.push("description");
        }
        if (!category) {
          missingFields.push("category");
        }
        if (!Tags) {
          missingFields.push("Tags");
        }
        if (!originalPrice) {
          missingFields.push("originalPrice");
        }
        if (!discountPrice) {
          missingFields.push("discountPrice");
        }
        if (!stock) {
          missingFields.push("stock");
        }
        if (!startDate) {
          missingFields.push("startDate");
        }
        if (!endDate) {
          missingFields.push("EndDate");
        }

        req.body.startDate = req.body.startDate.IOSString();
        req.body.endDate = req.body.endDate.IOSString();
        return res.status(400).json({
          success: false,
          message: `Please enter the following fields: ${missingFields.join(
            ", "
          )}`,
        });
      }
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      let imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "sample",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const ownerid = await ShopModal.findById(req.user._id);
      req.body.images = imagesLink;
      req.body.owner = ownerid._id;
      const Event = await EventModel.create(req.body);
      ownerid.Events.push(Event._id);
      await ownerid.save();

      res.status(200).json({
        success: true,
        message: "Event Create Successfuly",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};