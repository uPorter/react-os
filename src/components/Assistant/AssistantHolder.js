import React, { useState, useEffect, useCallback } from "react";
import AssistantChat from "./AssistantChat";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/joy/IconButton'

const AssistantHolder = (props) => {
  const { handleEditorOff, asistantPromptReact, setAssistantModeOnBase } = props;
  const [animationClass, setAnimationClass] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(true);

  const closeEditor = () => {
    setAnimationClass(false);
    setTimeout(() => {
      setAssistantModeOnBase(false);
    }, 550); // Animasyon süresine göre ayarlayın
  };

  window.enableAnimation = () => {
    setAnimationClass(true);
  }

  useEffect(() => {
    // Component render edildikten 0.5 saniye sonra setFirstLoad'u true olarak ayarla
    const timer = setTimeout(() => {
      setFirstLoad(true);
    }, 500);

    // Temizleme fonksiyonunu kullanarak, bileşen yeniden render edildiğinde zamanlayıcıyı temizle
    return () => clearTimeout(timer);
  }, []); // Boş dizi ile kullanıldığında, sadece bileşen monte edildiğinde useEffect çalışır


  return (
    <div
      className={`${animationClass ? "editorActive" : "editorDisabled"}`}
      style={{
        zIndex: "99",
        position: "absolute",
        visibility: !firstLoad ? "hidden" : "visible",
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
