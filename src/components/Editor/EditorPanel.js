import React, { useState, useEffect, useCallback } from "react";
import Stack from "@mui/joy/Stack";
import SliderX from "./SliderX";
import SliderY from "./SliderY";
import SliderZ from "./SliderZ";
import SliderRotate from "./SliderRotate";
import SliderScale from "./SliderScale";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import './style.css';

const EditorPanel = (props) => {
  const { sendMessage, addEventListener, removeEventListener, objectName, handleEditorOff, setIsDockEditorMode} = props;
  const [animationClass, setAnimationClass] = useState('');
  const [animationHandler, setAnimationHandler] = useState('true');

  useEffect(() => {
    if (animationHandler) {
      setAnimationClass('editorActive');
    } else {
      setAnimationClass('editorDisabled'); // Animasyon süresine göre ayarlayın
    }
  }, [animationHandler]);

  const closeEditor = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleEditorOff();
    }, 550); // Animasyon süresine göre ayarlayın
  };

  window.closeEditorPanel = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleEditorOff();
    }, 550); // Animasyon süresine göre ayarlayın
  };


  return (
    <div
      className={animationClass}
      style={{
        zIndex: "99",
        position: "absolute",
        right: "0px",
        width: "380px",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgb(0 0 0 / 8%) 4rem, rgb(0 0 0 / 25%))",
        backdropFilter: "blur(8px)",
        display: "flex",
        transition: ".2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Stack
        style={{
          transform: "scale(0.9)",
          width: "100%",
          height: "fit-content",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <div
          style={{
            display: "flex",
            marginLeft: "33px",
            position: "relative",
            color: "white",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Typography
            style={{ fontWeight: "400" }}
            textColor="common.white"
            level="h4"
          >
            Position
          </Typography>

          <Typography
            style={{
              textDecoration: "underline",
              position: "absolute",
              right: "30px",
            }}
            textColor="neutral.300"
            level="h6"
          >
            Reset
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "36px",
            marginBottom: "-35px",
            position: "relative",
            color: "white",
            width: "100%",
          }}
        >
          <Typography textColor="common.white" level="h5">
            x
          </Typography>
        </div>
        <SliderX objectName={objectName} sendMessage={sendMessage} addEventListener={addEventListener} removeEventListener={removeEventListener}/>

        <div
          style={{
            display: "flex",
            marginLeft: "36px",
            marginBottom: "-35px",
            marginTop: "-5px",
            position: "relative",
            color: "white",
            width: "100%",
          }}
        >
          <Typography textColor="common.white" level="h5">
            y
          </Typography>
        </div>
        <SliderY objectName={objectName} sendMessage={sendMessage} addEventListener={addEventListener} removeEventListener={removeEventListener}/>

        <div
          style={{
            display: "flex",
            marginLeft: "36px",
            marginTop: "-5px",
            marginBottom: "-30px",
            position: "relative",
            color: "white",
            width: "100%",
          }}
        >
          <Typography textColor="common.white" level="h5">
            z
          </Typography>
        </div>
        <SliderZ objectName={objectName} sendMessage={sendMessage} addEventListener={addEventListener} removeEventListener={removeEventListener}/>

        <div
          style={{
            display: "flex",
            marginLeft: "36px",
            marginTop: "50px",
            position: "relative",
            marginBottom: "-20px",
            color: "white",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Typography textColor="common.white" level="h5">
            Rotation
          </Typography>
        </div>
        <SliderRotate objectName={objectName} sendMessage={sendMessage} addEventListener={addEventListener} removeEventListener={removeEventListener}/>

        <div
          style={{
            display: "flex",
            marginLeft: "36px",
            marginTop: "35px",
            position: "relative",
            marginBottom: "-20px",
            color: "white",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Typography textColor="common.white" level="h5">
            Scale
          </Typography>
        </div>
        <SliderScale objectName={objectName} sendMessage={sendMessage} addEventListener={addEventListener} removeEventListener={removeEventListener}/>

        <Button onClick={closeEditor} className="editorDoneButton">Done</Button>
      </Stack>
    </div>
  );
};

export default EditorPanel;
