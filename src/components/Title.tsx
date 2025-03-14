import { format } from 'date-fns';

interface PageTitleProps {
  lastUpdated: Date;
}

const PageTitle: React.FC<PageTitleProps> = ({ lastUpdated }) => {
  return (
    <div className="space-y-2 w-full flex flex-col">
      <div className='flex justify-between'>
        <div className="font-title font-bold px-4 text-sm text-primary-900">
        {format(new Date(), 'MMMM d')}
        </div>
        <div className="px-4 text-xs text-primary-900">
          Last Updated: {format(lastUpdated, 'h:mm a')}
        </div>
      </div>
      <img className="self-center w-60" src="/title.svg" alt='Balanced News Title'></img>
    </div>
  );
};

export default PageTitle;