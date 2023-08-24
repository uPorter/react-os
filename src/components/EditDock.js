import React, { Component } from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/joy";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export class EditDock extends Component {
  render() {
    const {
      handleEditBar,
      objectName,
      isLocked,
      setIsLocked,
      handleInfoMode,
      setIsDockEditorMode,
      assistantModeOnBase,
    } = this.props;
    const SetEnvironmentModel = () => {
      window.sendMessageToUnityBasic(objectName, "SetEnvironmentModel");
    };

    const duplicateModel = () => {
      window.sendMessageToUnityBasic(objectName + "_parent", "DuplicateSelf");
    };

    const destroyModel = () => {
      setIsDockEditorMode(false);
      window.sendMessageToUnityBasic(objectName + "_parent", "DestroySelf");
    };

    const lockedStateManager = () => {
      window.sendMessageToUnityBasic(objectName, "setLocked");
      setIsLocked(!isLocked);
    };

    const buttonTextLock = isLocked ? "Unlock" : "Lock";

    const assistantMenuHandler = () => {
      if (!assistantModeOnBase) {
        window.sendMessageToUnityBasic(objectName + "_parent", "activeAsistant");
      } else {
        window.sendMessageToUnityBasic(objectName + "_parent", "disableAsistant");
      }
    };

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
          {!isLocked && (
            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="top"
              variant="soft"
              title={
                <Button
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#0046ff40",
                    "&:hover": {
                      backgroundColor: "#0046ff40",
                    },
                  }}
                >
                  Download Model
                </Button>
              }
            >
              <div
                style={{ width: "fit-content", height: "fit-content" }}
                className="tooltipHover2"
              >
                <IconButton
                  id="dockButtonID"
                  className="dockButtonsEditor"
                  variant="solid"
                  sx={{
                    "--IconButton-size": "55px",
                    "--IconButton-radius": "50px",
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </div>
            </Tooltip>
          )}

          <Tooltip
            className="dockTooltip"
            sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
            interactive
            color="neutral"
            placement="top"
            variant="soft"
            title={
              <Button
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  padding: "10px",
                  marginBottom: "-4px",
                  backgroundColor: "#0046ff40",
                  "&:hover": {
                    backgroundColor: "#0046ff40",
                  },
                }}
              >
                {buttonTextLock}
              </Button>
            }
          >
            <div
              style={{ width: "fit-content", height: "fit-content" }}
              className="tooltipHover2"
            >
              <IconButton
                id="dockButtonID"
                onClick={lockedStateManager}
                className="dockButtonsEditor"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                {isLocked && <LockIcon />}
                {!isLocked && <LockOpenIcon />}
              </IconButton>
            </div>
          </Tooltip>

          {!isLocked && (
            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="top"
              variant="soft"
              title={
                <Button
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#0046ff40",
                    "&:hover": {
                      backgroundColor: "#0046ff40",
                    },
                  }}
                >
                  Edit
                </Button>
              }
            >
              <div
                style={{ width: "fit-content", height: "fit-content" }}
                className="tooltipHover2"
              >
                <IconButton
                  id="dockButtonID"
                  onClick={handleEditBar}
                  className="dockButtonsEditor"
                  variant="solid"
                  sx={{
                    "--IconButton-size": "55px",
                    "--IconButton-radius": "50px",
                  }}
                >
                  <ModeEditIcon />
                </IconButton>
              </div>
            </Tooltip>
          )}

          {!isLocked && (
            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="top"
              variant="soft"
              title={
                <Button
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#0046ff40",
                    "&:hover": {
                      backgroundColor: "#0046ff40",
                    },
                  }}
                >
                  Info
                </Button>
              }
            >
              <div
                style={{ width: "fit-content", height: "fit-content" }}
                className="tooltipHover2"
              >
                <IconButton
                  onClick={handleInfoMode}
                  id="dockButtonID"
                  className="dockButtonsEditor"
                  variant="solid"
                  sx={{
                    "--IconButton-size": "55px",
                    "--IconButton-radius": "50px",
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </div>
            </Tooltip>
          )}

          <Tooltip
            className="dockTooltip"
            sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
            interactive
            color="neutral"
            placement="top"
            variant="soft"
            title={
              <Button
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  padding: "10px",
                  marginBottom: "-4px",
                  backgroundColor: "#0046ff40",
                  "&:hover": {
                    backgroundColor: "#0046ff40",
                  },
                }}
              >
                Duplicate
              </Button>
            }
          >
            <div
              style={{ width: "fit-content", height: "fit-content" }}
              className="tooltipHover2"
            >
              <IconButton
                id="dockButtonID"
                onClick={duplicateModel}
                className="dockButtonsEditor"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <img
                  style={{
                    width: "27px",
                    height: "27px",
                    verticalAlign: "middle",
                    marginBottom: "1px",
                  }}
                  alt="Duplicate"
                  src="https://www.spatial.io/_next/static/media/duplicate@2x.089e3183.png"
                  className="selected-object-buttons_icon__vNK_0"
                />
              </IconButton>
            </div>
          </Tooltip>

          {!isLocked && (
            <Tooltip
              className="dockTooltip"
              sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
              interactive
              color="neutral"
              placement="top"
              variant="soft"
              title={
                <Button
                  size="sm"
                  variant="plain"
                  sx={{
                    fontStyle: "bold",
                    fontWeight: "Bold",
                    color: "white",
                    padding: "10px",
                    marginBottom: "-4px",
                    backgroundColor: "#0046ff40",
                    "&:hover": {
                      backgroundColor: "#0046ff40",
                    },
                  }}
                >
                  Set Custom Environment
                </Button>
              }
            >
              <div
                style={{ width: "fit-content", height: "fit-content" }}
                className="tooltipHover2"
              >
                <IconButton
                  id="dockButtonID"
                  onClick={SetEnvironmentModel}
                  className="dockButtonsEditor"
                  variant="solid"
                  sx={{
                    "--IconButton-size": "55px",
                    "--IconButton-radius": "50px",
                  }}
                >
                  <img
                    style={{
                      width: "27px",
                      height: "27px",
                      verticalAlign: "middle",
                      marginBottom: "1px",
                    }}
                    alt="Duplicate"
                    src="https://www.spatial.io/_next/static/media/custom-environment@2x.03b69899.png"
                    className="selected-object-buttons_icon__vNK_0"
                  />
                </IconButton>
              </div>
            </Tooltip>
          )}

          <Tooltip
            className="dockTooltip"
            sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
            interactive
            color="neutral"
            placement="top"
            variant="soft"
            title={
              <Button
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  padding: "10px",
                  marginBottom: "-4px",
                  backgroundColor: "#0046ff40",
                  "&:hover": {
                    backgroundColor: "#0046ff40",
                  },
                }}
              >
                Delete
              </Button>
            }
          >
            <div
              style={{ width: "fit-content", height: "fit-content" }}
              className="tooltipHover2"
            >
              <IconButton
                id="dockButtonID"
                onClick={destroyModel}
                className="dockButtonsEditor"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <DeleteOutlineIcon style={{ width: "27px", height: "27px" }} />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip
            className="dockTooltip"
            sx={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
            interactive
            color="neutral"
            placement="top"
            variant="soft"
            title={
              <Button
                size="sm"
                variant="plain"
                sx={{
                  fontStyle: "bold",
                  fontWeight: "Bold",
                  color: "white",
                  padding: "10px",
                  marginBottom: "-4px",
                  backgroundColor: "#0046ff40",
                  "&:hover": {
                    backgroundColor: "#0046ff40",
                  },
                }}
              >
                Try Assistant
              </Button>
            }
          >
            <div
              style={{ width: "fit-content", height: "fit-content" }}
              className="tooltipHover2"
            >
              <IconButton
                id="dockButtonID"
                onClick={assistantMenuHandler}
                className="dockButtonsEditor"
                variant="solid"
                sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}
              >
                <svg
                  className="vector"
                  width={21}
                  height={19}
                  viewBox="0 0 21 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 12.65C15.5 13.649 14.6909 14.45 13.6818 14.45C12.6727 14.45 11.8636 13.649 11.8636 12.65C11.8636 11.651 12.6818 10.85 13.6818 10.85C14.6818 10.85 15.5 11.66 15.5 12.65ZM7.31818 10.85C6.31818 10.85 5.5 11.66 5.5 12.65C5.5 13.64 6.31818 14.45 7.31818 14.45C8.31818 14.45 9.13636 13.649 9.13636 12.65C9.13636 11.651 8.32727 10.85 7.31818 10.85ZM20.5 12.2V14.9C20.5 15.395 20.0909 15.8 19.5909 15.8H18.6818V16.7C18.6818 17.699 17.8727 18.5 16.8636 18.5H4.13636C3.13636 18.5 2.31818 17.699 2.31818 16.7V15.8H1.40909C0.909091 15.8 0.5 15.395 0.5 14.9V12.2C0.5 11.705 0.909091 11.3 1.40909 11.3H2.31818C2.31818 7.817 5.16364 5 8.68182 5H9.59091V3.857C9.04545 3.551 8.68182 2.966 8.68182 2.3C8.68182 1.31 9.5 0.5 10.5 0.5C11.5 0.5 12.3182 1.31 12.3182 2.3C12.3182 2.966 11.9545 3.551 11.4091 3.857V5H12.3182C15.8364 5 18.6818 7.817 18.6818 11.3H19.5909C20.0909 11.3 20.5 11.705 20.5 12.2ZM18.6818 13.1H16.8636V11.3C16.8636 8.816 14.8273 6.8 12.3182 6.8H8.68182C6.17273 6.8 4.13636 8.816 4.13636 11.3V13.1H2.31818V14H4.13636V16.7H16.8636V14H18.6818V13.1Z"
                    fill="white"
                  />
                </svg>
              </IconButton>
            </div>
          </Tooltip>
        </Box>
      </div>
    );
  }
}

export default EditDock;
