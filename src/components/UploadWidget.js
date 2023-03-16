import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcatqbel2",
        uploadpreset: "xmvimtki",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);
  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
      <section> </section>
    </div>
  );
};

export default UploadWidget;
