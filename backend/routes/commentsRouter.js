const {Router}=require('express');
const router = Router();
const controller = require("../controller/commentsController");
const ensureAuthenticated = require("../config/authMiddleware");

router.get("/review/:reviewId",controller.getAllCommentsFromReview);
router.post("/review/reviewId",ensureAuthenticated,controller.newComment);
router.delete("/:id",controller.deleteComment);
module.exports=router;