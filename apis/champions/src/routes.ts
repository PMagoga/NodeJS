import { Router } from "express";
import { getPlayer } from "./controllers/player-controllers";

const router = Router();

router.get('/api', getPlayer)