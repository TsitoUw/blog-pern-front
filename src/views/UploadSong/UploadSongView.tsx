import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import defaultArtwork from "../../assets/default-artwork.png";
import axios from "../../services/axios"
import axioss from "axios";
type Props = {};

const UploadSongView = (props: Props) => {
  const user = useContext(UserContext);

  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioName, setAudioName] = useState("");
  const [imageData, setImageData] = useState<Uint8Array | null>(null);
  const [imageName, setImageName] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [artist, setArtist] = useState(user?.currentUser ? user.currentUser.name : "");
  const [title, setTitle] = useState("");
  const [canUpload, setCanUpload] = useState(false);

  const [resImageName, setResImageName] = useState("");
  const [resAudioName, setResAudioName] = useState("");

  const [disable, setDisable] = useState(false);
  const inAudioFileRef = useRef<HTMLInputElement>(null);
  const inImageFileRef = useRef<HTMLInputElement>(null);


  // CREATE SONGS ROUTE


  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setName: Dispatch<SetStateAction<string>>,
    setData: Dispatch<SetStateAction<Uint8Array | null>>,
    setImgSrc?: Dispatch<SetStateAction<string>>
  ) => {
    const reader = new FileReader();
    if (e.target.files && e.target.value) {
      setName(e.target.files[0].name);
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = () => {
        setData(new Uint8Array(reader.result as ArrayBufferLike));
        console.log("loaded")
      };
      if (setImgSrc) {
        const readerForDataURL = new FileReader();

        readerForDataURL.readAsDataURL(e.target.files[0]);
        readerForDataURL.onloadend = () => {
          setImgSrc(readerForDataURL.result as string);
        };
      }
    }
  };

  const removeFile = (setName: Dispatch<SetStateAction<string>>) => {
    setName("");
  };

  useEffect(()=>{
    if(title && artist && audioData) setCanUpload(true);
    else setCanUpload(false);
  },[title, artist, audioData]);

  function send(){
    setDisable(true);
    //uploading audio
    upload(audioName, audioData, setResAudioName);

    //uploading artwork
    if(imageName) upload(imageName, imageData, setResImageName);

    setDisable(false);

  }

  function test(){
    const rand = Math.floor(Math.random() * 1000);
    const fname = "" + rand + Date.now().toString() + audioName.substring(audioName.lastIndexOf("."));

    axioss.post("http://localhost:8100/"+fname,audioData,{onUploadProgress:(p)=>{console.log(p.event.loaded/p.event.total*100 + "%")}}).catch(err=>console.log(err))
  }

  function upload(fileName: string, data: Uint8Array | null, setResFileName:Dispatch<SetStateAction<string>>) {
    const rand = Math.floor(Math.random() * 1000);
    const fname = "" + rand + Date.now().toString() + fileName.substring(fileName.lastIndexOf("."));

    axios.post("/users/",{},{onUploadProgress:(p)=>{console.log("isUploading: "+p)}})

    fetch("http://localhost:8000/api/users/songs/" + fname, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="contain flex justify-center items-center w-full mt-2 md:mt-3">
      <div className="card-container w-full md:w-4/5">
        <div className="card-title">Share your music now</div>
        <div className="w-full">
          <div className="songs-info flex flex-col-reverse md:flex-row">
            <div className="media flex flex-col items-center justify-center w-full md:w-3/12">
              <p className="flex w-full items-center justify-start p-2 font-light text-neutral-400">Audio file</p>
              <div className="audio flex w-full">
                <input
                  type="file"
                  id="song"
                  className="hidden"
                  // accept=".mp3,.wav,.m4a,.ogg"
                  onChange={(e) => handleChange(e, setAudioName, setAudioData)}
                  ref={inAudioFileRef}
                />
                <div className="flex flex-col w-full">
                  <button
                    className={audioName ? "button-main" : "button-secondary"}
                    onClick={() => inAudioFileRef.current?.click()}
                  >
                    {!audioName ? "select an audio file" : " change audio file?"}
                  </button>
                  <button onClick={test}>test</button>
                  <p className="flex justify-center text-xs text-neutral-100 truncate">{audioName ? audioName : "No audio selectioned"}</p>
                </div>
              </div>
              <p className="flex w-full items-center justify-start p-2 font-light text-neutral-400">Artwork</p>
              <div className="artwork flex items-center justify-center relative">
                <input
                  type="file"
                  id="song"
                  className="hidden"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleChange(e, setImageName, setImageData, setImgSrc)}
                  ref={inImageFileRef}
                />
                <div className="artwork flex w-full justify-center items-center">
                  <img
                    src={imgSrc ? imgSrc : defaultArtwork}
                    className="img-container rounded-sm w-full aspect-square object-cover bg-emerald-600 flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      inImageFileRef.current?.click();
                    }}
                  />
                </div>

                {!imageData && (
                  <div
                    className="absolute bottom-2 flex flex-col items-center justify-center cursor-pointer bg-slate-800 p-1 rounded-sm "
                    onClick={() => {
                      inImageFileRef.current?.click();
                    }}
                  >
                    <p className="text-center text-sm">Choose an image file </p>
                    <span className="text-xs text-neutral-300">preferably 1000&times;1000px</span>
                  </div>
                )}
                {imageData && (
                  <div className="absolute bottom-2 flex p-1 bg-slate-800 rounded-sm">
                    <p className="">Change artwork</p>
                  </div>
                )}
              </div>
            </div>
            <div className="info w-full flex flex-col items-center md:w-9/12 md:mx-4">
              <p className="flex w-full items-center justify-start p-2 font-light text-neutral-400">Song information</p>
              <div className="title flex w-full">
                <input
                  type="text"
                  className="input-text nobg border-b border-rose-600 focus-visible:border-rose-400"
                  placeholder="Song title*"
                />
              </div>
              <div className="artist flex w-full">
                <input
                  type="text"
                  className="input-text nobg border-b border-rose-600 focus-visible:border-rose-400"
                  placeholder="Artist*"
                />
              </div>
              <div className="description flex w-full">
                <textarea
                  placeholder="Description"
                  className="input-text nobg border-b w-full border-rose-600 outline-none focus-visible:border-rose-400 resize-none h-[15vh] md:h-[17vw] lg:h-[19vw]"
                />
              </div>
            </div>
          </div>
          <div className="button w-full flex items-end">
            <button className={canUpload ? "button-main" : "button-main disabled"} type="submit" disabled={!canUpload} onClick={send}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSongView;
