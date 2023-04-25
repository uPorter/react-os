import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Dock } from './Dock';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import { Button } from "@mui/joy";
import Loader from './Loader';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';

const UnityLoader = () => {
  const { unityProvider, UNSAFE__unityInstance, isLoaded, loadingProgression, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "/unitybuild2/Build.loader.js",
    dataUrl: "/unitybuild2/Build.data.unityweb",
    frameworkUrl: "/unitybuild2/Build.framework.js.unityweb",
    codeUrl: "/unitybuild2/Build.wasm.unityweb",
  });
  //[TODO] This line for external instance connection
  window.unityInstance = UNSAFE__unityInstance

  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value);
  };

  const gameHandler = useCallback(() => {
    setIsStarted(true)
    console.log("You did it you mother fucker");
    console.log("Lookin Pretty Fine")
  }, []);

  const avatarHandler = () => {
    if (isLoaded === true) {
      setIsAvatarSelected(true)
      sendMessage("AvatarNick", "TestSetMethod", inputText);
      sendMessage("AvatarNick", "enableInput");
      window.setupRpmFrame();
    }
  }


  const ReactshowRPM = () => {
    window.showRpm();
  }

  if (isLoaded === true) {
    sendMessage("AvatarNick", "enableInput");
  }

  useEffect(() => {
    addEventListener("Started", gameHandler);

    return () => {
      removeEventListener("Started", gameHandler);
    };
  }, [addEventListener, removeEventListener, gameHandler]);


  function changeNick() {
    sendMessage("AvatarNick", "TestSetMethod", "Pussy Eater");
  }


  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: 'black',
    color: theme.vars.palette.text.tertiary,
  }));



  return (
    <div className={"unity-instance"}>
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundImage: "url(img/loader-background.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        {isStarted === false && (
          <div className='holder'>
            <Loader loadingProgression={loadingProgression} avatarHandler={avatarHandler} isLoaded={isLoaded} handleChange={handleChange} inputText={inputText}></Loader>
          </div>
        )}
        {isStarted === true && (
          <div className={"ui"}>
            <Grid style={{ position: "absolute", width: "100%", bottom: "55px" }} container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs style={{ opacity: 0 }}>
                <Button>Test</Button>
              </Grid>
              <Grid xs={6}>
                <Dock></Dock>
              </Grid>
              <Grid style={{ opacity: 0 }} xs>
                <Item>xs</Item>
              </Grid>
            </Grid>
            {/* <Button style={{ position: 'absolute', zIndex: '15' }} onClick={ReactshowRPM} variant="soft">Edit Avatar - PreTest</Button> */}
          </div>)}

        <Unity className='container' unityProvider={unityProvider} style={{ display: isLoaded ? "block" : "none" }} />
      </div>
    </div>
    // JSX ile bileşeninizi render edebilirsiniz
  );
}

export default UnityLoader;
