const {Router} = require("express");
const ensureAuthenticated = require("../config/authMiddleware");
const controller = require("../controller/ratingsController");
const router = Router();

router.post("/new",ensureAuthenticated,controller.newRating);
router.put("/update",ensureAuthenticated,controller.updateRating);
router.get("/:raceId",ensureAuthenticated,controller.getRating);
router.delete("/raceId",ensureAuthenticated,controller.deleteRating);

module.exports=router;