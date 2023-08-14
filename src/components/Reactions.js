import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Typography from "@mui/joy/Typography";

const Reactions = () => {
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

  return (
    <div
      style={{
        position: "absolute",
        bottom: "75px",
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
        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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

        <button
          style={{ width: "48px", height: "48px" }}
          className="video-container"
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
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
          onMouseEnter={handleMouseEnter5}
          onMouseLeave={handleMouseLeave5}
        >
          <video
            style={{ filter: "invert(1)", width: "inherit" }}
            ref={videoRef5}
            className="video"
            loop
            controls={false}
          >
            <source
              src="https://dd2cgqlmnwvp5.cloudfront.net/emote_previews/Agree.webm"
              type="video/webm"
            />
          </video>
        </button>

        <div
          style={{
            border: "0.5px solid hsla(0,0%,100%,.25)",
            height: "80%",
            marginTop: "4px",
            marginLeft: "16px",
            marginRight: "16px",
          }}
        ></div>

        <button
          style={{ marginLeft: "5px", width: "48px", height: "48px" }}
          className="video-container"
        >
          <Typography level="h3">👍</Typography>
        </button>

        <button
          style={{ marginLeft: "10px", width: "48px", height: "48px" }}
          className="video-container"
        >
          <Typography level="h3">❤️</Typography>
        </button>
      </div>
    </div>
  );
};

export default Reactions;
