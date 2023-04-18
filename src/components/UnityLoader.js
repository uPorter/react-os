import { ChangeEvent, useState, useEffect,useCallback } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Dock }  from './Dock';
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

    if(isLoaded === true ) {
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

    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
    );

    const handleChangePixelRatio = useCallback(
        function () {
            // A function which will update the device pixel ratio of the Unity
            // Application to match the device pixel ratio of the browser.
            const updateDevicePixelRatio = function () {
                setDevicePixelRatio(window.devicePixelRatio);
            };
            // A media matcher which watches for changes in the device pixel ratio.
            const mediaMatcher = window.matchMedia(
                `screen and (resolution: ${devicePixelRatio}dppx)`
            );
            // Adding an event listener to the media matcher which will update the
            // device pixel ratio of the Unity Application when the device pixel
            // ratio changes.
            mediaMatcher.addEventListener("change", updateDevicePixelRatio);
            return function () {
                // Removing the event listener when the component unmounts.
                mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
            };
        },
        [devicePixelRatio]
    );

    const Item = styled(Sheet)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        backgroundColor: 'black',
        color: theme.vars.palette.text.tertiary,
      }));



    return (
        <div className={"unity-instance"}>
            <div style={{ height: '100%', width: '100%', position: 'absolute', backgroundImage: "url(img/loader-background.png)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                {isLoaded === false && (
                    <div className='holder'>
                        <Loader loadingProgression={loadingProgression} avatarHandler={avatarHandler} isLoaded={isLoaded} handleChange={handleChange} inputText={inputText}></Loader>
                    </div>
                )}
                {isLoaded === true && (
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
                    <Button style={{ position: 'absolute', zIndex: '15' }} onClick={ReactshowRPM} variant="soft">Edit Avatar - PreTest</Button>
                </div>)}
                {/* <div backgroundColor='#fff' className='avatarContainer'>
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
                      <Button style={{ width: '100%', color: 'black', background: '#fff', fontWeight: '700', fontSize: '17px', border: 'solid', padding: '15px', borderRadius: '50px', borderColor: '#bfbfbf', borderWidth: '3px' }} className='loadLeaveButton'>Leave</Button>
                      <div style={{ height: '10px' }}></div>
                      {isLoaded === true && (<Button onClick={avatarHandler} style={{ width: '100%', color: 'white', background: '#000', fontWeight: '700', fontSize: '17px', border: 'solid', padding: '18.5px', borderRadius: '50px' }} className='loadStartButton'>Continue</Button>)}
                    </div>
                  </div> */}
                <Unity className='container' devicePixelRatio={devicePixelRatio} unityProvider={unityProvider} style={{ display: isLoaded ? "block" : "none" }} />
            </div>
        </div>
        // JSX ile bileşeninizi render edebilirsiniz
    );
}

export default UnityLoader;
