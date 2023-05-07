import styles from './App.css';
import Input from '@mui/joy/Input';
import { ChangeEvent, useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Dock } from './components/Dock';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import LinearProgress from '@mui/joy/LinearProgress';
import { Button } from "@mui/joy";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Avatar from '@mui/joy/Avatar';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/joy/CircularProgress';
import Loader from './components/Loader';

function App() {
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

  const gameHandler = () => {
    setIsStarted(true)
    console.log("You did it you mother fucker");
  }

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
    <div className={styles.container}>
      <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundImage: "url(img/loader-background.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className={styles.unityWrapper}>
        {isAvatarSelected === false && (<div className='holder'>
          <Loader loadingProgression={loadingProgression} avatarHandler={avatarHandler} isLoaded={isLoaded} handleChange={handleChange} inputText={inputText}></Loader>
        </div>
        )}
        {isLoaded === true && isAvatarSelected === true && (<div className={"ui"}>
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
          <Input placeholder="Take a good one" className='avatarInput' onChange={handleChange} value={inputText} style={{ position: 'absolute', zIndex: '-1' }} />
          <Button style={{position:'absolute', zIndex: '15'}} onClick={ReactshowRPM} variant="soft">Soft</Button>
        </div>)}
        <Unity className='container' unityProvider={unityProvider} style={{ display: isLoaded && isAvatarSelected ? "block" : "none" }} />
      </div>
    </div>
  );
}

export default App;
