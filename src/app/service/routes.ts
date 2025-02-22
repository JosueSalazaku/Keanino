import axios from 'axios';
import type { Post } from '~/types';


const getAllPosts = async () => {
    try {
        const response = await axios.get('api/posts');
        console.log(response.data);

        if (response.status === 200 || response.status === 201) {
            return response.data as Post[];
        }
        
    } catch (error) {
        console.error("Error fetching All posts:", error);
        throw new Error("Could not fetch All posts Please try again.");
    }
}
