import { useState } from "react";
import "../css/imageUploader.css";
// import Head from "next/head";
// import styles from "../styles/Home.module.scss";


export default function ImageUploader({ onImgChange, setDisableSubmit }) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    console.log(`handleOnChange 1`);
    const reader = new FileReader();
    setDisableSubmit(true);
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit2(event) {
    console.log(`handleOnSubmit 1`);
    event.preventDefault();
    console.log(`handleOnSubmit 2`);

    const form = event.currentTarget;
    // const form = getelementbyid;
    console.log(event.currentTarget);
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    console.log(fileInput);
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "file_uploads");
    console.log(`handleOnSubmit 3`);

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dcatqbel2/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(`handleOnSubmit 4`);

    setImageSrc(data.secure_url);
    setUploadData(data);

    onImgChange(data.secure_url);

    setDisableSubmit(false);

    console.log("data", data);
  }

  return (
    <div className="container">
      <header>
        <meta name="description" content="Upload your image to Cloudinary!" />
        <link rel="icon" href="/favicon.ico" />
      </header>
      <main className="styles.main">
        <form
          id="image_form"
          className="styles.form"
          // method="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit2}
        >
          <p>
            <input type="file" name="file" />
          </p>

          <img height="100px" src={imageSrc} />

          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}
          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </main>
      <footer className="styles.footer"></footer>
    </div>
  );
}
