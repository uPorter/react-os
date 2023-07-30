import React, { Component } from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PresentToAllOutlinedIcon from "@mui/icons-material/PresentToAllOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/joy";
import Fade from '@mui/material/Fade';

export class Dock extends Component {
  render() {
    const { handleAddContent } = this.props;
    const [isScreenShareOn, setIsScreenShareOn] = useState(false);

    const toggleScreenShare = () =>{
      if(!isScreenShareOn){
        window.sendMessageToUnityBasic("VideoHolder", "reactStartScreenShare");
        setIsScreenShareOn(true);
      }else{
        window.sendMessageToUnityBasic("VideoHolder", "reactStopScreenShare");
        setIsScreenShareOn(false);
      }
      
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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

          <Tooltip TransitionComponent={Fade}  className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000040',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Turn on mic</Button>}>
            <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
              <IconButton
                id="dockButtonID"
                className="dockButtons"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <MicOffOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip TransitionComponent={Fade}  className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000040',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Emotes</Button>}>
            <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
              <IconButton
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

          <Tooltip TransitionComponent={Fade} className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={
          <div className="photoDockHolder">
            <Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
            width: "100%",
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000000',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Take a photo </Button>
          <Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
            width: "100%",
            color: 'white',
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000000',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Record a video</Button>
          <Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            transition: "0.5s all cubic-bezier(0, 0.2, 0.2, 1)",
            width: "100%",
            padding: '10px',
            backgroundColor: '#00000000',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Filming mode</Button>
          </div>
          }>
            <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
              <IconButton
                id="dockButtonID"
                className="dockButtons"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <CameraAltOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip TransitionComponent={Fade}  className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000040',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Share Screen</Button>}>
            <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
              <IconButton
                onClick={toggleScreenShare}
                id="dockButtonID"
                className="dockButtons"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <PresentToAllOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip TransitionComponent={Fade}  className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
            fontStyle: 'bold',
            fontWeight: 'Bold',
            color: 'white',
            padding: '10px',
            marginBottom: '-4px',
            backgroundColor: '#00000040',
            '&:hover': {
              backgroundColor: '#00000040',
            },
          }}>Add Content</Button>}>
            <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
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
}

