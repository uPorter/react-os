import { ChangeEvent, useState, useEffect, useCallback, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Dock from "./Dock";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import { Button } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { Transition } from "react-transition-group";
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
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import axios from 'axios';

const chatClient = StreamChat.getInstance("gte62wacdhnr");

const UnityLoader = () => {
  const {
    spaceName,
    name,
    id,
    admin,
    userSpaceName,
    userSpaceDesc,
    ownerName,
  } = useParams();

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
  const [environmentModalOn,setEnvironmentModalOn] = useState(false);
  const [portalRedirectModal, setPortalRedirectModal] = useState(false);
  const [imageModalOn, setImageModalOn] = useState(false);
  const [videoModalOn, setVideoModalOn] = useState(false);
  const [portalModalOn, setPortalModalOn] = useState(false);
  const [portalName, setPortalName] = useState("");
  const [portalArtist, setPortalArtist] = useState("Mugen");
  const [portalURL, setPortalURL] = useState("");
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
  const [assistantModeOnBase, setAssistantModeOnBase] = useState(false);
  const [assistantModeOnBaseClass, setAssistantModeOnBaseClass] =
    useState(false);

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

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

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
    addEventListener("doubleClickForFull", doubleClickForFullVoid);

    return () => {
      removeEventListener("doubleClickForFull", doubleClickForFullVoid);
    };
  }, [addEventListener, removeEventListener, doubleClickForFullVoid]);

  const doubleClickForFullVoid = () => {
    if (!isAdmin) {
      setImageModalOn(true);
    }
  };

  useEffect(() => {
    addEventListener("portalOnClick", portalRedirectVoid);

    return () => {
      removeEventListener("portalOnClick", portalRedirectVoid);
    };
  }, [addEventListener, removeEventListener, portalRedirectVoid]);

  const portalRedirectVoid = () => {
    setPortalRedirectModal(true);
  };

  useEffect(() => {
    addEventListener("fullScreenImage", fullScreenImageVoid);

    return () => {
      removeEventListener("fullScreenImage", fullScreenImageVoid);
    };
  }, [addEventListener, removeEventListener, fullScreenImageVoid]);

  const fullScreenImageVoid = () => {
    console.log("");
  };

  useEffect(() => {
    addEventListener("fullScreenVideo", fullScreenVideoVoid);

    return () => {
      removeEventListener("fullScreenVideo", fullScreenVideoVoid);
    };
  }, [addEventListener, removeEventListener, fullScreenVideoVoid]);

  const fullScreenVideoVoid = () => {
    setVideoModalOn(true);
  };

  const fileInputRef = useRef(null);

    const dosyaSec = () => {
        fileInputRef.current.click();
    };

    const dosyaDegistir = async (event) => {
      const dosya = event.target.files[0];
      setEnvironmentModalOn(false);
      if (dosya) {
          const fileType = dosya.name.split('.').pop().toLowerCase();

          if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
              const formData = new FormData();
              formData.append('file', dosya);

              try {
                  const response = await axios.post(
                      'https://26ec-103-133-178-51.ngrok-free.app/upload',
                      formData,
                      {
                          headers: {
                              'Content-Type': 'multipart/form-data',
                          },
                          onUploadProgress: (progressEvent) => {
                              const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                              console.log(percentage);
                          },
                      }
                  );

                  window.sendMessageToUnity(
                    "skyboxUrlManager",
                    "SetURL",
                    response.data
                  );
                  window.sendMessageToUnity("skyboxUrlManager", "SpawnObject");
                  console.log(response.data);
              } catch (error) {
                  console.error('Dosya yüklenirken bir hata oluştu:', error);
              }
          } else {
              console.error('Desteklenmeyen dosya türü');
          }
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

  window.spawnSunny = () => {
    sendMessage("portalUrlManager", "SpawnObjectSunny");
  };

  const reactionHandler = () => {};

  const getUserToken = async () => {
    try {
      const response = await fetch(
        `https://26ec-103-133-178-51.ngrok-free.app/tokens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            apiKey: "gte62wacdhnr",
            apiSecret:
              "xy2mq3dartszjkdkua2rs5utrmsqkwwf7q27nq76n5dad32y4phehbp26cx4zcx3",
            userId: userID,
          }),
        }
      );
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
        var sharedValue = getCookie("avatarURL");
        if (sharedValue === null || sharedValue === undefined) {
          sendMessage("AvatarNick", "AvatarURLSet", "");
        }else{
          sendMessage("AvatarNick", "AvatarURLSet", sharedValue);
        }
        sendMessage("SaveManager", "LoadSystem", spaceName);
        console.log(sharedValue);
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
    if (isAdmin) {
      const container = document.querySelector(".container");
      container.style.cursor = "move";
    } else {
      const container = document.querySelector(".container");
      container.style.cursor = "pointer";
    }
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

  const environmentModalFunction = () => {
    window.sendMessageToUnityBasic(objectName, "SetEnvironmentModel");
    setEnvironmentModalOn(false);
    toast("Selected model set as environment model");
  }

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

  const portalCreate = () => {
    if (portalName === "" || portalArtist === "" || portalURL === "") {
      toast.error("Please fill all fields");
    } else {
      sendMessage("portalUrlManager", "SetURLName", portalName);
      sendMessage("portalUrlManager", "setUrlArtist", portalArtist);
      sendMessage("portalUrlManager", "setUrlLink", portalURL);
      sendMessage("portalUrlManager", "SpawnObject");
      setPortalModalOn(false);
      setPortalArtist("");
      setPortalName("");
      setPortalURL("");
    }
  };

  function formatInfoURL(infoUrl, maxLength) {
    if (infoUrl.length <= maxLength) {
      return infoUrl;
    } else {
      const shortenedUrl = infoUrl.substring(0, maxLength - 3) + "...";
      return shortenedUrl;
    }
  }

  const handleRedirect = (url) => {
    window.open(url, "_blank"); // Yeni sekmede URL'yi aç
  };

  const formattedUrl = formatInfoURL(infoURL, 35);

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  const stringToCopy = `https://react-os-three.vercel.app/space/${spaceName}/${userSpaceName}/${userSpaceDesc}/${ownerName}`;
  const shareURL = () => {
    copyToClipboard(stringToCopy);
    toast.success("Copied to clipboard");
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
              ownerName={ownerName}
              userSpaceName={userSpaceName}
              userSpaceDesc={userSpaceDesc}
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
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={environmentModalOn}
              onClose={() => setEnvironmentModalOn(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="plain"
                sx={{
                  maxWidth: 500,
                  borderRadius: "16px",
                  p: 3,
                  boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.171)",
                  maxWidth: "fit-content",
                  backgroundColor: "rgb(0 0 0 / 0%)",
                  borderColor: "rgb(0 0 0 / 0%)",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    background: "rgb(0 0 0 / 25%)",
                    width: "fit-content",
                    minWidth: "250px",
                    height: "160px",
                    padding: "40px 60px",
                    borderRadius: "18px",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(20px)"
                  }}
                >
                  <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={dosyaDegistir}
            />
                  <Button
                  onClick={dosyaSec}
                  style={{
                    background:"transparent"
                  }}
                    sx={{
                      background: "transparent",
                      borderColor: "white",
                      borderStyle: "solid",
                      borderWidth: "2px",
                    }}
                    className="portalCreateButton"

                  >
                    Set custom skybox
                  </Button>
                  <Button
                    style={{ background: "black", marginTop: "20px" }}
                    className="portalCreateButton"
                    onClick={environmentModalFunction}
                  >
                    Set Environment model
                  </Button>
                  <Button
                    style={{ background: "black", marginTop: "20px" }}
                    className="portalCreateButton"
                    onClick={() => window.sendMessageToUnity("skyboxUrlManager", "removeSkybox")}
                  >
                    Remove Skybox
                  </Button>
                </div>
              </Sheet>
            </Modal>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={portalRedirectModal}
              onClose={() => setPortalRedirectModal(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="plain"
                sx={{
                  maxWidth: 500,
                  borderRadius: "16px",
                  p: 3,
                  boxShadow: "lg",
                  maxWidth: "fit-content",
                  backgroundColor: "rgb(0 0 0 / 0%)",
                  borderColor: "rgb(0 0 0 / 0%)",
                  padding: "0",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    background: "rgb(0 0 0 / 25%)",
                    width: "fit-content",
                    minWidth: "380px",
                    height: "160px",
                    padding: "40px 60px",
                    borderRadius: "18px",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(20px)",
                    outline: "none",
                  }}
                >
                  <Typography
                    style={{ color: "white", paddingBottom: "16px" }}
                    level="h3"
                  >
                    You're Leaving MetaOS
                  </Typography>

                  <Typography
                    style={{ color: "#ffffff87", fontWeight: "600" }}
                    level="body1"
                  >
                    Are you sure you want to go to
                  </Typography>

                  <Typography
                    style={{ color: "white", fontWeight: "600" }}
                    level="body1"
                  >
                    {formattedUrl}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      width: "90%",
                      justifyContent: "space-between",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      sx={{
                        borderColor: "white",
                        borderStyle: "solid",
                        borderWidth: "2px",
                      }}
                      style={{
                        background: "transparent",
                      }}
                      onClick={() => setPortalRedirectModal(false)}
                      className="portalCreateButton"
                    >
                      No, Stay here
                    </Button>
                    <Button
                      style={{ background: "black" }}
                      className="portalCreateButton"
                      onClick={() => handleRedirect(infoURL)}
                    >
                      Yes, Let's Go
                    </Button>
                  </div>
                </div>
              </Sheet>
            </Modal>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={portalModalOn}
              onClose={() => setPortalModalOn(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="plain"
                sx={{
                  maxWidth: 500,
                  borderRadius: "16px",
                  p: 3,
                  boxShadow: "lg",
                  maxWidth: "fit-content",
                  backgroundColor: "rgb(0 0 0 / 0%)",
                  borderColor: "rgb(0 0 0 / 0%)",
                  padding: "0",
                  backDropFilter: "blur(20px)",
                }}
              >
                <ModalClose
                  variant="plain"
                  sx={{
                    top: "calc(-1/4 * var(--IconButton-size + 5))",
                    right: "calc(-1/4 * var(--IconButton-size + 5))",
                    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.0)",
                    borderRadius: "50%",
                    bgcolor: "transparent",
                    borderColor: "transparent",
                    "--Icon-color": "#ffffff",
                  }}
                />
                <div
                  style={{
                    background: "rgb(0 0 0 / 25%)",
                    width: "345px",
                    height: "256px",
                    padding: "40px",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <Typography style={{ color: "white" }} level="h3">
                    New Portal
                  </Typography>

                  <div
                    style={{
                      marginTop: "25px",
                      borderRadius: "1rem",
                      borderWidth: "2px",
                      borderColor: "#E5E7EB",
                      borderStyle: "solid",
                      width: "325px",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: '"Segoe UI"',
                        fontWeight: "600",
                        color: "#ffffffbf",
                        display: "flex",
                        flexDirection: "column",
                        padding: "13px",
                        gap: "4px",
                      }}
                    >
                      Title
                      <input
                        className="infoInput"
                        placeholder="Cool Art Piece"
                        value={portalName}
                        onChange={(event) => setPortalName(event.target.value)}
                        style={{
                          textAlign: "left",
                          borderWidth: "0",
                          outline: "none",
                          fontFamily: "sans-serif",
                          fontSize: ".875rem",
                          fontWeight: "600",
                          background: "transparent",
                          color: "white",
                        }}
                      ></input>
                    </label>
                    <hr
                      style={{
                        boxSizing: "border-box",
                        border: "0 solid rgb(229, 231, 235)",
                        height: "0px",
                        color: "inherit",
                        borderTopWidth: "2px",
                      }}
                    ></hr>
                    <label
                      style={{
                        fontFamily: '"Segoe UI"',
                        fontWeight: "600",
                        color: "#ffffffbf",
                        display: "flex",
                        flexDirection: "column",
                        padding: "13px",
                        gap: "4px",
                        marginBottom: "4px",
                      }}
                    >
                      Link*
                      <input
                        className="infoInput"
                        placeholder="https://"
                        value={portalURL}
                        onChange={(event) => setPortalURL(event.target.value)}
                        style={{
                          textAlign: "left",
                          borderWidth: "0",
                          outline: "none",
                          fontFamily: "sans-serif",
                          fontSize: ".875rem",
                          fontWeight: "600",
                          background: "transparent",
                          color: "white",
                        }}
                      ></input>
                    </label>
                  </div>
                  <Button
                    style={{
                      marginTop: "15px",
                      width: "200px",
                      background: "white",
                      color: "black",
                      fontWeight: "700",
                      minHeight: "50px",
                    }}
                    className="portalCreateButton"
                    onClick={portalCreate}
                  >
                    Create
                  </Button>
                </div>
              </Sheet>
            </Modal>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={videoModalOn}
              onClose={() => setVideoModalOn(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="plain"
                sx={{
                  maxWidth: 500,
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                  maxWidth: "fit-content",
                  backgroundColor: "rgb(0 0 0 / 0%)",
                  borderColor: "rgb(0 0 0 / 0%)",
                  padding: "0",
                }}
              >
                <ModalClose
                  variant="plain"
                  sx={{
                    top: "calc(-1/4 * var(--IconButton-size + 5))",
                    right: "calc(-1/4 * var(--IconButton-size + 5))",
                    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                    borderRadius: "50%",
                    bgcolor: "background.surface",
                  }}
                />
                <video
                  style={{
                    opacity: 1,
                    marginBottom: "-7px",
                    borderRadius: "8px",
                    maxHeight: "870px",
                  }}
                  controls
                  src={infoURL}
                ></video>
              </Sheet>
            </Modal>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={imageModalOn}
              onClose={() => setImageModalOn(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="plain"
                sx={{
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                  maxWidth: "fit-content",
                  backgroundColor: "rgb(0 0 0 / 0%)",
                  borderColor: "rgb(0 0 0 / 0%)",
                  padding: "0",
                }}
              >
                <ModalClose
                  variant="plain"
                  sx={{
                    top: "calc(-1/4 * var(--IconButton-size + 5))",
                    right: "calc(-1/4 * var(--IconButton-size + 5))",
                    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                    borderRadius: "50%",
                    bgcolor: "background.surface",
                  }}
                />
                <img
                  src={infoURL}
                  draggable="false"
                  style={{
                    opacity: 1,
                    marginBottom: "-7px",
                    borderRadius: "8px",
                    maxHeight: "870px",
                  }}
                />
              </Sheet>
            </Modal>
            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="bottom"
              variant="soft"
              title={
                <Button
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
                  Share
                </Button>
              }
            >
              <div
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
                className="tooltipHover2"
              >
                <IconButton
                  id="dockButtonID"
                  className="dockButtons"
                  onClick={() => shareURL()}
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
                  <IosShareOutlinedIcon></IosShareOutlinedIcon>
                </IconButton>
              </div>
            </Tooltip>

            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="bottom"
              variant="soft"
              title={
                <Button
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
                  Leave
                </Button>
              }
            >
              <div
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                }}
                className="tooltipHover2"
              >
                <IconButton
                  id="dockButtonID"
                  className="dockButtons"
                  onClick={() =>
                    (window.location.href = `https://www.hahaverse.com`)
                  }
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
                  <LogoutIcon style={{ transform: "scaleX(-1)" }}></LogoutIcon>
                </IconButton>
              </div>
            </Tooltip>
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
                    setEnvironmentModalOn={setEnvironmentModalOn}
                    portalModeOn={portalModeOn}
                    assistantModeOn={assistantModeOn}
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
                {!isDockEditorMode && (
                  <Dock
                    isAdmin={isAdmin}
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
                setAssistantPromptReact={setAssistantPromptReact}
                asistantPromptReact={asistantPromptReact}
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
            <AssistantHolder
              setAssistantModeOnBase={setAssistantModeOnBase}
              assistantModeOnBaseClass={assistantModeOnBaseClass}
              assistantModeOnBase={assistantModeOnBase}
              asistantPromptReact={asistantPromptReact}
              handleEditorOff={handleAssistantOff}
            ></AssistantHolder>
            {/* {uploadOpen && <FileUpload setUploadOpen={setUploadOpen} sendMessage={sendMessage} style={{position: 'absolute', zIndex: '15'}}></FileUpload> } */}
            {uploadOpen && (
              <AddContent
                setPortalModalOn={setPortalModalOn}
                setUploadOpen={setUploadOpen}
              ></AddContent>
            )}
            {/* <Button style={{ position: 'absolute', zIndex: '15' }} onClick={ReactshowRPM} variant="soft">Edit Avatar - PreTest</Button>*/}
          </div>
        )}
        <Toaster
          className="toasterCSS"
          richColors
          position="bottom-center"
        />
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
