import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Typography from "@mui/joy/Typography";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/joy";
import { Toaster, toast } from 'sonner';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';

const Reactions = ({ isReactionsOn, setIsReactionsOn, reactionClass, reactionEmojiHandler }) => {
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);



  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  const handleMouseEnter2 = () => {
    videoRef2.current.play();
  };

  const handleMouseLeave2 = () => {
    videoRef2.current.pause();
  };

  const handleMouseEnter3 = () => {
    videoRef3.current.play();
  };

  const handleMouseLeave3 = () => {
    videoRef3.current.pause();
  };

  const handleMouseEnter4 = () => {
    videoRef4.current.play();
  };

  const handleMouseLeave4 = () => {
    videoRef4.current.pause();
  };

  const handleMouseEnter5 = () => {
    videoRef5.current.play();
  };

  const handleMouseLeave5 = () => {
    videoRef5.current.pause();
  };


  const emotePlayer = (datainput) => {
    window.sendMessageToUnity("EmoteHandler", "emoteHandler", datainput);
  };

  const wipError = () => {
    window.toastError('Work in progress...');
  }


  return (
    <div
      className={`${reactionClass ? 'reactionIn' : 'reactionOut'}`}
      style={{
        position: "absolute",
        bottom: "74px",
        backgroundColor: "rgba(0,0,0,.25)",
        borderRadius: "100px",
        padding: "8px 16px",
        width: "300px",
        display: "flex",
        height: "48px",
        zIndex: 2,
        transformOrigin: "50% 100% 0px",
        opacity: 1,
        justifyContent: "center",
        transform: "scale(.75)",
      }}
    >
      <div style={{ display: "flex" }} className="emoteGrid">
        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          padding: '10px',
          marginBottom: '-10px',
          transform: 'scale(0.85)',
          backgroundColor: '#00000040',
          '&:hover': {
            backgroundColor: '#00000040',
          },
        }}>Pop And Lock</Button>}>
          <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
            <button
              style={{ width: "48px", height: "48px" }}
              className="video-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => emotePlayer('emoji4')}
            >

              <video
                style={{ filter: "invert(1)", width: "inherit" }}
                ref={videoRef}
                className="video"
                loop
                controls={false}
              >
                <source
                  src="https://react-os-three.vercel.app/img/PopAndLock.webm"
                  type="video/webm"
                />
              </video>

            </button>
          </div>
        </Tooltip>

        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          padding: '10px',
          marginBottom: '-10px',
          transform: 'scale(0.85)',
          backgroundColor: '#00000040',
          '&:hover': {
            backgroundColor: '#00000040',
          },
        }}>Jupiter Twist</Button>}>
          <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
            <button
              style={{ width: "48px", height: "48px" }}
              className="video-container"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
              onClick={() => emotePlayer('emoji3')}
            >
              <video
                style={{ filter: "invert(1)", width: "inherit" }}
                ref={videoRef2}
                className="video"
                loop
                controls={false}
              >
                <source
                  src="https://react-os-three.vercel.app/img/JupiterTwist.webm"
                  type="video/webm"
                />
              </video>
            </button>
          </div>
        </Tooltip>

        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          padding: '10px',
          marginBottom: '-10px',
          transform: 'scale(0.85)',
          backgroundColor: '#00000040',
          '&:hover': {
            backgroundColor: '#00000040',
          },
        }}>Clap</Button>}>
          <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
            <button
              style={{ width: "48px", height: "48px" }}
              className="video-container"
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
              onClick={() => emotePlayer('emoji2')}
            >
              <video
                style={{ filter: "invert(1)", width: "inherit" }}
                ref={videoRef3}
                className="video"
                loop
                controls={false}
              >
                <source
                  src="https://react-os-three.vercel.app/img/Clap.webm"
                  type="video/webm"
                />
              </video>
            </button>
          </div>
        </Tooltip>


        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          padding: '10px',
          marginBottom: '-10px',
          transform: 'scale(0.85)',
          backgroundColor: '#00000040',
          '&:hover': {
            backgroundColor: '#00000040',
          },
        }}>Get Down</Button>}>
          <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
            <button
              style={{ width: "48px", height: "48px" }}
              className="video-container"
              onMouseEnter={handleMouseEnter4}
              onMouseLeave={handleMouseLeave4}
              onClick={() => emotePlayer('emoji6')}
            >
              <video
                style={{
                  filter: "invert(1)",
                  width: "inherit",
                  marginBottom: "-5px",
                }}
                ref={videoRef4}
                className="video"
                loop
                controls={false}
              >
                <source
                  src="https://react-os-three.vercel.app/img/GetDown.webm"
                  type="video/webm"
                />
              </video>
            </button>
          </div>
        </Tooltip>

        <div
          style={{
            border: "0.5px solid hsla(0,0%,100%,.25)",
            height: "80%",
            marginTop: "4px",
            marginLeft: "14px",
            marginRight: "14px",
          }}
        ></div>

        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          padding: '10px',
          marginBottom: '-10px',
          transform: 'scale(0.85)',
          backgroundColor: '#00000040',
          '&:hover': {
            backgroundColor: '#00000040',
          },
        }}>All Particles</Button>}>
          <div style={{ width: 'fit-content', height: 'fit-content' }} className='tooltipHover2'>
            <button
              style={{ width: "48px", height: "48px", color: "white" }}
              className="video-container"
              onClick={() => reactionEmojiHandler()}
            >
              <AddReactionOutlinedIcon style={{ width: "64px", height: "35px" }}></AddReactionOutlinedIcon>
            </button>
          </div>
        </Tooltip>

      </div>
    </div>
  );
};

export default Reactions;
