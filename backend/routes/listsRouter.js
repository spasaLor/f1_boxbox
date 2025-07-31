const {Router}= require("express");
const controller = require("../controller/listsController");
const ensureAuthenticated = require("../config/authMiddleware");
const router = Router();

router.post("/new",ensureAuthenticated,controller.newList);
router.post("/add_race",ensureAuthenticated,controller.addRace);
router.get("/all_from_user",controller.getAllLists);
router.post("/user",controller.getAllListsFromUser);
router.get("/name/:listName",ensureAuthenticated,controller.getListByName);
router.get("/popular",controller.getPopularLists);
router.get("/recently_liked",controller.getRecentlyLiked);
router.get("/:listId",controller.getList);
router.put("/:listId",controller.editList);
router.post("/like/:listId",ensureAuthenticated,controller.likeList);
router.delete("/like/:listId",ensureAuthenticated,controller.deleteLike);
router.get("/like/:listId",controller.getLikes);
router.get("/like/user/:listId",ensureAuthenticated,controller.getIsLiked);
router.delete("/:listId",ensureAuthenticated,controller.deleteList);
module.exports=router