import React, { useRef, useState } from "react";
import image1 from "../../src/images/image-1.webp";
import image2 from "../../src/images/image-2.webp";
import image3 from "../../src/images/image-3.webp";
import image4 from "../../src/images/image-4.webp";
import image5 from "../../src/images/image-5.webp";
import image6 from "../../src/images/image-6.webp";
import image7 from "../../src/images/image-7.webp";
import image8 from "../../src/images/image-8.webp";
import image9 from "../../src/images/image-9.webp";
import image10 from "../../src/images/image-10.jpeg";
import image11 from "../../src/images/image-11.jpeg";
import "./Gallery.css";


const ImageGallery = () => {
  const data = [
    {
      id: 1,
      img: image1,
      check: false,
    },
    {
      id: 2,
      img: image2,
      check: false,
    },
    {
      id: 3,
      img: image3,
      check: false,
    },
    {
      id: 4,
      img: image4,
      check: false,
    },
    {
      id: 5,
      img: image5,
      check: false,
    },
    {
      id: 6,
      img: image6,
      check: false,
    },
    {
      id: 7,
      img: image7,
      check: false,
    },
    {
      id: 8,
      img: image8,
      check: false,
    },
    {
      id: 9,
      img: image9,
      check: false,
    },
    {
      id: 10,
      img: image10,
      check: false,
    },
    {
      id: 11,
      img: image11,
      check: false,
    },
  ];

  const [imgList, setImgList] = useState(data);
  const [select, setSelect] = useState([]);
  const handleUpload = (e) => {
    const data = {
      id: Math.floor(Math.random() * 100 + 1),
      url: e.target.files[0],
      check: false,
    };
    setImgList([...imgList, data]);
  };

  const handleDelete = () => {
    const id = select.map((data) => {
      return data?.id;
    });
    setImgList((pre) => {
      return pre?.filter((data, index) => {
        return !id.includes(data?.id);
      });
    });
    setSelect([]);
  };
  const handleCheck = (value) => {
    const id = value?.id;
    const updateImgList = imgList.map((data, index) => {
      if (data?.id === id) {
        return { ...data, check: !data?.check };
      }
      return data;
    });
    setImgList(updateImgList);

    const isChecked = updateImgList.find((item) => item.id === id);

    if (isChecked?.check) {
      setSelect([...select, value]);
    }
    if (!isChecked?.check) {
      setSelect((pre) => {
        return pre.filter((data) => data.id !== id);
      });
    }
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  

  const handleSort = () => {
    let _imgList = [...imgList];

    const dragItemContent = _imgList.splice(dragItem.current, 1)[0]
    _imgList.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
     setImgList(_imgList)
  }

  return (
    <div className="container">
      <div >
        {select.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px 10px",
            }}
          >
            <h3>{select.length} File Selected</h3>
            <h3
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDelete}
            >
              Delete File
            </h3>
          </div>
        ) : (
          <div>
            <h3>Gallery</h3>
          </div>
        )}

        <div className="galleryContainer">
          {imgList?.map((data, index) => (
            <div
              className={"img img-" + index}
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                onClick={() => handleCheck(data)}
                key={index}
                src={data?.img ? data?.img : URL.createObjectURL(data?.url)}
                alt=""
              />
              <input
                onChange={() => handleCheck(data)}
                className={data?.check === true ? "checkCheckbox" : "checkbox"}
                type="checkbox"
                value={data?.check}
                checked={data?.check}
                name=""
                id=""
              />
            </div>
          ))}
          <label
            className="upload"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            htmlFor="file"
          >
            <p>Add Image</p>
          </label>
          <input onChange={handleUpload} hidden type="file" name="" id="file" />

        </div>
        
      </div>
    </div>
  );
};

export default ImageGallery;