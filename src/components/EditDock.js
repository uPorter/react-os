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
      setEnvironmentModalOn,
      handleEditBar,
      objectName,
      isLocked,
      setIsLocked,
      handleInfoMode,
      setIsDockEditorMode,
    } = this.props;
    const SetEnvironmentModel = () => {
      setEnvironmentModalOn(true);
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

        </Box>
      </div>
    );
  }
}

export default EditDock;
