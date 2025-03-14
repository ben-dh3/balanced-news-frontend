import { useArticleData, calculatePerspectiveDistribution } from '../api/articleService';

interface PerspectiveDistributionProps {
  storyId: string;
  compact?: boolean;
}

const PerspectiveDistribution = ({ storyId, compact = false }: PerspectiveDistributionProps) => {
  const { data: articlesData, isLoading } = useArticleData(storyId);
  const distribution = calculatePerspectiveDistribution(articlesData);
  
  if (isLoading) return <div className="loading-distribution"></div>;
  if (!distribution) return null;
  
  return (
    <div>
        {compact ? (
            <div className='space-y-2'>
                <div className="flex h-2 w-full rounded overflow-hidden">
                    <div 
                    className="h-full bg-left" 
                    style={{ width: `${distribution.percentages.left}%` }}
                    title={`Left: ${distribution.counts.left} articles`}
                    />
                    <div 
                    className="h-full bg-white" 
                    style={{ width: `${distribution.percentages.center}%` }}
                    title={`Center: ${distribution.counts.center} articles`}
                    />
                    <div 
                    className="h-full bg-right" 
                    style={{ width: `${distribution.percentages.right}%` }}
                    title={`Right: ${distribution.counts.right} articles`}
                    />
                </div>
                <p className='text-sm font-bold'>{distribution.total} Sources</p>
            </div>
        ) : (
            <div className="text-xs text-center flex h-4 w-full rounded overflow-hidden">
                <span
                className="h-full bg-left" 
                style={{ width: `${distribution.percentages.left}%` }}
                >
                    {`Left ${distribution.percentages.left}%`}
                </span>
                <span 
                className="h-full bg-white" 
                style={{ width: `${distribution.percentages.center}%` }}
                >
                    {`Center ${distribution.percentages.center}%`}
                </span>
                <span 
                className="h-full bg-right" 
                style={{ width: `${distribution.percentages.right}%` }}
                >
                    {`Right ${distribution.percentages.right}%`}
                </span>
            </div>
        )}
    </div>
  );
};

export default PerspectiveDistribution;