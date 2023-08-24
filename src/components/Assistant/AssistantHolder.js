import React, { useState, useEffect, useCallback } from "react";
import AssistantChat from "./AssistantChat";

const AssistantHolder = (props) => {
  const { handleEditorOff } = props;
  const [animationClass, setAnimationClass] = useState("");
  const [animationHandler, setAnimationHandler] = useState("true");
  const [isEditorMode, setIsEditorMode] = useState(true);

  useEffect(() => {
    if (animationHandler) {
      setAnimationClass("editorActive");
    } else {
      setAnimationClass("editorDisabled"); // Animasyon süresine göre ayarlayın
    }
  }, [animationHandler]);

  const closeEditor = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleEditorOff();
    }, 550); // Animasyon süresine göre ayarlayın
  };

  window.closeAssistantPanel = () => {
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
        background:
          "linear-gradient(90deg, transparent, rgb(0 0 0 / 15%) 4rem, rgb(0 0 0 / 35%))",
        backdropFilter: "blur(8px)",
        display: "flex",
        transition: ".2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <AssistantChat />
    </div>
  );
};

export default AssistantHolder;
