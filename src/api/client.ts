import axios from 'axios';
import localforage from 'localforage';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export interface Article {
    title: string;
    description: string;
    content?: string;
    url: string;
    imageUrl: string;
    publishedAt: string;
    sourceId: string | null;
    sourceName: string;
}

export interface StoredHeadline {
    storyId: string;
    title: string;
    description: string;
    content?: string;
    url: string;
    imageUrl: string;
    publishedAt: string;
    sourceId: string | null;
    sourceName: string;
    updatedAt: string;
}

export type PoliticalBias = 'center' | 'leanLeft' | 'left' | 'leanRight' | 'right' | 'uncategorized';

export interface CategorizedArticles {
    center?: Article[];
    leanLeft?: Article[];
    left?: Article[];
    leanRight?: Article[];
    right?: Article[];
    uncategorized?: Article[];
}

export interface StoredArticles {
    storyId: string;
    articles: CategorizedArticles;
    updatedAt: string;
}

export interface StorySummary {
    storyId: string;
    summaries: {
        center?: string[];
        left?: string[];
        right?: string[];
    };
    biasComparison?: string[];
    updatedAt: string;
}

export interface HeadlinesResponse {
    headlines: StoredHeadline[];
}

export interface ArticlesResponse {
    articles: StoredArticles[];
}

export interface SummariesResponse {
    summaryData: StorySummary | undefined;
}

const api = {
    getHeadlines: async (): Promise<HeadlinesResponse> => {
        try {
            const cachedData = await localforage.getItem<HeadlinesResponse>('headlines')
            if(cachedData){
                return cachedData;
            }

            const response = await apiClient.get('/stored-headlines');
            await localforage.setItem('headlines', response.data);

            return response.data;
        } catch (error) {
            console.error('Error getting headlines', error);

            const cachedData = await localforage.getItem<HeadlinesResponse>('headlines');
            if (cachedData) {
                return cachedData;
            }

            throw error;
        }
    },

    getArticles: async (): Promise<ArticlesResponse> => {
        try {
            const cachedData = await localforage.getItem<ArticlesResponse>('articles')
            if(cachedData){
                return cachedData;
            }

            const response = await apiClient.get('/stored-articles');
            await localforage.setItem('articles', response.data);

            return response.data;
        } catch (error) {
            console.error('Error getting articles', error);

            const cachedData = await localforage.getItem<ArticlesResponse>('articles');
            if (cachedData) {
                return cachedData;
            }

            throw error;
        }
    },

    getSummaries: async (): Promise<SummariesResponse> => {
        try {
            const cachedData = await localforage.getItem<SummariesResponse>('summaries')
            if(cachedData){
                return cachedData;
            }
            // debug
            const response = await apiClient.get('/stored-summaries');
            console.log("Summary data:", response.data)
            await localforage.setItem('summaries', response.data);

            return response.data;
        } catch (error) {
            console.error('Error getting summaries', error);

            const cachedData = await localforage.getItem<SummariesResponse>('summaries');
            if (cachedData) {
                return cachedData;
            }

            throw error;
        }
    },

    getArticlesByStoryId: async (storyId: string): Promise<StoredArticles> => {
        try {
            const cacheKey = `storedArticles-${storyId}`;
            const cachedData = await localforage.getItem<StoredArticles>('cacheKey')
            if(cachedData){
                return cachedData;
            }

            const response = await apiClient.get(`/stored-articles?storyId=${storyId}`);
            await localforage.setItem(cacheKey, response.data);

            return response.data;
        } catch (error) {
            console.error(`Error getting articles for story ${storyId}`, error);
            
            const cacheKey = `storedArticles-${storyId}`;
            const cachedData = await localforage.getItem<StoredArticles>(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            throw error;
        }
    },
    
    getSummaryByStoryId: async (storyId: string): Promise<StorySummary> => {
        try {
            const cacheKey = `storySummary-${storyId}`;
            const cachedData = await localforage.getItem<StorySummary>(cacheKey)
            if(cachedData){
                return cachedData;
            }

            const response = await apiClient.get(`/stored-summaries?storyId=${storyId}`);
            await localforage.setItem(cacheKey, response.data);
            
            return response.data;
        } catch (error) {
            console.error(`Error getting summary for story ${storyId}`, error);

            const cacheKey = `storySummary-${storyId}`;
            const cachedData = await localforage.getItem<StorySummary>(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            throw error;
        }
    }
};

export default api;