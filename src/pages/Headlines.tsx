import { useQuery, useQueryClient } from '@tanstack/react-query';
import api, { HeadlinesResponse } from "../api/client";
import { useState } from 'react';
import PullToRefresh from '../components/PullToRefresh';
import PageTitle from '../components/Title';
import HeadlineCard from '../components/HeadlineCard';

const Headlines: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery<HeadlinesResponse>({
    queryKey: ['headlines'],
    queryFn: () => api.getHeadlines(),
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['headlines'] });
    setLastUpdated(new Date());
  };

  if (isLoading) return <div>Loading headlines...</div>;
  if (error) return <div>Error loading headlines: {error.toString()}</div>;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className='mt-2 font-display gap-6 flex flex-col justify-center items-center min-h-screen'>
        <PageTitle lastUpdated={lastUpdated} />

        <div className='mb-4 flex flex-col'>
          {!data?.headlines?.length ? (
            <div className='font-display'>No headlines available</div>
          ) : (
            <>
              <HeadlineCard headline={data.headlines[0]} isFeatured={true} />
              {data.headlines.slice(1).map(headline => (
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