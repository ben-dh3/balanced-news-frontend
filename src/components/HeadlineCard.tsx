import { Link } from "react-router-dom";
import { StoredHeadline } from "@/api/client";
import PerspectiveDistribution from "./PerspectiveDistribution";

const HeadlineCard = ({ headline, isFeatured }: { headline: StoredHeadline, isFeatured: boolean }) => (
    <Link 
      to={`/story/${headline.storyId}`} 
      state={{ title: headline.title, imageUrl: headline.imageUrl }}
      key={headline.storyId}
    >
        {isFeatured ? (
            <div className="relative">

                <img 
                src={headline.imageUrl}
                className="w-full h-full object-cover"
                alt={headline.title}
                />
                
                <div className="text-white font-display absolute inset-0 backdrop-brightness-70 flex flex-col justify-end p-4">
                    <p className="text-sm font-bold absolute right-2 top-2">{headline.sourceName}</p>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-title font-black">{headline.title}</h2>
                        <div>
                            <PerspectiveDistribution storyId={headline.storyId} compact={false} />
                        </div>
                    </div>
                </div>  
            </div>
        ) : (
            <div className="mt-6 mx-4 p-4 bg-primary-100 rounded-xl">
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <h2 className="text-xl font-title font-black">{headline.title}</h2>
                        <p className="text-sm">{headline.sourceName}</p>
                    </div>
                    <img 
                    src={headline.imageUrl}
                    className="w-28 h-28 object-cover rounded-xl"
                    alt={headline.title}
                    />
                </div>

                <div>
                    <PerspectiveDistribution storyId={headline.storyId} compact={true} />
                </div>        
            </div>
        )}
    </Link>
  );

  export default HeadlineCard