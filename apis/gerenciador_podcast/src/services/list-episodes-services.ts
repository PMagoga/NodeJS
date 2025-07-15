import { repositoryPodcast } from "../repositories/podcast-reposity";

export const serviceListEpisodes = async () => {
    const data = await repositoryPodcast();    

    return data;
};