import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import Header from "../../components/Header";
import axios from "axios";

interface PetAdd {
  species: string;
  name: string;
  age: string;
  gender: string;
  reason: string;
  inoculation: string;
  neutering: string;
  personality: string;
  exerciseLevel: number;
  size: string;
  home: string;
  shelterName: string;
  add: string;
}

interface ShelterName {
  shelterName: string;
}


const DetailPage = () => {
  const [postImg, setPostImg] = useState<File[]>([]); // 업로드된 파일 리스트
  const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지 URL 리스트
  const [Id, setId] = useState("");
  const [shelterInfo, setShelterInfo] = useState({
    shelterName: ""
  });
  const [addPet, setAddPet] = useState<PetAdd>({
    species: "",
    name: "",
    age: "",
    gender: "",
    reason: "",
    inoculation: "", 
    neutering: "",
    personality: "",
    exerciseLevel: 0,
    size: "",
    home: "",
    shelterName: "",
    add: "",
  });



  // ID 불러오기
  useEffect(() => {
    const shelterId = async () => {
      try {
        const response = await axios.get(`/api/v1/features/check-id`);
        setId(response.data);
      } catch(error) {
        console.error("보호소 ID를 불러오는 중 오류 발생:", error);
      }
    };
    shelterId();
  }, [])

  useEffect(() => {
    const shelterInfo = async () => {
      try {
        const response = await axios.get<ShelterName>(`/api/v1/shelters/${Id}`);
        setShelterInfo(response.data);
      } catch(error) {
        console.error("보호소 정보를 불러오는 중 오류 발생:", error);
      }
    };
    shelterInfo();
  }, [Id])



  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;

    if (fileArr) {
      const fileList = Array.from(fileArr); // File 객체 배열로 변환

      // 기존 이미지와 새로운 이미지를 합쳐 저장
      setPostImg((prev) => [...prev, ...fileList]);

      // 새로운 이미지를 읽어와 미리보기 URL 추가
      const fileUrlPromises = fileList.map(
        (file) =>
          new Promise<string>((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.result) {
                resolve(fileReader.result as string);
              }
            };
            fileReader.readAsDataURL(file);
          })
      );

      // 모든 파일 URL 생성 후 상태 업데이트
      Promise.all(fileUrlPromises).then((urls) => {
        setPreviewImg((prev) => [...prev, ...urls]);
      });
    }
  };


  const InputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAddPet((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 차단
    addPetInfo();
  };

  const addPetInfo = async (): Promise<void> => {
    const formData = new FormData();
  
    // Add pet data
    Object.entries(addPet).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Add shelterName explicitly
    formData.append("shelterName", shelterInfo.shelterName);
  
    // Add images
    postImg.forEach((file) => {
      formData.append("imageUrls", file);
    });
  
    try {
      await axios.post(`/api/v1/pets/${Id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("동물 등록이 완료되었습니다.");
    } catch (error) {
      console.error("동물 등록 중 오류 발생:", error);
      alert("동물 등록에 실패했습니다.");
    }
  };
  

  return (
    <>
      <Header />
      <form className="flex flex-col items-center mt-10" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-10 text-2xl font-bold text-mainColor">정보를 입력해주세요</h3>
        </div>
        <section className="flex flex-wrap gap-4">
          {/* 미리보기 이미지 렌더링 */}
          {previewImg.map((imgSrc, i) => (
            <div
              key={i}
              className="relative w-24 h-24 overflow-hidden border rounded"
            >
              <button
                type="button"
                onClick={() => {
                  // 이미지 제거 로직
                  setPreviewImg((prev) => prev.filter((_, index) => index !== i));
                  setPostImg((prev) => prev.filter((_, index) => index !== i));
                }}
                className="absolute p-1 bg-white rounded-full top-1 right-1"
              >
                <GoX />
              </button>
              <img
                src={imgSrc}
                alt={`업로드된 이미지 ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {/* 업로드 가능한 경우 업로드 버튼 표시 */}
          {postImg.length < 5 && (
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center w-24 h-24 border border-dashed rounded cursor-pointer"
            >
              <span>+</span>
            </label>
          )}

          {/* 파일 업로드 입력 */}
          <input
            id="fileUpload"
            type="file"
            onChange={saveImgFile}
            accept="image/*"
            multiple
            className="hidden"
          />
        </section>
        <section className="mt-20">
          <div className="flex flex-col flex-wrap gap-6">
            <div className="flex items-center justify-between gap-72">
              <label htmlFor="species" className="text-xl">종류</label>
              <select id="species" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>종류</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="text-xl">이름</label>
              <input type="text" id="name" placeholder="예) 코코, 흰둥이" className="pl-3 w-36" onChange={InputChange}/>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="age" className="text-xl">연령</label>
              <select id="age" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>연령</option>
                <option value="young">0~3살</option>
                <option value="middleAge">4~6살</option>
                <option value="oldAge">7~10살</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="gender" className="text-xl">성별</label>
              <select id="gender" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>성별</option>
                <option value="cock">수컷</option>
                <option value="female">암컷</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="reason" className="text-xl">보호소로 오게 된 이유</label>
              <input type="text" id="reason" placeholder="예) 유기, 보호자 병환" className="pl-2 w-36" onChange={InputChange}/>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="inoculation" className="text-xl">접종 유무</label>
              <select id="inoculation" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>접종유무</option>
                <option value="1">1차</option>
                <option value="2">2차</option>
                <option value="3">3차</option>
                <option value="4">4차</option>
                <option value="5">5차</option>
                <option value="6">6차</option>
                <option value="no">미접종</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="neutering" className="text-xl">중성화 유무</label>
              <select id="neutering" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>중성화유무</option>
                <option value="yes">완료</option>
                <option value="no">미완료</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="personality" className="text-xl">성격</label>
              <select id="personality" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>성격</option>
                <option value="good">얌전함</option>
                <option value="activity">활발함</option>
                <option value="ferocity">사나움</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="exerciseLevel" className="text-xl">활동량</label>
              <select id="exerciseLevel" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>적음 1 ~ 많음 5</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="size" className="text-xl">크기</label>
              <select id="size" className="pl-2 text-xs border bg-gray-50 border-mainColor" onChange={InputChange}>
                <option selected>크기</option>
                <option value="small">소형</option>
                <option value="middle">중형</option>
                <option value="big">대형</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="home" className="text-xl">맡겨지기 전 가정환경</label>
              <input type="text" id="home" placeholder="예) 임시보호, 사육장" className="pl-2 w-36" onChange={InputChange}/>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="shelterName" className="text-xl">보호기관</label>
              <input
                id="shelterName"
                className="pl-2 bg-gray-100 cursor-not-allowed w-36" // 읽기 전용 스타일 추가
                value={shelterInfo.shelterName} // 보호소 이름
                readOnly // 읽기 전용으로 설정
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="add" className="text-xl">추가 정보(선택사항)</label>
              <input type="text" id="add" placeholder="동물 추가정보 작성" className="pl-2 w-36" onChange={InputChange}/>
            </div>
          </div>
        </section>
        <div className="flex gap-32 my-10">
          <button className="text-mainColor" onClick={addPetInfo}>등록</button>
          <button className="text-cancelColor">취소</button>
        </div>
      </form>
    </>
  );
};

export default DetailPage;

