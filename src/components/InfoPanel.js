import React, { useState, useEffect, useCallback } from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Switch, { switchClasses } from "@mui/joy/Switch";
import "./Editor/style.css";
const InfoPanel = (props) => {
const { sendMessage, addEventListener, removeEventListener, objectName, handleEditorOff, setIsDockEditorMode} = props;
  const [isActive, setIsActive] = useState(false);
  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsActive(newValue);
  };
  const [animationClass, setAnimationClass] = useState("");
  const [animationHandler, setAnimationHandler] = useState("true");

  useEffect(() => {
    if (animationHandler) {
      setAnimationClass("editorActive");
    } else {
      setAnimationClass("editorDisabled"); // Animasyon süresine göre ayarlayın
    }
  }, [animationHandler]);

  const closeEditor = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleEditorOff();
    }, 550); // Animasyon süresine göre ayarlayın
  };

  window.closeInfoPanel = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleEditorOff();
    }, 550); // Animasyon süresine göre ayarlayın
  };
  return (
    <div
      className={animationClass}
      style={{
        zIndex: "99",
        position: "absolute",
        right: "0px",
        width: "380px",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgb(0 0 0 / 8%) 4rem, rgb(0 0 0 / 25%))",
        backdropFilter: "blur(8px)",
        display: "flex",
        transition: ".2s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Stack
        style={{
          transform: "scale(0.9)",
          width: "100%",
          height: "fit-content",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            color: "white",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{ marginBottom: "30px", fontWeight: "700" }}
            textColor="common.white"
            level="h4"
          >
            Information Panel
          </Typography>
        </div>

        <div
          style={{
            width: "100%",
            border: "1px solid rgb(255 255 255 / 30%)",
            borderRadius: "10px",
            margin: "0px 20px 0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 15px 6px",
            }}
          >
            <label
              style={{
                fontFamily: '"Segoe UI"',
                color: "white",
                display: "grid",
                gridAutoFlow: "column",
                gap: "90px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Name
              <input
                className="infoInput"
                placeholder="Cool Art Piece"
                style={{
                  textAlign: "right",
                  borderWidth: "0",
                  outline: "none",
                  fontFamily: "sans-serif",
                  fontSize: ".875rem",
                  fontWeight: "600",
                  background: "transparent",
                  color: "white",
                }}
              ></input>
            </label>
            <span
              style={{
                fontSize: ".625rem",
                color: "rgb(255 255 255 / 30%)",
                alignSelf: "flex-end",
              }}
            >
              0/100
            </span>
          </div>
          <hr
            style={{
              boxSizing: "border-box",
              border: "0 solid #ffffff63",
              height: "0px",
              color: "inherit",
              borderTopWidth: "1px",
            }}
          ></hr>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 15px 6px",
            }}
          >
            <label
              style={{
                fontFamily: '"Segoe UI"',
                color: "white",
                display: "grid",
                gridAutoFlow: "column",
                gap: "90px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Creator
              <input
                className="infoInput"
                placeholder="Artist"
                style={{
                  textAlign: "right",
                  borderWidth: "0",
                  outline: "none",
                  fontFamily: "sans-serif",
                  fontSize: ".875rem",
                  fontWeight: "600",
                  background: "transparent",
                  color: "white",
                }}
              ></input>
            </label>
            <span
              style={{
                fontSize: ".625rem",
                color: "rgb(255 255 255 / 30%)",
                alignSelf: "flex-end",
              }}
            >
              0/100
            </span>
          </div>
          <hr
            style={{
              boxSizing: "border-box",
              border: "0 solid #ffffff63",
              height: "0px",
              color: "inherit",
              borderTopWidth: "1px",
            }}
          ></hr>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 15px 6px",
            }}
          >
            <label
              style={{
                fontFamily: '"Segoe UI"',
                color: "white",
                display: "flex",
                flexDirection: "column",
                fontSize: "1rem",
                fontWeight: "600",
                alignItems: "flex-start",
              }}
            >
              Description
              <textarea
                className="infoInput"
                placeholder="This piece is cool because..."
                style={{
                  textAlign: "left",
                  borderWidth: "0",
                  height: "100px",
                  resize: "none",
                  width: "100%",
                  fontFamily: "sans-serif",
                  fontSize: ".875rem",
                  fontWeight: "600",
                  background: "transparent",
                  color: "white",
                  flexGrow: "1",
                  margin: "6px -2px 0",
                  outline: "none",
                }}
              ></textarea>
            </label>
            <span
              style={{
                fontSize: ".625rem",
                color: "rgb(255 255 255 / 30%)",
                alignSelf: "flex-end",
              }}
            >
              0/280
            </span>
          </div>
          <hr
            style={{
              boxSizing: "border-box",
              border: "0 solid #ffffff63",
              height: "0px",
              color: "inherit",
              borderTopWidth: "1px",
            }}
          ></hr>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 15px 6px",
            }}
          >
            <label
              style={{
                fontFamily: '"Segoe UI"',
                color: "white",
                display: "grid",
                gridAutoFlow: "column",
                gap: "90px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Link
              <input
                className="infoInput"
                placeholder="https://seam.agency"
                style={{
                  textAlign: "right",
                  borderWidth: "0",
                  outline: "none",
                  fontFamily: "sans-serif",
                  fontSize: ".875rem",
                  fontWeight: "600",
                  background: "transparent",
                  color: "white",
                }}
              ></input>
            </label>
          </div>
          <hr
            style={{
              boxSizing: "border-box",
              border: "transparent",
              height: "0px",
              color: "transparent",
              borderTopWidth: "1px",
            }}
          ></hr>
        </div>

        <div
          style={{
            width: "fit-content",
            border: "1px solid rgb(255 255 255 / 30%)",
            borderRadius: "10px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "18px 15px 18px",
            }}
          >
            <label
              style={{
                fontFamily: '"Segoe UI"',
                color: "white",
                display: "grid",
                gridAutoFlow: "column",
                gap: "80px",
                fontSize: "1rem",
                fontWeight: "600",
                "&:hover": {
                  color: "#00000040",
                },
              }}
            >
              Show Info Panel in Space
              <Switch
                sx={{
                  [`& .${switchClasses.thumb}`]: {
                    transition: "width 0.2s, left 0.2s",
                  },
                }}
                style={{
                  position: "relative",
                  right: "-5px",
                }}
                variant="soft"
                color="neutral"
                className="mainSwitch"
                checked={isActive}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "-30px",
          }}
        >
          <Button onClick={closeEditor} className="editorDoneButtonBlack">Save</Button>
          <Button onClick={closeEditor} className="editorDoneButtonWhite">Cancel</Button>
        </div>
      </Stack>
    </div>
  );
};

export default InfoPanel;
