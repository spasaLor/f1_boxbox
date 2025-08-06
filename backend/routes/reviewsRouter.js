const {Router}=require('express');
const router = Router();
const controller = require("../controller/reviewController");
const ensureAuthenticated = require("../config/authMiddleware");

router.get("/race/all/:raceId",controller.getAllReviews);
router.get("/race/:raceId",ensureAuthenticated,controller.getReviewFromUser);
router.get("/all_from_user/:user",controller.getAllReviewsFromUser);
router.get("/liked",ensureAuthenticated,controller.getLikedReviews);
router.post("/new",ensureAuthenticated,controller.newReview);
router.post("/likes/:id",ensureAuthenticated,controller.newReviewLike);
router.get("/likes/:id",controller.getLikes);
router.delete("/likes/:id",ensureAuthenticated,controller.removeLike);
router.get("/latest",controller.getLatestReviews);
router.get("/user/:username",controller.getReview);
router.put("/:id",ensureAuthenticated,controller.editReview);
router.delete("/:id",controller.deleteReview);
router.get("/popular",controller.getAllPopularReviews);

module.exports=router;