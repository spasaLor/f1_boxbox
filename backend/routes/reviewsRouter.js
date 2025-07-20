const {Router}=require('express');
const router = Router();
const controller = require("../controller/reviewController");
const ensureAuthenticated = require("../config/authMiddleware");

router.get("/race/all/:raceId",controller.getAllReviews);
router.get("/race/:raceId",ensureAuthenticated,controller.getReviewFromUser);
router.get("/all_from_user",ensureAuthenticated,controller.getAllReviewsFromUser);
router.post("/new",ensureAuthenticated,controller.newReview);
router.get("/latest",controller.getLatestReviews);
router.get("/:id",controller.getReview);
router.put("/:id",ensureAuthenticated,controller.editReview);
router.delete("/:id",controller.deleteReview);

module.exports=router;