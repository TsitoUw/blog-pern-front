import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import defaultArtwork from "../../assets/default-artwork.png";
import axios from "../../services/axios";

const UploadSongView = () => {
  const user = useContext(UserContext);

  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [audioName, setAudioName] = useState("");
  const [imageData, setImageData] = useState<Uint8Array | null>(null);
  const [imageName, setImageName] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [artist, setArtist] = useState(user?.currentUser ? user.currentUser.artistname : "");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [dateType, setDateType] = useState<"text" | "date">("text");
  const [description, setDescription] = useState("");
  const [canUpload, setCanUpload] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);

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
      reader.onloadstart = () => {
        console.log("charging data to memory");
        setIsLoadingFile(true);
        setDisable(true);
      };
      reader.onload = () => {
        setData(new Uint8Array(reader.result as ArrayBufferLike));
        setIsLoadingFile(false);
        setDisable(false);
        console.log("loaded");
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

  useEffect(() => {
    if (title !== "" && title.trim() !== "" && artist !== "" && artist.trim() !== "" && audioData !== null)
      setCanUpload(true);
    else setCanUpload(false);
  }, [title, artist, audioData]);

  function generateRandomFileName(from: string) {
    const rand = Math.random().toString(10).slice(15);
    const date = Date.now().toString();
    const ext = from.substring(from.lastIndexOf("."));
    return `${rand}${date}${ext}`;
  }

  async function chunkUpload(
    data: Uint8Array,
    fileName: string,
    type: "artwork" | "userpic" | "audio",
    chunk_sz?: number
  ) {
    const fname = generateRandomFileName(fileName);
    const CHUNK_SIZE = chunk_sz ? 1024 * 1024 * chunk_sz : 1024 * 1024;
    const chunkLen = data.byteLength;
    const chunkNumber = Math.ceil(chunkLen / CHUNK_SIZE);
    let url: string;
    switch (type) {
      case "artwork":
        url = "/songs/artwork/" + fname;
        break;
      case "audio":
        url = "/songs/audio/" + fname;
        break;
      case "userpic":
        url = "/userpic/" + fname;
        break;
    }

    let index = 0;
    let chunkSent = 0;

    do {
      const chunkedData = data.slice(CHUNK_SIZE * index, CHUNK_SIZE * ++index);
      // overall progress
      console.log(Math.floor((index * 100) / chunkNumber) + "%");
      let result: unknown;
      await axios
        .post(url, chunkedData, {
          headers: {
            "Access-Control-Allow-Origin": "*",            
            "Content-Type": "application/octet-stream",
          },
          onUploadProgress(progressEvent) {
            // handle each chunk progress here
          },
        })
        .then((res) => {
          result = res;
        });
      if (!result) break;
      chunkSent += CHUNK_SIZE;
    } while (chunkSent < chunkLen);

    return fname;
  }

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user?.currentUser?.id) throw new Error("User should be logged");
    // setDisable(true);
    if (!audioData) return;
    console.log("-- uploading audio --");
    const audioResFilename = await chunkUpload(audioData, audioName, "audio");
    console.log("-- uploading artwork --");
    let artworkResFilename = null;
    if (imageData) artworkResFilename = await chunkUpload(imageData, imageName, "artwork");

    // Sending all text info
    const songsInformations = {
      ownerId: user?.currentUser?.id,
      artist: artist,
      title: title,
      filename: audioResFilename,
      description: description,
      releaseDate: releaseDate,
      artwork: artworkResFilename,
    };

    await axios
      .post("/songs/", { ...songsInformations })
      .then((res) => {
        console.log(res);
        setDisable(false);
      })
      .catch((err) => {
        setDisable(false);
        console.log(err);
      });
  }

  return (
    <div className="contain flex justify-center items-center w-full mt-2 md:mt-3">
      <div className="card-container w-full md:w-4/5">
        <div className="card-title">Share your music now</div>
        <form className="w-full" onSubmit={(e) => send(e)}>
          <div className="songs-info flex flex-col-reverse md:flex-row">
            <div className="media flex flex-col items-center justify-center w-full md:w-3/12">
              <p className="flex w-full items-center justify-start p-2 py-5 md:p-2 font-light text-neutral-400">
                Audio file
              </p>
              <div className="audio flex w-full">
                <input
                  type="file"
                  id="song"
                  className="hidden"
                  accept=".mp3,.wav,.m4a,.ogg"
                  onChange={(e) => handleChange(e, setAudioName, setAudioData)}
                  ref={inAudioFileRef}
                  disabled={disable || isLoadingFile}
                />
                <div className="flex flex-col w-full">
                  <button
                    className={audioName ? "button-main" : "button-secondary"}
                    onClick={() => inAudioFileRef.current?.click()}
                    name="select-file"
                  >
                    {!audioName ? "select an audio file" : " change audio file?"}
                  </button>
                  <p className="flex justify-center text-xs text-neutral-100 truncate">
                    {audioName ? audioName : "No audio selectioned"}
                  </p>
                </div>
              </div>
              <p className="flex w-full items-center justify-start p-2 py-5 md:p-2 font-light text-neutral-400">
                Artwork
              </p>
              <div className="artwork flex items-center justify-center relative">
                <input
                  type="file"
                  id="song"
                  className="hidden"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => handleChange(e, setImageName, setImageData, setImgSrc)}
                  ref={inImageFileRef}
                  disabled={disable || isLoadingFile}
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
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="artist flex w-full">
                <input
                  type="text"
                  className="input-text nobg border-b border-rose-600 focus-visible:border-rose-400"
                  placeholder="Artist*"
                  value={artist}
                  onChange={(e) => {
                    setArtist(e.target.value);
                  }}
                />
              </div>
              <div className="description flex w-full">
                <textarea
                  placeholder="Description"
                  className="input-text nobg border-b w-full border-rose-600 outline-none focus-visible:border-rose-400 resize-none h-[15vh] md:h-[15vw] lg:h-[15vw]"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="release-date flex w-full">
                <input
                  type={dateType}
                  className="input-text nobg border-b border-rose-600"
                  onFocus={() => {
                    setDateType("date");
                  }}
                  onBlur={() => {
                    if (releaseDate !== "") {
                      setDateType("text");
                    }
                  }}
                  onChange={(e) => {
                    setReleaseDate(e.target.value);
                    console.log(releaseDate);
                  }}
                  value={releaseDate}
                  placeholder="Release date"
                />
              </div>
            </div>
          </div>
          <div className="button w-full flex items-end">
            <button
              className={canUpload ? "button-main" : "button-main disabled"}
              type="submit"
              disabled={!canUpload || disable}
              name="upload"

            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSongView;
