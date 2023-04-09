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
    if(isLoaded===true){
      setIsAvatarSelected(true)
      sendMessage("AvatarNick", "TestSetMethod", inputText);
      sendMessage("AvatarNick", "enableInput");
    }
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
        {isAvatarSelected === false && (<div className={"loader-layout"}>
          <div className={"load-section"}>
            <div className='loader' style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ backdropFilter: 'blur(5px)' }} className='overlay'></div>
              <div backgroundColor='#fff' className='avatarContainer'>
                <div className="box">
                  <Stack sty spacing={2} sx={{ borderRadius: '25px', width: '100%' }}>
                    <Typography style={{ width: '100%', position: 'relative', }} className='avatarSelectorTitle' textColor="common.black" level="body2">Choose your look</Typography>
                    <Input placeholder="Take a good one" className='avatarInput' onChange={handleChange} value={inputText} style={{ zIndex: '15' }} />
                    <Container className='avatarIcons' style={{}} maxWidth="sm">
                      <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-black-dreads-638e6994474e25e55be5d246/thumbnail-192.png" alt="Avatar1" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-black-dreads-6389056fa3a085619eaf9b32/thumbnail-192.png" alt="Avatar2" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-brown-polo-63890586a3a085619eaf9b64/thumbnail-192.png" alt="Avatar3" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-6389058ca3a085619eaf9b71/thumbnail-192.png" alt="Avatar4" />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-vest-6389059059d13f203a31bddf/thumbnail-192.png" alt="Avatar5" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hispanic-tracksuit-6389059c59d13f203a31bdfd/thumbnail-192.png" alt="Avatar6" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-brown-dress-shirt-638905a559d13f203a31be11/thumbnail-192.png" alt="Avatar7" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-hispanic-floral-shirt-638905a9a3a085619eaf9bab/thumbnail-192.png" alt="Avatar8" />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-nonbinary-short-hair-638905b559d13f203a31be36/thumbnail-192.png" alt="Avatar9" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-ranger-638905baa3a085619eaf9bce/thumbnail-192.png" alt="Avatar10" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-hijab-638905c2a3a085619eaf9bd5/thumbnail-192.png" alt="Avatar11" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-jacket-638905c759d13f203a31be52/thumbnail-192.png" alt="Avatar12" />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-nonbinary-suit-6386a03e226673df8a0dea04/thumbnail-192.png" alt="Avatar13" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-tanktop-638905e5a3a085619eaf9bf9/thumbnail-192.png" alt="Avatar14" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-white-crewneck-638905f059d13f203a31be89/thumbnail-192.png" alt="Avatar15" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/female-white-sunglasses-638905f659d13f203a31be95/thumbnail-192.png" alt="Avatar16" />
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid className='avatarGrid' container spacing={0} columns={16} sx={{ flexGrow: 1 }}>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
                            <img style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%' }} src="https://dd2cgqlmnwvp5.cloudfront.net/authless-rpm-avatars/male-asian-dress-shirt-638905fc59d13f203a31beab/thumbnail-192.png" alt="Avatar17" />
                          </Button>
                        </Grid>
                        <Grid className='avatarGridAlt' xs={4}>
                          <Button className='avatarGridItems'>
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
                  <Button style={{width:'100%',color: 'black',background:'#fff',fontWeight:'700',fontSize:'17px',border:'solid',padding: '15px',borderRadius:'50px',borderColor:'#bfbfbf', borderWidth:'3px'}} className='loadLeaveButton'>Leave</Button>
                  <div style={{height: '10px'}}></div>
                  {isLoaded === true && (<Button onClick={avatarHandler} style={{width:'100%',color: 'white',background:'#000',fontWeight:'700',fontSize:'17px',border:'solid',padding: '18.5px',borderRadius:'50px'}} className='loadStartButton'>Continue</Button>)}
                  {isLoaded === false && (<Button disabled={true} onClick={avatarHandler} style={{width:'100%',color: 'white',background:'#000',fontWeight:'700',fontSize:'17px',border:'solid',padding: '15px',borderRadius:'50px'}} className='loadStartButton'> <CircularProgress className='avatarProgressBar' thickness={2} /></Button>)}
                </div>
              </div>
              <Grid className='loadergrid1' style={{ position: 'absolute', left: '125px', bottom: '125px' }} container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                <Grid xs={16}>
                  <div className='avatar-container' style={{ bottom: '60px', display: 'flex' }}>
                    <Avatar style={{ background: '#246eff' }} alt="Porter" src="https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png" size="md" ></Avatar>
                    <Typography style={{ position: 'relative', top: '3px' }} className='loaderAvatarText' textColor="common.white" level="body2">Porter</Typography>
                  </div>
                  <Typography className='loaderText' style={{ position: 'relative', bottom: '50px' }} fontWeight="lg" textColor="common.white" level="h1">Function Demo
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

                  <Typography className='loaderTextDesc' style={{ fontSize: '15px', maxWidth: '500px', position: 'relative', bottom: '35px' }} fontWeight="lg" textColor="common.white" level="h1">
                    This demo was created to present all the functions of mugen to the user and to have a general idea of ​​what they want to do. You can create your avatar, chat with people, have meetings, and even create your own worlds.
                  </Typography>

                  <LinearProgress color="neutral" thickness={5} style={{ maxWidth: '600px' }} determinate size="lg" value={loadingProgression * 100} />
                  <div className='descContainer' style={{ display: 'flex' }}>
                    <Avatar className='avatardesc' style={{ background: '#246eff' }} alt="Porter" src="https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png" size="sm" ></Avatar>
                    <Typography style={{ position: 'relative' }} className='avatarAltText' textColor="common.white" level="body2">Joining as Porter.
                      <Typography style={{ left: '5px', position: 'relative' }} className='avatarAltText' textColor="common.white" level="body2">Remember to follow our
                        <Typography style={{ left: '5px', position: 'relative' }} className='communityguideAlt' textColor="common.white" level="body2">Community Guidelines
                        </Typography></Typography></Typography>

                  </div>
                </Grid>
                <Grid className='favGrid' xs={0}>

                </Grid>
              </Grid>
            </div>
          </div>
        </div>)}
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
          <Input placeholder="Take a good one" className='avatarInput' onChange={handleChange} value={inputText} style={{position:'absolute', zIndex: '0' }} />
        </div>)}
        <Unity className='container' unityProvider={unityProvider} style={{ display: isLoaded && isAvatarSelected ? "block" : "none" }} />
      </div>
    </div>
  );
}

export default App;
