import { Spin } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFileNames, setAllFileNames] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllFileNames = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_BOOKART_API_URL + "/files",
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
          },
        }
      );
      setAllFileNames(result?.data?.fileNames);
      return result;
    } catch (err) {
      localStorage?.removeItem("accessToken");
      navigate("/");
    }
  };
  const getFile = async (val) => {
    const result = await axios.post(
      process.env.REACT_APP_BOOKART_API_URL + "/files",
      {
        fileName: val,
      },
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        },
      }
    );
    return result;
  };
  const UploadOnClick = async () => {
    setIsLoading(true);

    const result = await axios.post(
      process.env.REACT_APP_BOOKART_API_URL + "/media",
      {
        fileName: selectedFile?.name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        },
      }
    );
    console.log(result);
    if (result?.status >= 200 && result?.status <= 250) {
      const formDatas = new FormData();
      formDatas.append(result?.data?.fileKey, selectedFile);
      const val = await axios.put(result?.data?.body?.uploadUrl, formDatas, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      if (val?.status >= 200 && val?.status <= 250) {
        getAllFileNames();
        setIsLoading(false);
      }
    }

    console.log(selectedFile?.name);
  };
  const downloadFileOnClick = async (val) => {
    const fileUrl = await getFile(val);
    const anchorTag = document.createElement("a");
    anchorTag.href = fileUrl?.data?.fileUrl;
    anchorTag.click();
  };
  useEffect(() => {
    getAllFileNames();
  }, []);
  return (
    <div>
      <div className="upload-btn">
        <input
          type="file"
          id="fileInput"
          className="upload-btn"
          placeholder="Select a File"
          onChange={(event) => {
            const file = event.target.files[0];
            console.log(file);
            // Set the selected file in the state
            setSelectedFile(file);
          }}
        />
        {isLoading ? "" : <button onClick={UploadOnClick}>Upload</button>}
        {isLoading ? <Spin /> : ""}
        <button>Clear</button>
      </div>
      <div className="uploaded">
        <h1>Uploaded Contents</h1>
        <p>
          Here is all the files uploaded, you can download the below files by
          clicking on it.
        </p>
        {allFileNames?.map((val, index) => {
          return (
            <p>
              {index + 1}.
              <a
                onClick={() => {
                  downloadFileOnClick(val);
                }}
                className="clickable-text"
              >
                {val}{" "}
              </a>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Upload;
