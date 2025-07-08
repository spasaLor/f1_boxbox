const {Router}=require('express');
const router = Router();
const controller = require("../controller/reviewController");
const ensureAuthenticated = require("../config/authMiddleware");

router.get("/race/:raceId",controller.getAllReviews);
router.post("/race/:raceId",ensureAuthenticated,controller.newReview);
router.get("/:id",controller.getReview);
router.put("/:id",ensureAuthenticated,controller.editReview);
router.delete("/:id",controller.deleteReview);

module.exports=router;