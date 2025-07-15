import fs from "fs";
import path from "path";
import { Podcast } from "../models/podcast-model";

const pathData = path.join(__dirname, "../repositories/podcast.json");

export const repositoryPodcast = async (): Promise<Podcast[]> => {
    const rawdata = fs.readFileSync(pathData, "utf-8");
    const jsonFile = JSON.parse(rawdata);
    return jsonFile
}