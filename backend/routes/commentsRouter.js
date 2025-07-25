const {Router}=require('express');
const router = Router();
const controller = require("../controller/commentsController");
const ensureAuthenticated = require("../config/authMiddleware");

router.get("/reviews/:reviewId",controller.getAllCommentsFromReview);
router.get("/lists/:listId",controller.getAllCommentsFromList);
router.post("/reviews/:reviewId",ensureAuthenticated,controller.addRevComment);
router.post("/lists/:listId",ensureAuthenticated,controller.addListComment);
router.delete("/:id",controller.deleteComment);
module.exports=router;