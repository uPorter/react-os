import { ChangeEvent, useState, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Dock from "./Dock";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import { Button } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import Loader from "./Loader";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import FileUpload from "./FileUpload.js";
import ChatComponent from "./ChatComponent";
import { StreamChat } from "stream-chat";
import { Toaster, toast } from "sonner";
import "stream-chat-react/dist/css/index.css";
import EditorPanel from "./Editor/EditorPanel";
import AddContent from "./AddContent/AddContent";
import EditDock from "./EditDock";
import GuestDock from "./GuestDock";
import { useParams } from "react-router-dom";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import InfoPanel from "./InfoPanel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AiToolsBase from "./AiTools/aiTools";
import AssistantHolder from "./Assistant/AssistantHolder";

const chatClient = StreamChat.getInstance("7q2yg6eutsf9");

const UnityLoader = () => {
  const { spaceName, name, id, admin } = useParams();

  const {
    unityProvider,
    UNSAFE__unityInstance,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "/unitybuild2/Build.loader.js",
    dataUrl: "/unitybuild2/Build.data.unityweb",
    frameworkUrl: "/unitybuild2/Build.framework.js.unityweb",
    codeUrl: "/unitybuild2/Build.wasm.unityweb",
  });
  //[TODO] This line for external instance connection
  window.unityInstance = UNSAFE__unityInstance;
  window.uarGameInstance = UNSAFE__unityInstance;

  window.sendMessageToUnity = (objectName, methodName, parameter) => {
    if (sendMessage) {
      sendMessage(objectName, methodName, parameter);
    }
  };

  window.toastError = (toastText) => {
    toast.error(toastText);
  };

  window.sendMessageToUnityBasic = (objectName, methodName) => {
    if (sendMessage) {
      sendMessage(objectName, methodName);
    }
  };

  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [isSaveLoaded, setIsSaveLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [userID, setUserID] = useState(id);
  const [userName, setUserName] = useState(name);
  const [userToken, setUserToken] = useState("");
  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") ||
      "https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png"
  );
  const [userSigned, setUserSigned] = useState(
    JSON.parse(localStorage.getItem("userSigned")) || true
  );
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [isInfoMode, setIsInfoMode] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [objectName, setObjectNameReact] = useState("");
  const [isDockEditorMode, setIsDockEditorMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [infoName, setInfoNameReact] = useState("");
  const [infoArtist, setInfoArtistReact] = useState("");
  const [infoDesc, setInfoDescReact] = useState("");
  const [infoURL, setInfoURLReact] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isFilmingMode, setIsFilmingMode] = useState(false);
  const [aiToolsOn, setAiToolsOn] = useState(false);
  const [aiToolsOnClass, setAiToolsOnClass] = useState(false);
  const [aiSkyboxGenOn, setAiSkyboxGenOn] = useState(false);
  const [aiSkyboxGenClass, setAiSkyboxGenClass] = useState(false);
  const [aiChatbotOn, setAiChatbotOn] = useState(false);
  const [aiChatbotClass, setAiChatbotClass] = useState(false);
  const [aiCommandsOn, setAiCommandsOn] = useState(false);
  const [aiCommandsClass, setAiCommandsClass] = useState(false);
  const [aiSearchOn, setAiSearchOn] = useState(false);
  const [aiSearchClass, setAiSearchClass] = useState(false);
  const [aiAssistantOn, setAiAssistantOn] = useState(false);
  const [aiAssistantClass, setAiAssistantClass] = useState(false);
  const [portalModeOn, setPortalModeOn] = useState(false);
  const [asistantPromptReact, setAssistantPromptReact] = useState("");
  const [assistantModeOn, setAssistantModeOn] = useState(false);
  const [assistantModeOnBase,setAssistantModeOnBase] = useState(false);
  const [assistantModeOnBaseClass,setAssistantModeOnBaseClass] = useState(false);

  window.aiSkyboxInputHandler = () => {
    if (
      !(aiChatbotOn || aiCommandsOn || aiSearchOn || aiAssistantOn) &&
      !aiSkyboxGenOn
    ) {
      setAiSkyboxGenOn(true);
      setAiSkyboxGenClass(true);
    } else if (aiSkyboxGenOn) {
      setAiSkyboxGenClass(false);
      const timeout = setTimeout(() => {
        setAiSkyboxGenOn(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  };


  window.aiChatbotInputHandler = () => {
    if (
      !(aiSkyboxGenOn || aiCommandsOn || aiSearchOn || aiAssistantOn) &&
      !aiChatbotOn
    ) {
      setAiChatbotOn(true);
      setAiChatbotClass(true);
    } else if (aiChatbotOn) {
      setAiChatbotClass(false);
      const timeout = setTimeout(() => {
        setAiChatbotOn(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  };

  window.aiCommandsInputHandler = () => {
    if (
      !(aiSkyboxGenOn || aiChatbotOn || aiSearchOn || aiAssistantOn) &&
      !aiCommandsOn
    ) {
      setAiCommandsOn(true);
      setAiCommandsClass(true);
    } else if (aiCommandsOn) {
      setAiCommandsClass(false);
      const timeout = setTimeout(() => {
        setAiCommandsOn(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  };

  window.aiSearchInputHandler = () => {
    if (
      !(aiSkyboxGenOn || aiChatbotOn || aiCommandsOn || aiAssistantOn) &&
      !aiSearchOn
    ) {
      setAiSearchOn(true);
      setAiSearchClass(true);
    } else if (aiSearchOn) {
      setAiSearchClass(false);
      const timeout = setTimeout(() => {
        setAiSearchOn(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  };

  window.aiAssistantInputHandler = () => {
    if (
      !(aiSkyboxGenOn || aiChatbotOn || aiCommandsOn || aiSearchOn) &&
      !aiAssistantOn
    ) {
      setAiAssistantOn(true);
      setAiAssistantClass(true);
    } else if (aiAssistantOn) {
      setAiAssistantClass(false);
      const timeout = setTimeout(() => {
        setAiAssistantOn(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    addEventListener("setObjectName", handleObjectName);
    return () => {
      removeEventListener("setObjectName", handleObjectName);
    };
  }, [addEventListener, removeEventListener, handleObjectName]);

  const handleObjectName = useCallback((setObjectName) => {
    setObjectNameReact(setObjectName);
  }, []);

  const handleAddContent = () => {
    setUploadOpen(true);
  };

  function generateUID(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uid += characters[randomIndex];
    }

    return uid;
  }


  const AssistantChatHandler = () => {
    if (!assistantModeOnBase) {
      setAssistantModeOnBase(true);
      setAssistantModeOnBaseClass(true);
    } else {
      setAssistantModeOnBaseClass(false);
      const timeout = setTimeout(() => {
        setAssistantModeOnBase(false);
      }, 400);
      return () => clearTimeout(timeout); // Temizleme fonksiyonu, bileşen güncellendiğinde bu timeout'u temizler.
    }
  };

  useEffect(() => {
    if (!userID) {
      const newUID = generateUID(16);
      setUserID(newUID);
      localStorage.setItem("userID", newUID);
    }
  }, [userID]);

  const handleEditorMode = () => {
    setIsDockEditorMode(true);
  };

  const handleInfoMode = () => {
    setIsInfoMode(true);
  };

  const handleEditBar = () => {
    setIsEditorMode(true);
  };

  const handleEditorInMode = () => {
    setIsDockEditorMode(false);
  };

  const handleEditorOff = () => {
    setTimeout(() => {
      setIsEditorMode(false);
    }, 600); // 500 milisaniye (0.5 saniye) bekleme süresi
  };

  const handleAssistantOff = () => {
    setTimeout(() => {
      setAssistantModeOnBase(false);
    }, 600); // 500 milisaniye (0.5 saniye) bekleme süresi
  };

  const handleEditorOffInfo = () => {
    setTimeout(() => {
      setIsInfoMode(false);
    }, 600); // 500 milisaniye (0.5 saniye) bekleme süresi
  };

  useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("userToken", userToken);
  }, [userToken]);

  useEffect(() => {
    localStorage.setItem("userImage", userImage);
  }, [userImage]);

  useEffect(() => {
    localStorage.setItem("userSigned", userSigned);
  }, [userSigned]);

  useEffect(() => {
    addEventListener("setInfoName", handleInfoName);
    return () => {
      removeEventListener("setInfoName", handleInfoName);
    };
  }, [addEventListener, removeEventListener, handleInfoName]);

  const handleInfoName = useCallback((setInfoName) => {
    setInfoNameReact(setInfoName);
  }, []);

  useEffect(() => {
    addEventListener("setInfoArtist", handleInfoArtist);
    return () => {
      removeEventListener("setInfoArtist", handleInfoArtist);
    };
  }, [addEventListener, removeEventListener, handleInfoArtist]);

  const handleInfoArtist = useCallback((setInfoArtist) => {
    setInfoArtistReact(setInfoArtist);
  }, []);

  useEffect(() => {
    addEventListener("setInfoDesc", handleInfoDesc);
    return () => {
      removeEventListener("setInfoDesc", handleInfoDesc);
    };
  }, [addEventListener, removeEventListener, handleInfoDesc]);

  const handleInfoDesc = useCallback((setInfoDesc) => {
    setInfoDescReact(setInfoDesc);
  }, []);

  useEffect(() => {
    addEventListener("setInfoURL", handleInfoUrl);
    return () => {
      removeEventListener("setInfoURL", handleInfoUrl);
    };
  }, [addEventListener, removeEventListener, handleInfoUrl]);

  const handleInfoUrl = useCallback((setInfoURL) => {
    setInfoURLReact(setInfoURL);
  }, []);

  useEffect(() => {
    if (isStarted && userSigned) {
      // belirli bir kodu buraya yazabilirsiniz
      handleClick();
      console.clear();
      sendMessage("AvatarNick", "enableInput");
      sendMessage("AvatarNick", "TestSetMethod", userName);
      localStorage.setItem("isMicOn", "false");
      localStorage.setItem("isCameraOn", "false");
      localStorage.setItem("isBaseCameraOn", "true");
      localStorage.setItem("isVideoRecord", "false");
      console.log(name);
      console.log(id);
      localStorage.setItem("isScreenShareOn", "false");
    }
  }, [isStarted, userSigned]);

  const handleChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    //setUserID(sanitizedValue);
    setUserName(value);
    console.log(userID);
  };

  useEffect(() => {
    console.log(userName);
    console.log(userID);
    tokenGenerator();
  }, []);

  useEffect(() => {
    if (admin === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const tokenGenerator = async () => {
    const data = await getUserToken();
    setUserToken(data.token);
    console.log(userToken);
  };

  const handleClick = async () => {
    if (!userToken) {
      const data = await getUserToken();
      setUserToken(data.token);
      console.log(data.token);
    }

    if (!chatClient.user && userToken) {
      await chatClient.connectUser(
        {
          id: userID,
          name: userName,
          image: userImage,
        },
        userToken
      );
      connect();
      toast.success("Connection successful!");
      console.log("Connection successful!");
    } else {
      toast.error("We ran into a problem! Please try again..");
      console.log("Retry");
    }
  };

  const connect = async () => {
    const channel = chatClient.channel("livestream", "newch");
    await channel.watch();
    setShowChat(true);
    avatarHandler();
    await setUserSigned(true);
  };

  const toggleAiTools = () => {
    if (!aiToolsOn) {
      setAiToolsOn(true);
      setAiToolsOnClass(true);
    } else {
      setAiToolsOnClass(false);
      const timeout = setTimeout(() => {
        setAiToolsOn(false);
      }, 600);
      return () => clearTimeout(timeout); // Temizleme fonksiyonu, bileşen güncellendiğinde bu timeout'u temizler.
    }
  };

  useEffect(() => {
    addEventListener("portalInfoTabOff", portalInfoTabToggleOff);

    return () => {
      removeEventListener("portalInfoTabOff", portalInfoTabToggleOff);
    };
  }, [addEventListener, removeEventListener, portalInfoTabToggleOff]);

  const portalInfoTabToggleOff = () => {
    setPortalModeOn(false);
  };
  //////////////////////
  useEffect(() => {
    addEventListener("portalInfoTabOn", portalInfoTabToggleOn);

    return () => {
      removeEventListener("portalInfoTabOn", portalInfoTabToggleOn);
    };
  }, [addEventListener, removeEventListener, portalInfoTabToggleOn]);

  const portalInfoTabToggleOn = () => {
    setPortalModeOn(true);
  };
  //////////////
  useEffect(() => {
    addEventListener("assistantInfoOff", assistantInfoToggleOff);

    return () => {
      removeEventListener("assistantInfoOff", assistantInfoToggleOff);
    };
  }, [addEventListener, removeEventListener, assistantInfoToggleOff]);

  const assistantInfoToggleOff = () => {
    setAssistantModeOn(false);
    
  };
  //////////////////////
  useEffect(() => {
    addEventListener("assistantInfoOn", assistantInfoToggleOn);

    return () => {
      removeEventListener("assistantInfoOn", assistantInfoToggleOn);
    };
  }, [addEventListener, removeEventListener, assistantInfoToggleOn]);

  const assistantInfoToggleOn = () => {
      setAssistantModeOn(true);
  };

  useEffect(() => {
    addEventListener("assistantOff", assistantInfoToggleOffBase);

    return () => {
      removeEventListener("assistantOff", assistantInfoToggleOffBase);
    };
  }, [addEventListener, removeEventListener, assistantInfoToggleOffBase]);

  const assistantInfoToggleOffBase = () => {
    if(!isAdmin){
      AssistantChatHandler();
    }
  };
  //////////////////////
  useEffect(() => {
    addEventListener("assistantOn", assistantInfoToggleOnBase);

    return () => {
      removeEventListener("assistantOn", assistantInfoToggleOnBase);
    };
  }, [addEventListener, removeEventListener, assistantInfoToggleOnBase]);

  const assistantInfoToggleOnBase = () => {
    if(!isAdmin){
      AssistantChatHandler();
    }
      
  };

  useEffect(() => {
    addEventListener("setAvatarPrompt", avatarPromptHandler);
    return () => {
      removeEventListener("setAvatarPrompt", avatarPromptHandler);
    };
  }, [addEventListener, removeEventListener, avatarPromptHandler]);

  const avatarPromptHandler = useCallback((setAvatarPrompt) => {
    setAssistantPromptReact(setAvatarPrompt);
    console.log(setAvatarPrompt);
  }, []);

  window.spawnSunny = () =>{
    sendMessage("portalUrlManager","SpawnObjectSunny");
  }
 
  const reactionHandler = () => {};

  const getUserToken = async () => {
    try {
      const response = await fetch(`https://api.hahaverse.com/tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "7q2yg6eutsf9",
          apiSecret:
            "uy8xbg6m4b7r28amk7vm83a5fzqsy37hyn4zjuykzqyzrjx4jtet892msmy476tq",
          userId: userID,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const gameHandler = useCallback(() => {
    setIsStarted(true);
    console.log("Instance Started!");
  }, []);

  const avatarHandler = () => {
    if (isLoaded === true) {
      sendMessage("AvatarNick", "TestSetMethod", userName);
      window.initializeSystem();
      //admin place
      if (admin === "true") {
        sendMessage("adminManager", "setAdminTrue");
      } else {
        sendMessage("adminManager", "setAdminFalse");
      }
      //sendMessage("AvatarNick", "enableInput");
      window.setupRpmFrame();
    }
  };

  useEffect(() => {
    let timer1;
    let timer2;

    if (isLoaded) {
      timer1 = setTimeout(() => {
        sendMessage("SaveManager", "LoadSystem", spaceName);
      }, 1000);

      timer2 = setTimeout(() => {
        const roomName = spaceName || "demoroom";
        sendMessage("AvatarNick", "RoomSetmethod", roomName);
      }, 2000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoaded, spaceName]);

  const ReactshowRPM = () => {
    window.setupRpmFrame();
    window.showRpm();
    //sendMessage("AvatarEdit", "EditorON");
  };

  const handleObjectHoverEnter = () => {
    const container = document.querySelector(".container");
    container.style.cursor = "move";
  };

  window.sketchfabInitialize = (modelUID) => {
    var url = "https://api.sketchfab.com/v3/models/" + modelUID + "/download";
    var options = {
      method: "GET",
      headers: {
        Authorization: "Bearer cej98gnKj7a5kYlRETZmOuWI8YhuFt",
      },
      mode: "cors",
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.glb.url);
        window.sendMessageToUnity("urlManager", "SetURL", data.glb.url);
        window.sendMessageToUnityBasic("urlManager", "SpawnObject");
      });
  };

  useEffect(() => {
    addEventListener("ObjectHoverEnter", handleObjectHoverEnter);

    return () => {
      removeEventListener("ObjectHoverEnter", handleObjectHoverEnter);
    };
  }, [addEventListener, removeEventListener, handleObjectHoverEnter]);

  const handleObjectHoverExit = () => {
    const container = document.querySelector(".container");
    container.style.cursor = "grab";
  };

  useEffect(() => {
    addEventListener("ObjectHoverExit", handleObjectHoverExit);

    return () => {
      removeEventListener("ObjectHoverExit", handleObjectHoverExit);
    };
  }, [addEventListener, removeEventListener, handleObjectHoverExit]);

  useEffect(() => {
    addEventListener("Started", gameHandler);

    return () => {
      removeEventListener("Started", gameHandler);
    };
  }, [addEventListener, removeEventListener, gameHandler]);

  useEffect(() => {
    addEventListener("Started", gameHandler);

    return () => {
      removeEventListener("Started", gameHandler);
    };
  }, [addEventListener, removeEventListener, gameHandler]);

  useEffect(() => {
    addEventListener("EditorActive", handleEditorMode);

    return () => {
      removeEventListener("EditorActive", handleEditorMode);
    };
  }, [addEventListener, removeEventListener, handleEditorMode]);

  useEffect(() => {
    addEventListener("EditorInActive", handleEditorInMode);

    return () => {
      removeEventListener("EditorInActive", handleEditorInMode);
    };
  }, [addEventListener, removeEventListener, handleEditorInMode]);

  useEffect(() => {
    addEventListener("isLockedTrue", handleisLockedTrue);

    return () => {
      removeEventListener("isLockedTrue", handleisLockedTrue);
    };
  }, [addEventListener, removeEventListener, handleisLockedTrue]);

  const handleisLockedTrue = () => {
    setIsLocked(true);
  };

  useEffect(() => {
    addEventListener("isLockedFalse", handleisLockedFalse);

    return () => {
      removeEventListener("isLockedFalse", handleisLockedFalse);
    };
  }, [addEventListener, removeEventListener, handleisLockedFalse]);

  const handleisLockedFalse = () => {
    setIsLocked(false);
  };

  useEffect(() => {
    addEventListener("infoViewOn", handleinfoViewOn);

    return () => {
      removeEventListener("infoViewOn", handleinfoViewOn);
    };
  }, [addEventListener, removeEventListener, handleinfoViewOn]);

  const handleinfoViewOn = () => {
    setIsActive(true);
  };

  useEffect(() => {
    addEventListener("infoViewOff", handleinfoViewOff);

    return () => {
      removeEventListener("infoViewOff", handleinfoViewOff);
    };
  }, [addEventListener, removeEventListener, handleinfoViewOff]);

  const handleinfoViewOff = () => {
    setIsActive(false);
  };

  useEffect(() => {
    addEventListener("isManualModeOn", handleisManualModeOn);

    return () => {
      removeEventListener("isManualModeOn", handleisManualModeOn);
    };
  }, [addEventListener, removeEventListener, handleisManualModeOn]);

  const handleisManualModeOn = () => {
    setIsManual(true);
  };

  useEffect(() => {
    addEventListener("isManualModeOff", handleisManualModeOff);

    return () => {
      removeEventListener("isManualModeOff", handleisManualModeOff);
    };
  }, [addEventListener, removeEventListener, handleisManualModeOff]);

  const handleisManualModeOff = () => {
    setIsManual(false);
  };

  const toggleFilmingMode = () => {
    if (!isFilmingMode) {
      sendMessage("VideoManager", "enableFilmingMode");
      setIsFilmingMode(true);
    } else {
      sendMessage("VideoManager", "disableFilmingMode");
      setIsFilmingMode(false);
    }
  };

  window.toggleFilmingMode = () => {
    if (!isFilmingMode) {
      sendMessage("VideoManager", "enableFilmingMode");
      setIsFilmingMode(true);
    } else {
      sendMessage("VideoManager", "disableFilmingMode");
      setIsFilmingMode(false);
    }
  };

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    backgroundColor: "black",
    color: theme.vars.palette.text.tertiary,
  }));

  const onBlurSet = async () => {
    const data = await getUserToken();
    setUserToken(data.token);
    console.log(data.token);
    sendMessage("AvatarNick", "enableInput");
  };

  const saveSystem = () => {
    sendMessage("SaveManager", "SaveFile", spaceName);

    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Saving...",
      success: () => {
        return "Save Complated";
      },
      error: "Error",
    });
  };

  return (
    <div className={"unity-instance"}>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundImage:
            "url(https://react-os-three.vercel.app/img/Splash2.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {isStarted === false && (
          <div className="holder">
            <Loader
              loadingProgression={loadingProgression}
              avatarHandler={avatarHandler}
              isLoaded={isLoaded}
              handleChange={handleChange}
              inputText={userID}
            ></Loader>
          </div>
        )}
        {isStarted && !showChat && (
          <div backgroundColor="#fff" className="avatarContainer">
            <div className="box">
              <Stack
                sty
                spacing={2}
                sx={{ borderRadius: "25px", width: "100%" }}
              >
                <Typography
                  style={{ width: "100%", position: "relative" }}
                  className="avatarSelectorTitle"
                  textColor="common.black"
                  level="body2"
                >
                  Choose your look
                </Typography>
                <Input
                  placeholder="Take a good one"
                  className="avatarInput"
                  onFocus={() => sendMessage("AvatarNick", "Start")}
                  onBlur={onBlurSet}
                  onChange={handleChange}
                  value={userName}
                  style={{ zIndex: "15" }}
                />
                <Container className="avatarIcons" style={{}} maxWidth="sm">
                  <Grid
                    className="avatarGrid"
                    container
                    spacing={0}
                    columns={16}
                    sx={{ flexGrow: 1 }}
                  >
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-black-dreads-638e6994474e25e55be5d246/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-black-dreads-638e6994474e25e55be5d246/thumbnail-192.png"
                          alt="Avatar1"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-black-dreads-6389056fa3a085619eaf9b32/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-black-dreads-6389056fa3a085619eaf9b32/thumbnail-192.png"
                          alt="Avatar2"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-brown-polo-63890586a3a085619eaf9b64/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-brown-polo-63890586a3a085619eaf9b64/thumbnail-192.png"
                          alt="Avatar3"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-6389058ca3a085619eaf9b71/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-6389058ca3a085619eaf9b71/thumbnail-192.png"
                          alt="Avatar4"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    className="avatarGrid"
                    container
                    spacing={0}
                    columns={16}
                    sx={{ flexGrow: 1 }}
                  >
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-vest-6389059059d13f203a31bddf/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-vest-6389059059d13f203a31bddf/thumbnail-192.png"
                          alt="Avatar5"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hispanic-tracksuit-6389059c59d13f203a31bdfd/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hispanic-tracksuit-6389059c59d13f203a31bdfd/thumbnail-192.png"
                          alt="Avatar6"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-shirt-638905a559d13f203a31be11/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-shirt-638905a559d13f203a31be11/thumbnail-192.png"
                          alt="Avatar7"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-hispanic-floral-shirt-638905a9a3a085619eaf9bab/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-hispanic-floral-shirt-638905a9a3a085619eaf9bab/thumbnail-192.png"
                          alt="Avatar8"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    className="avatarGrid"
                    container
                    spacing={0}
                    columns={16}
                    sx={{ flexGrow: 1 }}
                  >
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-nonbinary-short-hair-638905b559d13f203a31be36/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-nonbinary-short-hair-638905b559d13f203a31be36/thumbnail-192.png"
                          alt="Avatar9"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-ranger-638905baa3a085619eaf9bce/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-ranger-638905baa3a085619eaf9bce/thumbnail-192.png"
                          alt="Avatar10"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hijab-638905c2a3a085619eaf9bd5/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hijab-638905c2a3a085619eaf9bd5/thumbnail-192.png"
                          alt="Avatar11"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-jacket-638905c759d13f203a31be52/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-jacket-638905c759d13f203a31be52/thumbnail-192.png"
                          alt="Avatar12"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    className="avatarGrid"
                    container
                    spacing={0}
                    columns={16}
                    sx={{ flexGrow: 1 }}
                  >
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-nonbinary-suit-6386a03e226673df8a0dea04/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-nonbinary-suit-6386a03e226673df8a0dea04/thumbnail-192.png"
                          alt="Avatar13"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-tanktop-638905e5a3a085619eaf9bf9/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-tanktop-638905e5a3a085619eaf9bf9/thumbnail-192.png"
                          alt="Avatar14"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-crewneck-638905f059d13f203a31be89/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-crewneck-638905f059d13f203a31be89/thumbnail-192.png"
                          alt="Avatar15"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-sunglasses-638905f659d13f203a31be95/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-sunglasses-638905f659d13f203a31be95/thumbnail-192.png"
                          alt="Avatar16"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    className="avatarGrid"
                    container
                    spacing={0}
                    columns={16}
                    sx={{ flexGrow: 1 }}
                  >
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-asian-dress-shirt-638905fc59d13f203a31beab/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-asian-dress-shirt-638905fc59d13f203a31beab/thumbnail-192.png"
                          alt="Avatar17"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}>
                      <Button
                        className="avatarGridItems"
                        onClick={() =>
                          setUserImage(
                            "https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-asian-dress-638905eba3a085619eaf9c02/thumbnail-192.png"
                          )
                        }
                      >
                        <img
                          style={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            height: "100%",
                          }}
                          src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-asian-dress-638905eba3a085619eaf9c02/thumbnail-192.png"
                          alt="Avatar18"
                        />
                      </Button>
                    </Grid>
                    <Grid className="avatarGridAlt" xs={4}></Grid>
                    <Grid className="avatarGridAlt" xs={4}></Grid>
                  </Grid>
                </Container>
                <div className="spacer50px"></div>
              </Stack>
              <Button
                style={{
                  width: "100%",
                  color: "black",
                  background: "#fff",
                  fontWeight: "700",
                  fontSize: "17px",
                  border: "solid",
                  padding: "15px",
                  borderRadius: "50px",
                  borderColor: "#bfbfbf",
                  borderWidth: "3px",
                }}
                className="loadLeaveButton"
              >
                Leave
              </Button>
              <div style={{ height: "10px" }}></div>
              <Button
                onClick={handleClick}
                style={{
                  width: "100%",
                  color: "white",
                  background: "#000",
                  fontWeight: "700",
                  fontSize: "17px",
                  border: "solid",
                  padding: "18.5px",
                  borderRadius: "50px",
                }}
                className="loadStartButton"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {isStarted && showChat && isFilmingMode && (
          <div className="filmingController">
            <IconButton
              onClick={toggleFilmingMode}
              id="dockButtonID"
              className="dockButtons"
              variant="solid"
              sx={{
                color: "white",
                boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: "rgba(0, 0, 0, 0.250)",
                background: "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.250)",
                  background: "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
            <IconButton
              id="dockButtonID"
              className="dockButtons"
              variant="solid"
              sx={{
                width: "120px",
                color: "white",
                boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: "rgba(0, 0, 0, 0.250)",
                background: "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.250)",
                  background: "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              Record
            </IconButton>
            <IconButton
              id="dockButtonID"
              className="dockButtons"
              variant="solid"
              sx={{
                color: "white",
                boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 34%)",
                backgroundColor: "rgba(0, 0, 0, 0.250)",
                background: "rgba(0, 0, 0, 0.250)",
                "--IconButton-size": "55px",
                "--IconButton-radius": "50px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.250)",
                  background: "rgba(0, 0, 0, 0.250)",
                },
              }}
            >
              <HelpOutlineIcon></HelpOutlineIcon>
            </IconButton>
          </div>
        )}
        {isStarted && showChat && !isFilmingMode && (
          <div className={"ui"}>
            <Grid
              className="unityLoaderGrid"
              style={{ position: "absolute", width: "100%", bottom: "20px" }}
              container
              spacing={3}
              sx={{ flexGrow: 1 }}
            >
              <Grid
                className="EmptyGrid"
                xs
                style={{ opacity: 1, display: "flex", gap: "7px" }}
              >
                {aiToolsOn && (
                  <AiToolsBase
                    toggleAiTools={toggleAiTools}
                    aiToolsOnClass={aiToolsOnClass}
                    aiSkyboxGenClass={aiSkyboxGenClass}
                    aiChatbotClass={aiChatbotClass}
                    aiCommandsClass={aiCommandsClass}
                    aiSearchClass={aiSearchClass}
                    aiAssistantClass={aiAssistantClass}
                  />
                )}
                {isAdmin && !aiToolsOn && (
                  <div className="syncDock">
                    <Tooltip
                      TransitionComponent={Fade}
                      className="dockTooltip"
                      sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
                      interactive
                      color="neutral"
                      placement="top"
                      variant="soft"
                      title={
                        <Button
                          className="tooltipButtonBase"
                          onClick={saveSystem}
                          size="sm"
                          variant="plain"
                          sx={{
                            fontStyle: "bold",
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
                          Save
                        </Button>
                      }
                    >
                      <div
                        style={{ width: "fit-content", height: "fit-content" }}
                        className="tooltipHover"
                      >
                        <IconButton
                          id="dockButtonID"
                          className="dockButtonsBase"
                          variant="solid"
                          onClick={saveSystem}
                          style={{ background: "#00000000important" }}
                          sx={{
                            "--IconButton-size": "55px",
                            "--IconButton-radius": "50px",
                          }}
                        >
                          <CloudSyncOutlinedIcon />
                        </IconButton>
                      </div>
                    </Tooltip>

                    <Tooltip
                      TransitionComponent={Fade}
                      className="dockTooltip"
                      sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
                      interactive
                      color="neutral"
                      placement="top"
                      variant="soft"
                      title={
                        <Button
                          className="tooltipButtonBase"
                          onClick={() =>
                            sendMessage(
                              "EnvironmentManager",
                              "setSpawnPointVoid"
                            )
                          }
                          size="sm"
                          variant="plain"
                          sx={{
                            fontStyle: "bold",
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
                          Spawnpoint
                        </Button>
                      }
                    >
                      <div
                        style={{ width: "fit-content", height: "fit-content" }}
                        className="tooltipHover"
                      >
                        <IconButton
                          id="dockButtonID"
                          className="dockButtonsBase"
                          variant="solid"
                          onClick={() =>
                            sendMessage(
                              "EnvironmentManager",
                              "setSpawnPointVoid"
                            )
                          }
                          style={{ background: "#00000000!important" }}
                          sx={{
                            "--IconButton-size": "55px",
                            "--IconButton-radius": "50px",
                          }}
                        >
                          <EmojiPeopleIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                )}
              </Grid>
              <Grid xs={6}>
                {isDockEditorMode && (
                  <EditDock
                    isLocked={isLocked}
                    setIsLocked={setIsLocked}
                    objectName={objectName}
                    handleInfoMode={handleInfoMode}
                    handleEditBar={handleEditBar}
                    handleAddContent={handleAddContent}
                    setIsDockEditorMode={setIsDockEditorMode}
                    assistantModeOnBase={assistantModeOnBase}
                  ></EditDock>
                )}
                {!isDockEditorMode && isAdmin && (
                  <Dock
                    aiSkyboxGenOn={aiSkyboxGenOn}
                    aiSkyboxGenClass={aiSkyboxGenClass}
                    aiChatbotOn={aiChatbotOn}
                    aiChatbotClass={aiChatbotClass}
                    aiCommandsOn={aiCommandsOn}
                    aiCommandsClass={aiCommandsClass}
                    aiSearchOn={aiSearchOn}
                    aiSearchClass={aiSearchClass}
                    aiAssistantOn={aiAssistantOn}
                    aiAssistantClass={aiAssistantClass}
                    aiToolsOn={aiToolsOn}
                    toggleAiTools={toggleAiTools}
                    toggleFilmingMode={toggleFilmingMode}
                    handleAddContent={handleAddContent}
                  ></Dock>
                )}
                {!isAdmin && (
                  <GuestDock handleAddContent={handleAddContent}></GuestDock>
                )}
              </Grid>
              <Grid style={{ opacity: 1 }} xs>
                <ChatComponent
                  spaceName={spaceName}
                  userName={userName}
                  showChat={showChat}
                  sendMessage={sendMessage}
                  userID={userID}
                  userToken={userToken}
                  userImage={userImage}
                />
              </Grid>
            </Grid>

            {isEditorMode && (
              <EditorPanel
                objectName={objectName}
                sendMessage={sendMessage}
                setIsDockEditorMode={setIsDockEditorMode}
                handleEditorMode={handleEditorMode}
                handleEditorOff={handleEditorOff}
                addEventListener={addEventListener}
                removeEventListener={removeEventListener}
              ></EditorPanel>
            )}
            {isInfoMode && (
              <InfoPanel
                portalModeOn={portalModeOn}
                assistantModeOn={assistantModeOn}
                isActive={isActive}
                setIsActive={setIsActive}
                isManual={isManual}
                setIsManual={setIsManual}
                infoName={infoName}
                setInfoName={setInfoNameReact}
                infoArtist={infoArtist}
                setInfoArtist={setInfoArtistReact}
                infoDesc={infoDesc}
                setInfoDesc={setInfoDescReact}
                infoURL={infoURL}
                setInfoURL={setInfoURLReact}
                objectName={objectName}
                sendMessage={sendMessage}
                setIsDockEditorMode={setIsDockEditorMode}
                handleEditorMode={handleEditorMode}
                handleEditorOff={handleEditorOffInfo}
                addEventListener={addEventListener}
                removeEventListener={removeEventListener}
              ></InfoPanel>
            )}
            {assistantModeOnBase && <AssistantHolder assistantModeOnBaseClass={assistantModeOnBaseClass} asistantPromptReact={asistantPromptReact} handleEditorOff={handleAssistantOff}></AssistantHolder>}
            {/* {uploadOpen && <FileUpload setUploadOpen={setUploadOpen} sendMessage={sendMessage} style={{position: 'absolute', zIndex: '15'}}></FileUpload> } */}
            {uploadOpen && (
              <AddContent setUploadOpen={setUploadOpen}></AddContent>
            )}
            {/* <Button style={{ position: 'absolute', zIndex: '15' }} onClick={ReactshowRPM} variant="soft">Edit Avatar - PreTest</Button>*/}
          </div>
        )}
        <Toaster className="toasterCSS" richColors position="bottom-center" />
        <Unity
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blured")}
          className="container"
          unityProvider={unityProvider}
          style={{ cursor: "grab", display: isLoaded ? "block" : "none" }}
        />
      </div>
    </div>
    // JSX ile bileşeninizi render edebilirsiniz
  );
};

export default UnityLoader;
