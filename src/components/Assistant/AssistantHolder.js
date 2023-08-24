import React, { useState, useEffect, useCallback } from "react";
import AssistantChat from "./AssistantChat";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const AssistantHolder = (props) => {
  const { handleEditorOff, asistantPromptReact, setAssistantModeOnBase } = props;
  const [animationClass, setAnimationClass] = useState(true);
  const [animationHandler, setAnimationHandler] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(true);

  const closeEditor = () => {
    setAnimationClass(false);
    setTimeout(() => {
      setAssistantModeOnBase(false);
    }, 550); // Animasyon süresine göre ayarlayın
  };

  return (
    <div
      className={`${animationClass ? "editorActive" : "editorDisabled"}`}
      style={{
        zIndex: "99",
        position: "absolute",
        right: "0px",
        width: "400px",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgb(0 0 0 / 15%) 4rem, rgb(0 0 0 / 35%))",
        backdropFilter: "blur(8px)",
        display: "flex",
        transition: ".2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <IconButton
        id="dockButtonID"
        className="dockButtons"
        onClick={closeEditor}
        variant="solid"
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "transparent"
        }}
      >
        <CloseOutlinedIcon></CloseOutlinedIcon>
      </IconButton>
      <AssistantChat asistantPromptReact={asistantPromptReact} />
    </div>
  );
};

export default AssistantHolder;
