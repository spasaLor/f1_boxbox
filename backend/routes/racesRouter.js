const {Router} = require("express");
const controller = require("../controller/racesController");
const router = Router();

router.post("/new",controller.addNewRace)
router.get("/all",controller.getAllRaces);
router.get("/search",controller.searchRace)
router.put("/:id",controller.editRaceData)
router.get("/:year",controller.getRacesByYear);
router.get("/:year/:round",controller.getRaceByYear);
router.delete("/:id",controller.deleteRace);
module.exports=router;