import React, { Component } from "react";
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
      {isReactionsEmojiOn && (
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

        <Tooltip
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
        </Tooltip>

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
              style={{transform:"scaley(-0.9)"}}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                ariaHidden="true"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M24.117 7.88a1.737 1.737 0 01-.392-.601v-.002l-1.96-5.095v-.003A.277.277 0 0021.503 2h-.01a.277.277 0 00-.26.179l-.002.003-1.96 5.097-.001.001c-.087.225-.22.43-.391.601m5.237-.001l.668-.668m-.668.668c.17.17.375.304.601.391h.001l5.097 1.961A.287.287 0 0130 10.5a.285.285 0 01-.183.266l-5.096 1.96h-.002a1.736 1.736 0 00-.992.993v.001l-1.962 5.097a.285.285 0 01-.533 0l-1.959-5.095v-.002a1.733 1.733 0 00-.993-.992h-.001l-5.066-1.95-.011-.004a.308.308 0 01-.202-.289.277.277 0 01.178-.25l.004-.002 5.095-1.959h.002c.225-.088.43-.221.6-.392m0 0l-.667-.668M9.847 21.15a1.225 1.225 0 01-.276-.424v-.001l-1.384-3.597v-.002A.195.195 0 008.003 17h-.007a.196.196 0 00-.184.126v.002l-1.385 3.598v.001c-.062.16-.156.304-.277.424m3.697 0l.472-.472m-.472.471c.12.121.265.215.425.277l3.598 1.384A.203.203 0 0114 23a.2.2 0 01-.13.188l-3.596 1.383h-.001a1.226 1.226 0 00-.701.701v.002L8.187 28.87a.201.201 0 01-.376 0l-1.383-3.596v-.002a1.222 1.222 0 00-.7-.7h-.002L2.15 23.196l-.008-.003A.217.217 0 012 22.989a.195.195 0 01.126-.177h.002l3.597-1.384h.001c.16-.062.304-.156.424-.277m0 0l-.471-.471"
                ></path>
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
        </Tooltip>
      </Box>
    </div>
  );
}

export default Dock;
