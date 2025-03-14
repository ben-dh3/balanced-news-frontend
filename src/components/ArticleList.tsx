import { useState } from "react";
import { CategorizedArticles } from "../api/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface ArticleListProps {
  articles: CategorizedArticles;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const mergedArticles = {
    left: [...(articles.leanLeft || []), ...(articles.left || [])],
    center: articles.center || [],
    right: [...(articles.leanRight || []), ...(articles.right || [])],
  };

  const allArticles = Object.values(mergedArticles).flat();
  const totalArticles = allArticles.length;

  const tabs = [
    { key: "all", label: "All", count: totalArticles },
    { key: "left", label: "Left", count: mergedArticles.left.length },
    { key: "center", label: "Center", count: mergedArticles.center.length },
    { key: "right", label: "Right", count: mergedArticles.right.length },
  ];

  const [activeTab, setActiveTab] = useState(() => tabs.find((tab) => tab.count > 0)?.key || "all");

  const getArticlePerspective = (article: any) => {
    if (articles.leanLeft?.includes(article)) return {label: "Lean Left", background: "bg-left", text: "text-white"};
    if (articles.leanRight?.includes(article)) return {label: "Lean Right", background: "bg-right", text: "text-white"};
    if (articles.left?.includes(article)) return {label: "Left", background: "bg-left", text: "text-white"};
    if (articles.center?.includes(article)) return {label: "Center", background: "bg-white", text: "text-black"};
    if (articles.right?.includes(article)) return {label: "Right", background: "bg-right", text: "text-white"};
    return {perspective: "Undefined"};
  };
  
  return (
    <div className="space-y-4">
        
      <div className="border-b font-title flex justify-between items-center">
        <h2 className="text-lg font-bold">{totalArticles} Articles</h2>
        <div className="flex items-center">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => count > 0 && setActiveTab(key)}
              className={` px-4 py-2 ${
                count > 0 ? "cursor-pointer hover:bg-primary-100" : "text-gray-400 cursor-not-allowed"
              } ${activeTab === key && count > 0 ? "border-b-6 border-highlight font-bold" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 font-display">
        {(activeTab === "all" ? allArticles : mergedArticles[activeTab as keyof typeof mergedArticles]).map(
          (article, index) => {
            const perspective = getArticlePerspective(article);
            return (
                <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-2 bg-primary-100 block p-4 rounded-xl"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-xs">
                        {article.sourceName} • {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        <p className={`${perspective.background} ${perspective.text} p-2 text-xs rounded-xl`}>{perspective.label}</p>
                    </div>
                    
                    <h3 className="font-title text-xl font-bold">{article.title}</h3>
                    <div className="flex items-center gap-4">
                        <p className="text-sm">{article.description.slice(0,100)}...</p>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />                
                    </div>
                </a>
            )
          }
        )}
      </div>
    </div>
  );
};

export default ArticleList;