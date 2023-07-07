"use client";

import React, { useCallback, useState } from "react";
import {
  Loader2,
  Minus,
  Plus,
  Redo,
  Trash,
  Undo,
  Upload,
  XCircle,
  XIcon,
} from "lucide-react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

export function AvatarUploader3({
  image1,
  height = "h-40",
  width = "w-40",
  onDelete,
  onUpload,
  success,
  error,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImage(acceptedFiles[0]);
    if (editorOpen) {
      return; // Prevent dropzone trigger when the editor is open
    }
    setEditorOpen(true);
  }, []);

  const [image, setImage] = useState("");
  const editorRef = React.useRef(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const getCroppedImg = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      setImage(dataUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: editorOpen,
    noKeyboard: editorOpen,
  });
  return (
    <div className="max-w-xs p-0 ">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {editorOpen ? (
          <>
            <ImageEditor editorRef={editorRef} image={image} />
            <div className=""></div>
            <ActionsButtons />
          </>
        ) : (
          <ImagePreview
            image={image}
            height={height}
            width={width}
            isDragActive={isDragActive}
          />
        )}
      </div>
    </div>
  );
}

// TODO: image fallback

const ImagePreview = ({ image, height, width, isDragActive }) => {
  return image ? (
    <div className="flex flex-col items-center justify-center">
      <img
        src={image}
        alt="Preview"
        className={cn(`object-cover rounded-full`, height, width)}
      />
    </div>
  ) : (
    <Placeholder />
  );
};

const ImageEditor = ({ editorRef, image }) => {
  const [flip, setFlip] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  return (
    <div className="flex flex-col items-center justify-center">
      <AvatarEditor
        ref={editorRef}
        width={250}
        height={250}
        image={image}
        scale={scale}
        rotate={rotate}
        flip={flip}
        zoom={zoom}
      />
      <CropControls
        scale={scale}
        setScale={setScale}
        rotate={rotate}
        setRotate={setRotate}
        flip={flip}
        setFlip={setFlip}
        zoom={zoom}
        setZoom={setZoom}
      />
    </div>
  );
};

// crop controls: scale, rotate, flip, zoom

const CropControls = ({
  scale,
  setScale,
  rotate,
  setRotate,
  flip,
  setFlip,
  zoom,
  setZoom,
}) => {
  return (
    <div className="inline-flex items-center justify-center mt-3 space-x-3 rounded-md shadow-sm">
      <div className="flex flex-row items-center justify-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setRotate(rotate - 90)}
          type="button"
        >
          <Undo />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setRotate(rotate + 90)}
          type="button"
        >
          <Redo />
        </Button>
      </div>
      <div className="flex flex-row items-center justify-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale - 0.1)}
          type="button"
        >
          <Minus />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale + 0.1)}
          type="button"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

const ActionsButtons = ({ onUpload, onDelete, success, error }) => {
  return (
    <div className="flex flex-row items-center justify-center mt-3 space-x-5 rounded-md shadow-sm">
      <Button type="button" variant="ghost" className="bg-teal-400 " size="lg">
        <Upload />
      </Button>

      <Button type="button" variant="ghost" size="lg">
        <XIcon />
      </Button>
    </div>
  );
};
const Loading = ({ show = false, width, height }) => {
  return show ? (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-lg",
        width,
        height
      )}
    >
      <Loader2 className="animate-spin" size={50} />
    </div>
  ) : null;
};

const Placeholder = ({
  children,
  className,
  onClick,
  width = "w-40",
  height = "h-40",
}) => {
  return (
    <div
      className={cn(
        className,
        height,
        width,
        "bg-slate-500 rounded-lg cursor-pointer hover:opacity-75 flex flex-col items-center justify-center"
      )}
      onClick={onClick}
    >
      {children} <Upload className="text-white" size={50} />
    </div>
  );
};

export default AvatarUploader3;
