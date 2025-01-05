import React, { useEffect, useRef, useState } from "react";
import "./newprompt.css";
import Upload from "../../upload/Upload";
import { IKImage } from "imagekitio-react";

const NewPrompt = () => {
  const [img,setImg] = useState({
    isLoading:false,
    error:"",
    dbData:{}
  })

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
    {/* ADD NEW CHAT */}
    {img.isLoading && <div className="">Loading...</div>}
    {img.dbData?.filePath && (
      <IKImage 
      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
      path={img.dbData?.filePath}
      width="300"
      transformation={[{width:300}]}
      />
    )}
      <div className="endchat" ref={endRef}></div>
      <div className="newform">
        <div>
          <Upload setImg={setImg}/>
        </div>
        <input type="file" multiple={false} hidden id="file" />
        <input type="text" placeholder="Ask Anything...." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </div>
    </>
  );
};

export default NewPrompt;
