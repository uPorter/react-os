import styles from './App.css';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Dock } from './components/Dock';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import LinearProgress from '@mui/joy/LinearProgress';
import { Button } from "@mui/joy";
import { Loader } from './components/Loader';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Avatar from '@mui/joy/Avatar';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Typography from '@mui/joy/Typography';

function App() {
  const { unityProvider, UNSAFE__unityInstance, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/unitybuildRPM/Build.loader.js",
    dataUrl: "/unitybuildRPM/Build.datas",
    frameworkUrl: "/unitybuildRPM/Build.framework.js",
    codeUrl: "/unitybuildRPM/Build.wasm",
  });

  window.unityInstance = UNSAFE__unityInstance

  const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.vars.palette.text.tertiary,
  }));

  return (
    <div className={styles.container}>
      <div style={{height: '100%',width: '100%',position: 'absolute', backgroundImage: "url(img/loader-background.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className={styles.unityWrapper}>
        {isLoaded === false && (<div className={"loader-layout"}>
            <div className={"load-section"}>
            <div className='loader' style={{ display: "flex", justifyContent: "center" }}>
                <div className='overlay'></div>
                <Grid className='loadergrid1' style={{ position: 'absolute', left: '125px', bottom: '125px' }} container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={15}>
                        <div className='avatar-container' style={{bottom:'25px', display: 'flex'}}>
                            <Avatar style={{background: '#246eff'}} alt="Porter" src="https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png" size="md" ></Avatar>
                            <Typography style={{ position: 'relative', top: '3px' }} className='loaderAvatarText' textColor="common.white" level="body2">Porter</Typography>
                        </div>
                        
                        <Typography className='loaderText' style={{ position: 'relative', bottom: '25px' }} fontWeight="lg" textColor="common.white" level="h1">Function Demo
                            <Button
                                style={{
                                    backgroundColor: '#00000000;',

                                    "&:hover": {
                                        background: "#efefef"
                                    },
                                }}
                                className='favButton'
                                disabled={false}
                                onClick={function () { }}
                                size="lg"
                                variant="plain">

                                <FavoriteBorderOutlinedIcon className='favIcon' Color="common.white"></FavoriteBorderOutlinedIcon>
                                <FavoriteOutlinedIcon className='favIconFilled' Color="common.white"></FavoriteOutlinedIcon>
                            </Button>
                        </Typography>
                        <LinearProgress color="neutral" thickness={5} style={{ width: '600px' }} determinate size="lg" value={loadingProgression * 100} />
                        <div className='descContainer' style={{display: 'flex'}}>
                            <Avatar className='avatardesc' style={{background: '#246eff'}} alt="Porter" src="https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png" size="sm" ></Avatar>
                            <Typography style={{ position: 'relative'}} className='avatarAltText' textColor="common.white" level="body2">Joining as Porter. Remember to follow our <Typography style={{ position: 'relative'}} className='communityguideAlt' textColor="common.white" level="body2">Community Guidelines</Typography> </Typography>
                        </div>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                </Grid>
            </div>
            </div>
          </div>)}
        {isLoaded === true && (<div className={"ui"}>
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
          </div>)}
        <Unity unityProvider={unityProvider} style={{ display: isLoaded ? "block" : "none" }}/>
      </div>
    </div>
  );
}

export default App;
