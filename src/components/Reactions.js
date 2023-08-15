import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Typography from "@mui/joy/Typography";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/joy";

const Reactions = ({ isReactionsOn, setIsReactionsOn, reactionClass }) => {
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


  return (
    <div
      className={`${reactionClass ? 'reactionIn' : 'reactionOut'}`}
      style={{
        position: "absolute",
        bottom: "74px",
        backgroundColor: "rgba(0,0,0,.25)",
        borderRadius: "100px",
        padding: "8px 16px",
        width: "390px",
        display: "flex",
        height: "48px",
        zIndex: 2,
        transformOrigin: "50% 100% 0px",
        opacity: 1,
        transform: "scale(.75)",
      }}
    >
      <div style={{ display: "flex" }} className="emoteGrid">
        <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
          fontStyle: 'bold',
          fontWeight: 'Bold',
          color: 'white',
          display: !isReactionsOn ? 'block!important' : 'none!important',
          padding: '10px',
          marginBottom: '-4px',
          transform: 'scale(0.7)',
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
              onClick={() => emotePlayer('emoji5')}
            >

              <video
                style={{ filter: "invert(1)", width: "inherit" }}
                ref={videoRef}
                className="video"
                loop
                controls={false}
              >
                <source
                  src="https://dd2cgqlmnwvp5.cloudfront.net/emote_previews/PopAndLock.webm"
                  type="video/webm"
                />
              </video>

            </button>
          </div>
        </Tooltip>


        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
          onClick={() => emotePlayer('emoji6')}
        >
          <video
            style={{ filter: "invert(1)", width: "inherit" }}
            ref={videoRef2}
            className="video"
            loop
            controls={false}
          >
            <source
              src="https://dd2cgqlmnwvp5.cloudfront.net/emote_previews/JupiterTwist.webm"
              type="video/webm"
            />
          </video>
        </button>

        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
          onMouseEnter={handleMouseEnter3}
          onMouseLeave={handleMouseLeave3}
          onClick={() => emotePlayer('emoji3')}
        >
          <video
            style={{ filter: "invert(1)", width: "inherit" }}
            ref={videoRef3}
            className="video"
            loop
            controls={false}
          >
            <source
              src="https://dd2cgqlmnwvp5.cloudfront.net/emote_previews/Clap.webm"
              type="video/webm"
            />
          </video>
        </button>

        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
          onMouseEnter={handleMouseEnter4}
          onMouseLeave={handleMouseLeave4}
          onClick={() => emotePlayer('emoji2')}
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
              src="https://dd2cgqlmnwvp5.cloudfront.net/emote_previews/GetDown.webm"
              type="video/webm"
            />
          </video>
        </button>

        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
        >
          <Typography level="h3">❤️</Typography>
        </button>

        <div
          style={{
            border: "0.5px solid hsla(0,0%,100%,.25)",
            height: "80%",
            marginTop: "4px",
            marginLeft: "8px",
            marginRight: "8px",
          }}
        ></div>

        <button
          style={{
            marginLeft: "8px",
            width: "48px",
            height: "48px",
            transform: "scale(1.3)",
          }}
          className="video-container"
        >
          <svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_234_20731)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.99978 18.7519V21.1522C4.01562 19.4296 2.01562 16.2069 2.01562 12.5001C2.01562 10.6957 2.48949 9.00613 3.32007 7.54839L4.78727 9.01558C4.27323 10.0709 3.98438 11.2536 3.98438 12.5001C3.98438 15.02 5.16487 17.2793 6.99978 18.7519ZM5.99978 4.50854C5.98785 4.5175 5.97593 4.52649 5.96404 4.5355L5.99978 4.57124V4.50854Z"
                fill="white"
              />
              <path
                d="M15.8906 8.60938L20.3438 13.1094L18.9375 14.5156L15 10.5312V22.4844H12.9844V16.4844H11.0156V22.4844H9V9.21875C7.53125 8.78125 6.32812 7.95312 5.39062 6.73438C4.45312 5.48437 3.98438 4.07812 3.98438 2.51562H6C6 3.89062 6.48438 5.0625 7.45312 6.03125C8.42188 7 9.59375 7.48438 10.9688 7.48438H13.5469C14.3594 7.48438 15.1406 7.85938 15.8906 8.60938ZM10.5469 5.9375C10.1719 5.53125 9.98438 5.04688 9.98438 4.48438C9.98438 3.92188 10.1719 3.45312 10.5469 3.07812C10.9531 2.70312 11.4375 2.51562 12 2.51562C12.5625 2.51562 13.0312 2.70312 13.4062 3.07812C13.8125 3.45312 14.0156 3.92188 14.0156 4.48438C14.0156 5.04688 13.8125 5.53125 13.4062 5.9375C13.0312 6.3125 12.5625 6.5 12 6.5C11.4375 6.5 10.9531 6.3125 10.5469 5.9375Z"
                fill="white"
              />
            </g>
            <path
              d="M23.3281 5.07812H23.5781V4.82812V4.17188V3.92188H23.3281H21.5781V2.17188V1.92188H21.3281H20.6719H20.4219V2.17188V3.92188H18.6719H18.4219V4.17188V4.82812V5.07812H18.6719H20.4219V6.82812V7.07812H20.6719H21.3281H21.5781V6.82812V5.07812H23.3281Z"
              fill="white"
              stroke="white"
              strokeWidth="0.5"
            />
            <defs>
              <clipPath id="clip0_234_20731">
                <rect
                  width={24}
                  height={24}
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>

        <button
          style={{
            width: "48px",
            height: "48px",
            color: "white",
            marginLeft: "6px",
          }}
          className="video-container"
        >
          <PinOutlinedIcon
            style={{ transform: "scale(1.5)" }}
          ></PinOutlinedIcon>
        </button>
      </div>
    </div>
  );
};

export default Reactions;
