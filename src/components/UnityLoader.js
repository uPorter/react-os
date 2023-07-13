import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Dock } from './Dock';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import { Button } from "@mui/joy";
import IconButton from '@mui/joy/IconButton';
import Loader from './Loader';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import FileUpload from './FileUpload.js';
import ChatComponent from './ChatComponent';
import { StreamChat } from 'stream-chat';
import { Toaster, toast } from 'sonner'
import 'stream-chat-react/dist/css/index.css';
import EditorPanel from './Editor/EditorPanel';
import AddContent from './AddContent/AddContent';
import EditDock from "./EditDock";
import GuestDock from "./GuestDock";
import { useParams } from 'react-router-dom';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const chatClient = StreamChat.getInstance('tj5s8c5z6vg3');

const UnityLoader = () => {
  const { spaceName, name, id, admin } = useParams();

  const { unityProvider, UNSAFE__unityInstance, isLoaded, loadingProgression, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "/unitybuild2/Build.loader.js",
    dataUrl: "/unitybuild2/Build.data.unityweb",
    frameworkUrl: "/unitybuild2/Build.framework.js.unityweb",
    codeUrl: "/unitybuild2/Build.wasm.unityweb",
  });
  //[TODO] This line for external instance connection
  window.unityInstance = UNSAFE__unityInstance

  window.sendMessageToUnity = (objectName, methodName, parameter) => {
    if (sendMessage) {
      sendMessage(objectName, methodName, parameter);
    }
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
  const [userToken, setUserToken] = useState('');
  const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || 'https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png');
  const [userSigned, setUserSigned] = useState(JSON.parse(localStorage.getItem('userSigned')) || true)
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [objectName, setObjectNameReact] = useState('');
  const [isDockEditorMode, setIsDockEditorMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
  }

  function generateUID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';

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
      localStorage.setItem('userID', newUID);
    }
  }, [userID]);

  const handleEditorMode = () => {
    setIsDockEditorMode(true);
  }

  const handleEditBar = () => {
    setIsEditorMode(true);
  }

  const handleEditorInMode = () => {
    setIsDockEditorMode(false);
  }

  const handleEditorOff = () => {
    setTimeout(() => {
      setIsEditorMode(false);
    }, 600); // 500 milisaniye (0.5 saniye) bekleme süresi
  }

  useEffect(() => {
    localStorage.setItem('userID', userID);
  }, [userID]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('userToken', userToken);
  }, [userToken]);

  useEffect(() => {
    localStorage.setItem('userImage', userImage);
  }, [userImage]);

  useEffect(() => {
    localStorage.setItem('userSigned', userSigned);
  }, [userSigned]);




  useEffect(() => {
    if (isStarted && userSigned) {
      // belirli bir kodu buraya yazabilirsiniz
      handleClick();
      console.clear();
      sendMessage("AvatarNick", "enableInput");
      sendMessage("AvatarNick", "TestSetMethod", userName);
      console.log(name);
      console.log(id);

    }
  }, [isStarted, userSigned]);


  const handleChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
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
  }

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
        userToken,
      );
      connect();
      toast.success('Connection successful!')
      console.log("Connection successful!");
    } else {
      toast.error('We ran into a problem! Please try again..')
      console.log("Retry");
    }
  };

  const connect = async () => {
    const channel = chatClient.channel('livestream', 'newch');
    await channel.watch();
    setShowChat(true);
    avatarHandler();
    await setUserSigned(true);
  }


  const getUserToken = async () => {
    try {
      const response = await fetch(`https://04d1-103-133-178-51.ngrok-free.app/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: 'tj5s8c5z6vg3',
          apiSecret: '5pbyrg6c9jfyx6uc2p2h382x9t7k6mce7vjtz3xp6n9smxqd97tfsg2c4u5j3cmf',
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
    setIsStarted(true)
    console.log("Instance Started!");

  }, []);

  const avatarHandler = () => {
    if (isLoaded === true) {
      sendMessage("AvatarNick", "TestSetMethod", userName);
      //admin place
      if (admin === "true") {
        sendMessage("adminManager", "setAdminTrue");
      } else {
        sendMessage("adminManager", "setAdminFalse");
      }
      //sendMessage("AvatarNick", "enableInput");
      window.setupRpmFrame();
    }
  }

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
  }

  const handleObjectHoverEnter = () => {
    const container = document.querySelector('.container');
    container.style.cursor = 'move';
  }

  useEffect(() => {
    addEventListener("ObjectHoverEnter", handleObjectHoverEnter);

    return () => {
      removeEventListener("ObjectHoverEnter", handleObjectHoverEnter);
    };
  }, [addEventListener, removeEventListener, handleObjectHoverEnter]);

  const handleObjectHoverExit = () => {
    const container = document.querySelector('.container');
    container.style.cursor = 'grab';
  }

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


  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: 'black',
    color: theme.vars.palette.text.tertiary,
  }));

  const onBlurSet = async () => {
    const data = await getUserToken();
    setUserToken(data.token);
    console.log(data.token);
    sendMessage("AvatarNick", "enableInput")
  }


  return (
    <div className={"unity-instance"}>
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundImage: "url(https://react-os-three.vercel.app/img/Splash2.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        {isStarted === false && (
          <div className='holder'>
            <Loader loadingProgression={loadingProgression} avatarHandler={avatarHandler} isLoaded={isLoaded} handleChange={handleChange} inputText={userID}></Loader>
          </div>
        )}
        {isStarted && !showChat && (
          <div backgroundColor='#fff' className='avatarContainer'>
            <div className="box">
              <Stack sty spacing={2} sx={{ borderRadius: '25px', width: '100%' }}>
                <Typography style={{ width: '100%', position: 'relative', }} className='avatarSelectorTitle' textColor="common.black" level="body2">Choose your look</Typography>
                <Input placeholder="Take a good one" className='avatarInput' onFocus={() => sendMessage("AvatarNick", "Start")} onBlur={onBlurSet} onChange={handleChange} value={userName} style={{ zIndex: '15' }} />
                <Container className='avatarIcons' style={{}} maxWidth="sm">
                  <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-black-dreads-638e6994474e25e55be5d246/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-black-dreads-638e6994474e25e55be5d246/thumbnail-192.png" alt="Avatar1" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-black-dreads-6389056fa3a085619eaf9b32/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-black-dreads-6389056fa3a085619eaf9b32/thumbnail-192.png" alt="Avatar2" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-brown-polo-63890586a3a085619eaf9b64/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-brown-polo-63890586a3a085619eaf9b64/thumbnail-192.png" alt="Avatar3" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-6389058ca3a085619eaf9b71/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-6389058ca3a085619eaf9b71/thumbnail-192.png" alt="Avatar4" />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-vest-6389059059d13f203a31bddf/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-vest-6389059059d13f203a31bddf/thumbnail-192.png" alt="Avatar5" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hispanic-tracksuit-6389059c59d13f203a31bdfd/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hispanic-tracksuit-6389059c59d13f203a31bdfd/thumbnail-192.png" alt="Avatar6" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-shirt-638905a559d13f203a31be11/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-shirt-638905a559d13f203a31be11/thumbnail-192.png" alt="Avatar7" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-hispanic-floral-shirt-638905a9a3a085619eaf9bab/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-hispanic-floral-shirt-638905a9a3a085619eaf9bab/thumbnail-192.png" alt="Avatar8" />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-nonbinary-short-hair-638905b559d13f203a31be36/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-nonbinary-short-hair-638905b559d13f203a31be36/thumbnail-192.png" alt="Avatar9" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-ranger-638905baa3a085619eaf9bce/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-ranger-638905baa3a085619eaf9bce/thumbnail-192.png" alt="Avatar10" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hijab-638905c2a3a085619eaf9bd5/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hijab-638905c2a3a085619eaf9bd5/thumbnail-192.png" alt="Avatar11" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-jacket-638905c759d13f203a31be52/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-jacket-638905c759d13f203a31be52/thumbnail-192.png" alt="Avatar12" />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-nonbinary-suit-6386a03e226673df8a0dea04/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-nonbinary-suit-6386a03e226673df8a0dea04/thumbnail-192.png" alt="Avatar13" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-tanktop-638905e5a3a085619eaf9bf9/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-tanktop-638905e5a3a085619eaf9bf9/thumbnail-192.png" alt="Avatar14" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-crewneck-638905f059d13f203a31be89/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-crewneck-638905f059d13f203a31be89/thumbnail-192.png" alt="Avatar15" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-sunglasses-638905f659d13f203a31be95/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-sunglasses-638905f659d13f203a31be95/thumbnail-192.png" alt="Avatar16" />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-asian-dress-shirt-638905fc59d13f203a31beab/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-asian-dress-shirt-638905fc59d13f203a31beab/thumbnail-192.png" alt="Avatar17" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                      <Button className='avatarGridItems' onClick={() => setUserImage('https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-asian-dress-638905eba3a085619eaf9c02/thumbnail-192.png')}>
                        <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-asian-dress-638905eba3a085619eaf9c02/thumbnail-192.png" alt="Avatar18" />
                      </Button>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                    </Grid>
                    <Grid className='avatarGridAlt' xs={4}>
                    </Grid>
                  </Grid>
                </Container>
                <div className='spacer50px'></div>
              </Stack>
              <Button style={{ width: '100%', color: 'black', background: '#fff', fontWeight: '700', fontSize: '17px', border: 'solid', padding: '15px', borderRadius: '50px', borderColor: '#bfbfbf', borderWidth: '3px' }} className='loadLeaveButton'>Leave</Button>
              <div style={{ height: '10px' }}></div>
              <Button onClick={handleClick} style={{ width: '100%', color: 'white', background: '#000', fontWeight: '700', fontSize: '17px', border: 'solid', padding: '18.5px', borderRadius: '50px' }} className='loadStartButton'>Continue</Button>
            </div>
          </div>
        )}
        {isStarted && showChat && (
          <div className={"ui"}>
            <Grid className="unityLoaderGrid" style={{ position: "absolute", width: "100%", bottom: "20px" }} container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid className="EmptyGrid" xs style={{ opacity: 1, display: "flex", gap: "7px" }}>
                {isAdmin && (
                  <div className='syncDock'>
                    <IconButton
                      id="dockButtonID"
                      className="dockButtonsBase"
                      variant="solid"
                      onClick={() => sendMessage("SaveManager", "SaveFile", spaceName)}
                      style={{ background:"#00000000important" }}
                      sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                      }}
                    >
                      <SaveIcon />
                    </IconButton>

                    <IconButton
                      id="dockButtonID"
                      className="dockButtonsBase"
                      variant="solid"
                      onClick={() => sendMessage("SaveManager", "LoadSystem", spaceName)}
                      style={{background:"#00000000!important" }}
                      sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                      }}
                    >
                      <EmojiPeopleIcon />
                    </IconButton>

                  </div>)}
              </Grid>
              <Grid xs={6}>
                {isDockEditorMode && <EditDock objectName={objectName} handleEditBar={handleEditBar} handleAddContent={handleAddContent}></EditDock>}
                {!isDockEditorMode && isAdmin && <Dock handleAddContent={handleAddContent}></Dock>}
                {!isAdmin && <GuestDock handleAddContent={handleAddContent}></GuestDock>}
              </Grid>
              <Grid style={{ opacity: 1 }} xs>
                <ChatComponent spaceName={spaceName} userName={userName} showChat={showChat} sendMessage={sendMessage} userID={userID} userToken={userToken} userImage={userImage} />
              </Grid>
            </Grid>

            {isEditorMode && <EditorPanel objectName={objectName} sendMessage={sendMessage} setIsDockEditorMode={setIsDockEditorMode} handleEditorMode={handleEditorMode} handleEditorOff={handleEditorOff} addEventListener={addEventListener} removeEventListener={removeEventListener}></EditorPanel>}
            {/* {uploadOpen && <FileUpload setUploadOpen={setUploadOpen} sendMessage={sendMessage} style={{position: 'absolute', zIndex: '15'}}></FileUpload> } */}
            {uploadOpen && <AddContent setUploadOpen={setUploadOpen}></AddContent>}
            {/* <Button style={{ position: 'absolute', zIndex: '15' }} onClick={ReactshowRPM} variant="soft">Edit Avatar - PreTest</Button>*/}
          </div>)}
        <Toaster className='toasterCSS' richColors position="bottom-center" />
        <Unity className='container' unityProvider={unityProvider} style={{ cursor: 'grab', display: isLoaded ? "block" : "none" }} />
      </div>
    </div>
    // JSX ile bileşeninizi render edebilirsiniz
  );
}

export default UnityLoader;
