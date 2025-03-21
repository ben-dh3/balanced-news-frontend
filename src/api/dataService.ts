import { useQuery } from '@tanstack/react-query';
import api, { HeadlinesResponse, StoredArticles, StorySummary } from './client';


export const useHeadlineData = () => {
    const headlinesQuery = useQuery<HeadlinesResponse>({
      queryKey: ['headlines'],
      queryFn: () => api.getHeadlines(),
  });

  return headlinesQuery;
}

export const useArticleData = (storyId: string | undefined) => {
  const articlesQuery = useQuery<StoredArticles>({
    queryKey: ['articles', storyId],
    queryFn: () => api.getArticlesByStoryId(storyId!),
    enabled: !!storyId,
  });

  return articlesQuery;
};

export const useSummaryData = (storyId: string | undefined) => {
  const summaryQuery = useQuery<StorySummary>({
    queryKey: ['summary', storyId],
    queryFn: () => api.getSummaryByStoryId(storyId!),
    enabled: !!storyId,
  });

  return summaryQuery;
};

export const calculatePerspectiveDistribution = (articles?: StoredArticles) => {
  if (!articles?.articles) return null;
  
  const distribution = {
    left: (articles.articles.left?.length || 0) + (articles.articles.leanLeft?.length || 0),
    center: articles.articles.center?.length || 0,
    right: (articles.articles.right?.length || 0) + (articles.articles.leanRight?.length || 0),
  };
  
  const total = distribution.left + distribution.center + distribution.right;
  
  return {
    counts: distribution,
    percentages: {
      left: total ? Math.round((distribution.left / total) * 100) : 0,
      center: total ? Math.round((distribution.center / total) * 100) : 0,
      right: total ? Math.round((distribution.right / total) * 100) : 0,
    },
    total
  };
};