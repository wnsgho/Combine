import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png"

const Facilities = () => {
    return (
        <div className="flex flex-col justify-center items-center ">
          <div className="max-w-[1200px] mx-auto ">
            <div className=" relative">
              <div className="bg-slate-400"></div>
              <img src={Walk} alt="walk" className="w-[1200px] h-[400px] opacity-85 object-cover object-bottom" />
              <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
                <div className="text-[50px] pb-2">반려동물 관련 시설</div>
                <div className="text-[25px]">주변 관리 시설을 찾아드립니다.</div>
              </div>
            </div>
            <GuideNavigation />
            
          </div>
        </div>
      );
};

export default Facilities;