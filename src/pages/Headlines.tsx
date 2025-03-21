import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';
import PageTitle from '../components/Title';
import HeadlineCard from '../components/HeadlineCard';
import { useHeadlineData } from '@/api/dataService';

const Headlines: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const queryClient = useQueryClient();
  
  const { 
    data: headlineData, 
    isLoading: headlinesLoading,
    error: headlinesError 
  } = useHeadlineData();

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['headlines'] }),
    ]);
    setLastUpdated(new Date());
  };

  if (headlinesLoading) {
    return <div>Loading headline data...</div>;
  };

  if (headlinesError) {
    return <div>Error loading headlines: {headlinesError.message}</div>;
  }; 

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className='mt-2 font-display gap-6 flex flex-col justify-center items-center min-h-screen'>
        <PageTitle lastUpdated={lastUpdated} />

        <div className='mb-4 flex flex-col'>
          {!headlineData?.headlines?.length ? (
            <div className='font-display'>No headlines available</div>
          ) : (
            <>
              <HeadlineCard headline={headlineData.headlines[0]} isFeatured={true} />
              {headlineData.headlines.slice(1).map(headline => (
                <HeadlineCard headline={headline} isFeatured={false} key={headline.storyId} />
              ))}
            </>
          )}
        </div>
      </div>
    </PullToRefresh>
  );
}

export default Headlines;