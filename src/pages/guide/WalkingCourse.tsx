import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png"


const WalkingCourse = () => {
    return (
        <div className="flex flex-col justify-center items-center ">
          <div className="max-w-[1200px] mx-auto ">
            <div className=" relative">
              <div className="bg-slate-400"></div>
              <img src={Walk} alt="walk" className="w-[1200px] h-[400px] opacity-85 object-cover object-bottom" />
              <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
                <div className="text-[50px] pb-2">산책 코스</div>
                <div className="text-[25px]">가까운 산책 코스를 찾아드립니다.</div>
              </div>
            </div>
            <GuideNavigation />
            
          </div>
        </div>
      );
};

export default WalkingCourse;