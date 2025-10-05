import { useNavigate } from "react-router-dom";
import getTabIcon from "../../utils/getTabIcon";

function ProfileTabs({ role, roleTabs, userId }) {
  const navigate = useNavigate();

  const getGridColumns = () => {
    const tabCount = roleTabs[role]?.length || 0;
    if (tabCount <= 3) return "grid-cols-1 sm:grid-cols-2";
    if (tabCount <= 4) return "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";
    if (tabCount <= 6) return "grid-cols-2 sm:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  };

  return (
    <div className={`grid ${getGridColumns()} gap-3`}>
      {roleTabs[role]?.map((tab, index) => (
        <button
          key={index}
          onClick={() => {
            if (tab.key === "teacherApplications") {
              navigate(`/users/${tab.key}`);
            } else if (tab.key === "allUsers") {
              navigate(`/${tab.key}`);
            } else if (tab.key === "all" || tab.key === "unanswered") {
              navigate(`/questions/${tab.key}`);
            } else {
              navigate(`/profile/${userId}/${tab.key}`);
            }
          }}
          className="btn btn-outline hover:btn-primary hover:scale-105 transition-all duration-200 flex flex-col gap-2 h-auto py-4 px-3 group"
        >
          <div className="flex items-center justify-center text-primary group-hover:text-primary-content transition-colors">
            {getTabIcon(tab.key)}
          </div>
          <span className="text-xs sm:text-sm font-medium text-center leading-tight group-hover:text-primary-content transition-colors">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default ProfileTabs;
