const {Router}= require("express");
const controller = require("../controller/listsController");
const ensureAuthenticated = require("../config/authMiddleware");
const router = Router();

router.post("/new",ensureAuthenticated,controller.newList);
router.post("/add_race",ensureAuthenticated,controller.addRace);
router.get("/all_from_user",controller.getAllLists);
router.get("/user",ensureAuthenticated,controller.getAllListsFromUser);
router.get("/name/:listName",ensureAuthenticated,controller.getListByName);
router.get("/:listId",controller.getList);
router.put("/:listId",controller.editList);
router.delete("/:listId",ensureAuthenticated,controller.deleteList);

module.exports=router