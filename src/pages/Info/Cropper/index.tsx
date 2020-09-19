import React, { Component, useState, useEffect, ChangeEvent } from 'react';
import path from 'path';
import Cropper, { ReactCropperProps } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface CropperProps extends ReactCropperProps {
  imgUrl: string;
}

const Demo: React.FC<CropperProps> = ({ imgUrl = '', ...children }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(imgUrl);
  }, [imgUrl]);

  const onFileChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const onTextChange = (e: any) => {
    setImage(`http://cors-anywhere.herokuapp.com/${e.target.value}`);
  };

  const onTextPaste = (e: any) => {
    const item = e.clipboardData.items[0];
    if (item.type.indexOf('image') === 0) {
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(blob);
    }
  };

  return (
    <>
      <Cropper
        src={image}
        /* minCropBoxHeight={256}
        minCropBoxWidth={256} */
        initialAspectRatio={1}
        viewMode={1}
        guides
        autoCropArea={1}
        background={false}
        crossOrigin="anonymous"
        {...children}
      />

      <div style={{ marginTop: '8px', marginBottom: '8px' }}>
        <input type="file" onChange={onFileChange} />
        <input
          type="text"
          onChange={onTextChange}
          onPaste={onTextPaste}
          style={{ marginLeft: '16px' }}
        />
      </div>
    </>
  );
};

export default Demo;
