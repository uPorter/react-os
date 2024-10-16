// Başka bir bileşen dosyası

import Grid from '@mui/joy/Grid';
import LinearProgress from '@mui/joy/LinearProgress';
import { Button } from "@mui/joy";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Avatar from '@mui/joy/Avatar';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';


const Loader = ({ loadingProgression, isLoaded,userSpaceName,userSpaceDesc,ownerName }) => {
  const [userNameL, setUserNameL] = useState(localStorage.getItem('userName') || 'Guest');
  const [userImageL, setUserImageL] = useState(localStorage.getItem('userImage') || 'https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png');
  // loadingProgression değerini kullanarak başka işlemler yapabilirsiniz

  return (
    <div className={"loader-layout"}>
      <div className={"load-section"}>
        <div className='loader' style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ backdropFilter: 'blur(5px)' }} className='overlay'></div>
          <Grid className='responsiveGrid' style={{ width: '100%', height: '100%', position: 'absolute' }} container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
            <Grid className="mainGrid2" xs={8}>
              <Grid className='loadergrid1' style={{ position: 'absolute', left: '2.5%', bottom: '5%', scale: '0.9' }} container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                <Grid xs={16}>
                  <div className='avatar-container' style={{ bottom: '60px', display: 'flex' }}>
                    <Avatar style={{ background: '#246eff' }} alt={userNameL} src={"https://models.readyplayer.me/63d5148460d1b8cc82dca9db.png"} size="md" ></Avatar>
                    <Typography style={{ position: 'relative', top: '3px' }} className='loaderAvatarText' textColor="common.white" level="body2">{ownerName}</Typography>
                  </div>
                  <Typography className='loaderText' style={{ position: 'relative', bottom: '50px' }} fontWeight="lg" textColor="common.white" level="h1">{userSpaceName}
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
                  <Typography className='loaderTextDesc' style={{ fontSize: '15px', maxWidth: '500px', position: 'relative', bottom: '35px' }} fontWeight="lg" textColor="common.white" level="h1">{userSpaceDesc}</Typography>
                  {isLoaded === false && (<LinearProgress className="loader-progress" color="neutral" thickness={5} style={{ maxWidth: '600px' }} determinate size="lg" value={loadingProgression * 100} />)}
                  {isLoaded === true && (<LinearProgress className="loader-progress-success" color="success" thickness={5} style={{ maxWidth: '600px' }} determinate size="lg" value={loadingProgression * 100} />)}
                  <div className='descContainer' style={{ display: 'flex' }}>
                    <Avatar className='avatardesc' style={{ background: '#246eff' }} alt="Porter" src={userImageL} size="sm" ></Avatar>
                    <Typography style={{ position: 'relative' }} className='avatarAltText' textColor="common.white" level="body2">Joining as {userNameL}.
                      <Typography style={{ left: '5px', position: 'relative' }} className='avatarAltText' textColor="common.white" level="body2">Remember to follow our
                        <Typography style={{ left: '5px', position: 'relative' }} className='communityguideAlt' textColor="common.white" level="body2">Community Guidelines
                        </Typography></Typography></Typography>
                  </div>
                </Grid>
                <Grid className='favGrid' xs={0}>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={8} className="responsiveGrid">
              {/* Controls Place */}
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
    // JSX ile bileşeninizi render edebilirsiniz
  );
}

export default Loader;
