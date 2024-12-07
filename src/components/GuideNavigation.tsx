import { NavLink } from "react-router-dom";

const GuideNavigation = () => {
    return (
        <div className="flex text-[30px] space-x-28 font-bold mb-20 bg-[#f1a34a] w-full justify-center text-black p-3 ">
          
          <NavLink 
            to="/guide/announcement"
            className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-30 hover:scale-105 hover:transition-transform hover:opacity-100"
            }
          >
            공지사항
          </NavLink>
          <NavLink 
            to="/guide/qna"
            className={({ isActive }) => 
              isActive ? "opacity-100 " : "opacity-50 hover:scale-105 hover:transition-transform hover:opacity-100"
            }
          >
            문의
          </NavLink>
          <NavLink 
            to="/guide/facilities"
            className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-50 hover:scale-105 hover:transition-transform hover:opacity-100" 
            }
          >
            반려동물 관련 시설
          </NavLink>
          <NavLink 
            to="/guide/walking-course"
            className={({ isActive }) => 
              isActive ? "opacity-100" : "opacity-50 hover:scale-105 hover:transition-transform hover:opacity-100"
            }
          >
            산책 코스
          </NavLink>
        </div>
        
      );
    };
export default GuideNavigation;
