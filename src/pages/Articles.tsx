import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useArticleData, useSummaryData } from '../api/articleService';
import SummaryTabs from '../components/SummaryTabs';
import ArticleList from '../components/ArticleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PullToRefresh from '@/components/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';

const Articles: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { title, imageUrl } = location.state || {};
  const queryClient = useQueryClient();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['articles', 'summaries'] });
  };
  
  const { data: summaryData, isLoading: summariesLoading } = useSummaryData(storyId);
  const { data: articlesData, isLoading: articlesLoading } = useArticleData(storyId);
  
  if (summariesLoading || articlesLoading) return <div>Loading article data...</div>;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="m-4 space-y-4 font-display">
        <button onClick={handleGoBack} className="cursor-pointer w-10 h-10 bg-primary-100 rounded-full">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {title && imageUrl && (
          <div className="flex justify-between">
            <h2 className="text-2xl font-title font-black">{title}</h2>
            <img 
            src={imageUrl}
            className="w-28 h-28 object-cover rounded-xl"
            alt={title}
            />
          </div>
        )}
        
        <SummaryTabs summaryData={summaryData} />
        <ArticleList articles={articlesData?.articles || {}} />
      </div>

    </PullToRefresh>
   
  );
};

export default Articles;