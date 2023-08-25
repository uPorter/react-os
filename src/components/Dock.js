import React, { Component } from "react";
import AiInput from "./Ai/AiInput";
import AiInputAssistant from "./Ai/AiInputAssistant";
import AiInputChatBot from "./Ai/AiInputChatBot";
import AiInputSearch from "./Ai/AiInputSearch";
import AiInputSkybox from "./Ai/AiInputSkybox";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PresentToAllOutlinedIcon from "@mui/icons-material/PresentToAllOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/joy";
import { useState, useEffect } from "react";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { Toaster, toast } from "sonner";
import Divider from "@mui/joy/Divider";
import VideocamIcon from "@mui/icons-material/Videocam";
import Reactions from "./Reactions";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import StopIcon from "@mui/icons-material/Stop";
import SmartToyIcon from "@mui/icons-material/SmartToyOutlined";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import aiTools from "./AiTools/aiTools";

function Dock({
  handleAddContent,
  toggleFilmingMode,
  toggleAiTools,
  aiToolsOn,
  aiSkyboxGenOn,
  aiSkyboxGenClass,
  aiChatbotOn,
  aiChatbotClass,
  aiCommandsOn,
  aiCommandsClass,
  aiSearchOn,
  aiSearchClass,
  aiAssistantOn,
  aiAssistantClass,
  isAdmin,
}) {
  //const { handleAddContent } = this.props;
  const initialIsScreenShareOn =
    localStorage.getItem("isScreenShareOn") === "true" ? true : false;
  const [isScreenShareOn, setIsScreenShareOn] = useState(
    initialIsScreenShareOn
  );
  const initialIsMicOn =
    localStorage.getItem("isMicOn") === "true" ? true : false;
  const initialIsBaseCameraOn =
    localStorage.getItem("isBaseCameraOn") === "true" ? true : false;
  const [isMicOn, setIsMicOn] = useState(initialIsMicOn);
  const [isDockCameraOn, setIsDockCameraOn] = useState(false);
  const [isBaseCameraOn, setIsBaseCameraOn] = useState(initialIsBaseCameraOn);
  const initalIsRemoteVideoOn =
    localStorage.getItem("isRemoteVideoOn") === "true" ? true : false;
  const [isRemoteVideoOn, setIsRemoteVideoOn] = useState(initalIsRemoteVideoOn);
  const [isReactionsOn, setIsReactionsOn] = useState(false);
  const [reactionClass, setReactionClass] = useState(false);
  const [isReactionsEmojiOn, setIsReactionsEmojiOn] = useState(false);
  const [reactionEmojiClass, setReactionEmojiClass] = useState(false);
  const initalIsVideoRecord =
    localStorage.getItem("isVideoRecord") === "true" ? true : false;
  const [isVideoRecord, setIsVideoRecord] = useState(initalIsVideoRecord);

  const toggleScreenShare = () => {
    if (!isScreenShareOn) {
      window.sendMessageToUnityBasic("VideoHolder", "reactStartScreenShare");
      setIsScreenShareOn(true);
      localStorage.setItem("isScreenShareOn", "true");
    } else {
      window.sendMessageToUnityBasic("VideoHolder", "reactStopScreenShare");
      setIsScreenShareOn(false);
      localStorage.setItem("isScreenShareOn", "false");
    }
  };

  const reactionHandler = () => {
    if (!isReactionsOn) {
      setIsReactionsOn(true);
      setReactionClass(true);
    } else {
      setReactionClass(false);
      const timeout = setTimeout(() => {
        setIsReactionsOn(false);
      }, 400);
      return () => clearTimeout(timeout); // Temizleme fonksiyonu, bileşen güncellendiğinde bu timeout'u temizler.
    }
  };

  const reactionEmojiHandler = () => {
    if (!isReactionsEmojiOn) {
      setIsReactionsEmojiOn(true);
      setReactionEmojiClass(true);
    } else {
      setReactionEmojiClass(false);
      const timeout = setTimeout(() => {
        setIsReactionsEmojiOn(false);
      }, 400);
      return () => clearTimeout(timeout); // Temizleme fonksiyonu, bileşen güncellendiğinde bu timeout'u temizler.
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedIsCameraOn = localStorage.getItem("isCameraOn") === "true";

      if (storedIsCameraOn !== isDockCameraOn) {
        setIsDockCameraOn(storedIsCameraOn);
      }
    }, 100); // 1 saniye aralıkla kontrol ediyoruz

    return () => {
      clearInterval(intervalId); // Component çözüldüğünde interval'i temizliyoruz
    };
  }, [isDockCameraOn]);

  const toggleMic = () => {
    if (!isMicOn) {
      window.sendMessageToUnity("AgoraConnect", "muteLocalAudio", "false");
      setIsMicOn(true);
      localStorage.setItem("isMicOn", "true");
    } else {
      window.sendMessageToUnity("AgoraConnect", "muteLocalAudio", "true");
      setIsMicOn(false);
      localStorage.setItem("isMicOn", "false");
    }
  };

  const toggleVideoRecord = () => {
    if (!isVideoRecord) {
      window.startCanvasRecording();
      setIsVideoRecord(true);
      localStorage.setItem("isVideoRecord", "true");
    } else {
      window.stopCanvasRecording();
      setIsVideoRecord(false);
      localStorage.setItem("isVideoRecord", "false");
    }
  };

  const toggleCam = () => {
    if (!isBaseCameraOn) {
      window.sendMessageToUnity("AgoraConnect", "muteLocalVideo", "false");
      setIsBaseCameraOn(true);
      localStorage.setItem("isBaseCameraOn", "true");
    } else {
      window.sendMessageToUnity("AgoraConnect", "muteLocalVideo", "true");
      setIsBaseCameraOn(false);
      localStorage.setItem("isBaseCameraOn", "false");
    }
  };
  const toggleRemoteCam = () => {
    if (!isRemoteVideoOn) {
      window.sendMessageToUnity("AgoraConnect", "muteRemoteVideo", "false");
      toast("Remote Video Stream Enabled");
      setIsRemoteVideoOn(true);
    } else {
      window.sendMessageToUnity("AgoraConnect", "muteRemoteVideo", "true");
      toast("Remote Video Stream Disabled");
      setIsRemoteVideoOn(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    window.sendMessageToUnity("EmoteHandler", "triggerParticle", emoji.native);
  };

  function onClickEmoji(emojiData) {
    window.sendMessageToUnity(
      "EmoteHandler",
      "triggerParticle",
      emojiData.emoji
    );
    reactionEmojiHandler();
  }

  const mediaHandler = () => {
    if (!isVideoRecord) {
      window.sendMessageToUnityBasic("VideoManager", "takeScreenShot");
    } else {
      toggleVideoRecord();
    }
  };

  const buttonText = isScreenShareOn ? "Stop Screen Share" : "Share Screen";
  const buttonTextMic = isMicOn ? "Mute" : "Unmute";
  const reactionText = isReactionsOn ? "" : "Reactions";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {aiCommandsOn && <AiInput aiCommandsClass={aiCommandsClass} />}
      {aiSkyboxGenOn && <AiInputSkybox aiSkyboxGenClass={aiSkyboxGenClass} />}
      {aiChatbotOn && <AiInputChatBot aiChatbotClass={aiChatbotClass} />}
      {aiSearchOn && <AiInputSearch aiSearchClass={aiSearchClass} />}
      {aiAssistantOn && (
        <AiInputAssistant aiAssistantClass={aiAssistantClass} />
      )}
      {isReactionsEmojiOn && isReactionsOn && (
        <div
          className={`${
            reactionEmojiClass ? "reactionInEmoji" : "reactionOutEmoji"
          }`}
          style={{ position: "absolute", bottom: "130px" }}
        >
          <EmojiPicker
            onEmojiClick={onClickEmoji}
            autoFocusSearch={false}
            theme={Theme.DARK}
            skinTonePickerLocation={SkinTonePickerLocation.NONE}
            emojiVersion="0.6"
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}
      {isReactionsOn && (
        <ClickAwayListener onClickAway={reactionHandler}>
          <Reactions
            reactionEmojiHandler={reactionEmojiHandler}
            reactionClass={reactionClass}
            isReactionsOn={isReactionsOn}
            setIsReactionsOn={setIsReactionsOn}
          />
        </ClickAwayListener>
      )}

      <Box
        sx={{
          transform: "scale(0.9)",
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          zIndex: "15",
        }}
      >
        <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <Button
              size="sm"
              variant="plain"
              sx={{
                fontStyle: "bold",
                fontWeight: "Bold",
                color: "white",
                display: !isReactionsOn ? "block!important" : "none!important",
                padding: "10px",
                marginBottom: "-4px",
                backgroundColor: "#00000040",
                "&:hover": {
                  backgroundColor: "#00000040",
                },
              }}
            >
              {buttonTextMic}
            </Button>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              id="dockButtonID"
              className="dockButtons"
              onClick={toggleMic}
              variant="solid"
              sx={{
                color: isMicOn ? "black" : "white",
                boxShadow: isMicOn
                  ? "0px 0px 20px 5px rgb(0 0 0 / 34%)"
                  : "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: isMicOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                background: isMicOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: isMicOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                  background: isMicOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              {!isMicOn && <MicOffOutlinedIcon />}
              {isMicOn && <MicOutlinedIcon />}
            </IconButton>
          </div>
        </Tooltip>

        {isDockCameraOn && (
          <Tooltip
            className="dockTooltip"
            sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
            interactive
            color="neutral"
            placement="top"
            variant="soft"
            title={
              <div
                className="photoDockHolder"
                style={{ display: !isReactionsOn ? "flex" : "none" }}
              >
                <Button
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#00000000",
                    "&:hover": {
                      backgroundColor: "#00000000",
                    },
                  }}
                >
                  Toggle
                </Button>
                <Divider
                  style={{
                    height: "2px",
                    marginTop: "-4px",
                    marginBottom: "-4px",
                    backgroundColor: "#ffffff26",
                  }}
                  orientation="horizontal"
                />
                <Button
                  onClick={toggleCam}
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                    width: "100%",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#00000000",
                    "&:hover": {
                      backgroundColor: "#00000040",
                    },
                  }}
                >
                  Local Video
                </Button>
                <Button
                  onClick={toggleRemoteCam}
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                    width: "100%",
                    color: "white",
                    padding: "10px",
                    backgroundColor: "#00000000",
                    "&:hover": {
                      backgroundColor: "#00000040",
                    },
                  }}
                >
                  Remote Video
                </Button>
              </div>
            }
          >
            <div
              style={{
                width: "fit-content",
                height: "fit-content",
                animation: "videoIcon 0.3s ease 0s 1 normal forwards",
              }}
              className="tooltipHover2"
            >
              <IconButton
                id="dockButtonID"
                className="dockButtons"
                onClick={toggleCam}
                variant="solid"
                sx={{
                  color: isBaseCameraOn ? "black" : "white",
                  boxShadow: isBaseCameraOn
                    ? "0px 0px 20px 5px rgb(0 0 0 / 34%)"
                    : "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                  backgroundColor: isBaseCameraOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                  background: isBaseCameraOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                  "&:hover": {
                    backgroundColor: isBaseCameraOn
                      ? "white!important"
                      : "rgba(0, 0, 0, 0.250)",
                    background: isBaseCameraOn
                      ? "white!important"
                      : "rgba(0, 0, 0, 0.250)",
                  },
                }}
              >
                {!isBaseCameraOn && <VideocamOffOutlinedIcon />}
                {isBaseCameraOn && <VideocamIcon />}
              </IconButton>
            </div>
          </Tooltip>
        )}

        <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <Button
              size="sm"
              variant="plain"
              sx={{
                fontStyle: "bold",
                display: !isReactionsOn ? "block!important" : "none!important",
                fontWeight: "Bold",
                color: "white",
                padding: "10px",
                marginBottom: "-4px",
                backgroundColor: "#00000040",
                "&:hover": {
                  backgroundColor: "#00000040",
                },
              }}
            >
              {reactionText}
            </Button>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              onClick={reactionHandler}
              className="dockButtons"
              variant="solid"
              sx={{
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g clipPath="url(#clip0_1129_7940)">
                  <path
                    fill="#fff"
                    d="M12.953 5.984c-.531 0-1-.203-1.406-.609-.406-.406-.61-.875-.61-1.406 0-.531.204-.985.61-1.36.406-.406.875-.609 1.406-.609.531 0 1 .203 1.406.61.407.374.61.828.61 1.359s-.203 1-.61 1.406c-.406.406-.875.61-1.406.61z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M7.125 6.219C6.437 5.125 6.062 3.844 6 2.375V2h1.969v.469c0 1.469.515 2.625 1.547 3.469.906.687 1.062 1.03 2.468 1.03 1.844 0 3.47.579 4.875 1.735 1.407 1.219 2.11 2.813 2.11 4.781V14H17v-.516c0-1.312-.469-2.343-1.406-3.093-.125-.125-.328-.235-.61-.329v4.922l-5 .985V8.375a5.084 5.084 0 01-2.859-2.156z"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeLinecap="square"
                    strokeWidth="2.2"
                    d="M10 20l-.702-2.105a1 1 0 01.577-1.245L14 15l3 7"
                  ></path>
                  <path
                    fill="#fff"
                    d="M20 7l.938-2.063L23 4l-2.063-.938L20 1l-.938 2.063L17 4l2.063.938L20 7z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M4.147 6.154L5.15 7.891A5.001 5.001 0 006 16.584v2.126A7.003 7.003 0 014.147 6.154z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1129_7940">
                    <path fill="#fff" d="M0 0H24V24H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <div
              className="photoDockHolder"
              style={{ display: !isReactionsOn ? "flex" : "none" }}
            >
              <Button
                onClick={() =>
                  window.sendMessageToUnityBasic(
                    "VideoManager",
                    "takeScreenShot"
                  )
                }
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  borderRadius: "15px",
                  transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                  width: "100%",
                  padding: "10px",
                  marginBottom: "-4px",
                  backgroundColor: "#00000000",
                  "&:hover": {
                    backgroundColor: "#00000040",
                  },
                }}
              >
                Take a photo (T)
              </Button>
              <Button
                onClick={toggleVideoRecord}
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                  width: "100%",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px",
                  backgroundColor: "#00000000",
                  "&:hover": {
                    backgroundColor: "#00000040",
                  },
                }}
              >
                Record a video (R)
              </Button>
              <Button
                onClick={toggleFilmingMode}
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
                  width: "100%",
                  borderRadius: "15px",
                  padding: "10px",
                  backgroundColor: "#00000000",
                  "&:hover": {
                    backgroundColor: "#00000040",
                  },
                }}
              >
                Filming mode
              </Button>
            </div>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              onClick={mediaHandler}
              id="dockButtonID"
              className="dockButtons"
              variant="solid"
              sx={{
                color: isVideoRecord ? "white" : "white",
                boxShadow: isVideoRecord
                  ? "0px 0px 20px 5px rgb(0 0 0 / 34%)"
                  : "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: isVideoRecord
                  ? "#f33!important"
                  : "rgba(0, 0, 0, 0.250)",
                background: isVideoRecord
                  ? "#f33!important"
                  : "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: isVideoRecord
                    ? "#f33!important"
                    : "rgba(0, 0, 0, 0.250)",
                  background: isVideoRecord
                    ? "#f33!important"
                    : "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              {isVideoRecord && <StopIcon />}
              {!isVideoRecord && <CameraAltOutlinedIcon />}
            </IconButton>
          </div>
        </Tooltip>

        {isAdmin && <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <Button
              onClick={toggleScreenShare}
              size="sm"
              variant="plain"
              sx={{
                fontStyle: "bold",
                fontWeight: "Bold",
                color: "white",
                display: !isReactionsOn ? "block!important" : "none!important",
                padding: "10px",
                marginBottom: "-4px",
                backgroundColor: "#00000040",
                "&:hover": {
                  backgroundColor: "#00000040",
                },
              }}
            >
              {buttonText}
            </Button>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              onClick={toggleScreenShare}
              id="dockButtonID"
              className="dockButtons"
              variant="solid"
              sx={{
                color: isScreenShareOn ? "black" : "white",
                boxShadow: isScreenShareOn
                  ? "0px 0px 20px 5px rgb(0 0 0 / 34%)"
                  : "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: isScreenShareOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                background: isScreenShareOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: isScreenShareOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                  background: isScreenShareOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              <PresentToAllOutlinedIcon style={{}} />
            </IconButton>
          </div>
        </Tooltip>}

        {isAdmin && <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <Button
              size="sm"
              variant="plain"
              sx={{
                fontStyle: "bold",
                fontWeight: "Bold",
                color: "white",
                display: !isReactionsOn ? "block!important" : "none!important",
                padding: "10px",
                marginBottom: "-4px",
                backgroundColor: "#00000040",
                "&:hover": {
                  backgroundColor: "#00000040",
                },
              }}
            >
              AI Tools
            </Button>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              id="dockButtonID"
              onClick={toggleAiTools}
              className="dockButtons"
              variant="solid"
              sx={{
                color: aiToolsOn ? "black" : "white",
                boxShadow: aiToolsOn
                  ? "0px 0px 20px 5px rgb(0 0 0 / 34%)"
                  : "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: aiToolsOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                background: aiToolsOn
                  ? "white!important"
                  : "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: aiToolsOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                  background: aiToolsOn
                    ? "white!important"
                    : "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              <svg
                class="group-5"
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0048 9.20814C20.8663 9.06974 20.7581 8.90393 20.6873 8.72133V8.71971L19.0997 4.59274V4.59031C19.0834 4.54732 19.0544 4.51035 19.0164 4.48442C18.9785 4.45849 18.9334 4.44484 18.8875 4.44532H18.8794C18.8337 4.44517 18.789 4.45898 18.7514 4.48489C18.7138 4.5108 18.6849 4.54758 18.6688 4.59031L18.6672 4.59274L17.0795 8.72133L17.0787 8.72214C17.0082 8.90439 16.9005 9.07044 16.762 9.20895M21.0048 9.20814L21.5451 8.66706ZM21.0048 9.20814C21.1425 9.34584 21.3078 9.45438 21.4908 9.52485L25.6202 11.1133C25.6642 11.13 25.7021 11.1597 25.7289 11.1985C25.7557 11.2373 25.77 11.2832 25.7701 11.3303C25.77 11.377 25.7559 11.4226 25.7294 11.4611C25.7029 11.4996 25.6654 11.5291 25.6218 11.5458L21.4941 13.1334H21.4924C21.3099 13.2041 21.1441 13.3122 21.0058 13.4507C20.8674 13.5892 20.7595 13.7551 20.6889 13.9377L19.0997 18.0671C19.0831 18.1109 19.0536 18.1486 19.015 18.1752C18.9764 18.2019 18.9307 18.2161 18.8838 18.2161C18.837 18.2161 18.7912 18.2019 18.7527 18.1752C18.7141 18.1486 18.6846 18.1109 18.668 18.0671L17.0811 13.9402V13.9385C17.0105 13.7559 16.9025 13.5901 16.764 13.4517C16.6254 13.3133 16.4595 13.2055 16.2768 13.135L12.1725 11.5555L12.1636 11.5523C12.1157 11.5347 12.0743 11.5028 12.045 11.461C12.0157 11.4191 12 11.3693 12 11.3182C12.0014 11.274 12.0158 11.2312 12.0415 11.1951C12.0671 11.1591 12.1029 11.1315 12.1442 11.1157L12.1474 11.1141L16.2744 9.52728H16.276C16.4582 9.456 16.6243 9.34746 16.762 9.20895M16.762 9.20895L16.2217 8.66868Z"
                  fill="currentColor"
                  id="path1"
                  fill-opacity="0.74"
                ></path>
                <path
                  d="M20.6873 8.72133C20.7581 8.90393 20.8663 9.06974 21.0048 9.20814C21.1425 9.34584 21.3078 9.45438 21.4908 9.52485L25.6202 11.1133C25.6642 11.13 25.7021 11.1597 25.7289 11.1985C25.7557 11.2373 25.77 11.2832 25.7701 11.3303C25.77 11.377 25.7559 11.4226 25.7294 11.4611C25.7029 11.4996 25.6654 11.5291 25.6218 11.5458L21.4941 13.1334H21.4924C21.3099 13.2041 21.1441 13.3122 21.0058 13.4507C20.8674 13.5892 20.7595 13.7551 20.6889 13.9377L19.0997 18.0671C19.0831 18.1109 19.0536 18.1486 19.015 18.1752C18.9764 18.2019 18.9307 18.2161 18.8838 18.2161C18.837 18.2161 18.7912 18.2019 18.7527 18.1752C18.7141 18.1486 18.6846 18.1109 18.668 18.0671L17.0811 13.9402V13.9385C17.0105 13.7559 16.9025 13.5901 16.764 13.4517C16.6254 13.3133 16.4595 13.2055 16.2768 13.135L12.1725 11.5555L12.1636 11.5523C12.1157 11.5347 12.0743 11.5028 12.045 11.461C12.0157 11.4191 12 11.3693 12 11.3182C12.0014 11.274 12.0158 11.2312 12.0415 11.1951C12.0671 11.1591 12.1029 11.1315 12.1442 11.1157L12.1474 11.1141L16.2744 9.52728H16.276C16.4582 9.456 16.6243 9.34746 16.762 9.20895C16.9005 9.07044 17.0082 8.90439 17.0787 8.72214L17.0795 8.72133L18.6672 4.59274L18.6688 4.59031C18.6849 4.54758 18.7138 4.5108 18.7514 4.48489C18.789 4.45898 18.8337 4.44517 18.8794 4.44532H18.8875C18.9334 4.44484 18.9785 4.45849 19.0164 4.48442C19.0544 4.51035 19.0834 4.54732 19.0997 4.59031V4.59274L20.6873 8.71971V8.72133Z"
                  fill="currentColor"
                  fill-opacity=""
                  id="path1"
                ></path>
                <path
                  d="M6.13251 3.60059C6.18232 3.72937 6.25846 3.84635 6.35607 3.94403C6.45327 4.04204 6.57072 4.11818 6.70032 4.1684L9.6147 5.28943C9.64564 5.30136 9.67225 5.32236 9.69105 5.34968C9.70984 5.377 9.71993 5.40936 9.72 5.44252C9.72011 5.47562 9.71007 5.50796 9.69125 5.53519C9.67242 5.56241 9.64571 5.58322 9.6147 5.5948L6.70194 6.71503C6.57298 6.76493 6.45505 6.84121 6.35727 6.93899C6.2595 7.03676 6.18322 7.15388 6.13332 7.28284V7.28446L5.01147 10.1972C4.99977 10.2282 4.97894 10.2548 4.95174 10.2736C4.92453 10.2924 4.89225 10.3024 4.85919 10.3024C4.82613 10.3024 4.79385 10.2924 4.76665 10.2736C4.73944 10.2548 4.71861 10.2282 4.70691 10.1972L3.58668 7.28446V7.28284C3.53695 7.15401 3.46082 7.03701 3.36317 6.93936C3.26552 6.84171 3.14851 6.76557 3.01968 6.71584H3.01806L0.121501 5.60128L0.115021 5.59886C0.0812316 5.58641 0.0520801 5.56389 0.0315087 5.53433C0.0109373 5.50478 -6.13393e-05 5.46962 2.57314e-07 5.43361C0.000870375 5.40229 0.0110391 5.37193 0.0292132 5.3464C0.0473873 5.32087 0.0727451 5.30132 0.10206 5.29024H0.103681L3.01725 4.16921C3.14685 4.11899 3.2643 4.04284 3.3615 3.94483C3.45951 3.84763 3.53565 3.73019 3.58587 3.60059L4.70772 0.686206V0.684585C4.71925 0.654442 4.73968 0.628527 4.76631 0.610293C4.79294 0.592059 4.82449 0.582373 4.85676 0.582525H4.86243C4.89473 0.582258 4.92633 0.591898 4.95298 0.610147C4.97963 0.628396 5.00004 0.654376 5.01147 0.684585V0.686206L6.13251 3.60059Z"
                  fill="currentColor"
                  id="path2"
                  fill-opacity="0.84"
                ></path>
                <path
                  d="M10.3561 20.5124C10.2585 20.4147 10.1823 20.2977 10.1325 20.1689L9.01149 17.2546V17.2529C9.00006 17.2227 8.97965 17.1968 8.953 17.1785C8.92635 17.1603 8.89475 17.1506 8.86245 17.1509H8.85678C8.82451 17.1507 8.79296 17.1604 8.76633 17.1787C8.7397 17.1969 8.71927 17.2228 8.70774 17.2529V17.2546L7.58588 20.1689C7.53566 20.2985 7.45952 20.416 7.36151 20.5132M10.3561 20.5124L10.7384 20.1309ZM10.3561 20.5124C10.4533 20.6104 10.5707 20.6865 10.7003 20.7368L13.6147 21.8578C13.6456 21.8697 13.6723 21.8907 13.691 21.918C13.7098 21.9454 13.7199 21.9777 13.72 22.0109C13.7201 22.044 13.7101 22.0763 13.6912 22.1035C13.6724 22.1308 13.6457 22.1516 13.6147 22.1632L10.702 23.2834C10.573 23.3333 10.4551 23.4096 10.3573 23.5073C10.2595 23.6051 10.1832 23.7222 10.1333 23.8512V23.8528L9.01149 26.7656C8.99979 26.7965 8.97896 26.8231 8.95176 26.8419C8.92455 26.8607 8.89227 26.8708 8.85921 26.8708C8.82615 26.8708 8.79387 26.8607 8.76667 26.8419C8.73947 26.8231 8.71863 26.7965 8.70693 26.7656L7.58669 23.8528V23.8512C7.53696 23.7224 7.46083 23.6054 7.36318 23.5077C7.26553 23.4101 7.14853 23.3339 7.01969 23.2842H7.01807L4.1215 22.1696L4.11502 22.1672C4.08123 22.1548 4.05208 22.1322 4.03151 22.1027C4.01094 22.0731 3.99994 22.038 4 22.002C4.00087 21.9706 4.01104 21.9403 4.02921 21.9148C4.04739 21.8892 4.07275 21.8697 4.10206 21.8586H4.10368L7.01726 20.7376C7.14686 20.6873 7.26431 20.6112 7.36151 20.5132M7.36151 20.5132L6.98 20.1317Z"
                  id="path3"
                  fill="currentColor"
                  fill-opacity="0.95"
                ></path>
              </svg>
            </IconButton>
          </div>
        </Tooltip>}

        {isAdmin && <Tooltip
          className="dockTooltip"
          sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          interactive
          color="neutral"
          placement="top"
          variant="soft"
          title={
            <Button
              size="sm"
              variant="plain"
              sx={{
                fontStyle: "bold",
                fontWeight: "Bold",
                color: "white",
                display: !isReactionsOn ? "block!important" : "none!important",
                padding: "10px",
                marginBottom: "-4px",
                backgroundColor: "#00000040",
                "&:hover": {
                  backgroundColor: "#00000040",
                },
              }}
            >
              Add Content
            </Button>
          }
        >
          <div
            style={{ width: "fit-content", height: "fit-content" }}
            className="tooltipHover2"
          >
            <IconButton
              id="dockButtonID"
              onClick={handleAddContent}
              className="dockButtons"
              variant="solid"
              sx={{
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
              }}
            >
              <AddOutlinedIcon />
            </IconButton>
          </div>
        </Tooltip>}
      </Box>
    </div>
  );
}

export default Dock;
