import { repositoryPodcast } from "../repositories/podcast-reposity"

export const serviceFilterEpisodes = async (podcastName: string) => {
    const data = await repositoryPodcast(podcastName);
    
    return data;
}