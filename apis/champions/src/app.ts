import express, {Request, Response} from "express";
import { getPlayer } from "./controllers/player-controllers";


function createApp() {
    const app = express();
    
    app.use(express.json());
    
    app.get('/', getPlayer);

    return app;
}

export default createApp;