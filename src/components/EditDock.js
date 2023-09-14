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
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';

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
      isNpcEdit,
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
          {isNpcEdit && (
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
                  Start Following
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={29}
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <mask
                      id="mask0_109_26"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={35}
                      height={29}
                    >
                      <path
                        d="M0.168701 0.905029H34.0437V28.005H0.168701V0.905029Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_109_26)">
                      <path
                        d="M14.7947 7.66193C14.1951 7.66193 13.6655 7.43271 13.2071 6.97427C12.7487 6.51583 12.5183 5.98625 12.5183 5.38666C12.5183 4.78707 12.7487 4.27443 13.2071 3.85099C13.6655 3.39255 14.1951 3.16333 14.7947 3.16333C15.3943 3.16333 15.9239 3.39255 16.3823 3.85212C16.8419 4.27443 17.0711 4.78707 17.0711 5.38666C17.0711 5.98625 16.8419 6.51583 16.3823 6.97427C15.9239 7.43271 15.3943 7.66193 14.7947 7.66193Z"
                        fill="white"
                      />
                      <path
                        d="M8.21392 7.92728C7.43705 6.69198 7.01361 5.24551 6.9436 3.58677V3.16333H9.16693V3.69291C9.16693 5.35166 9.74845 6.65697 10.9138 7.60999C11.9368 8.38573 12.1129 8.77303 13.7005 8.77303C15.7827 8.77303 17.6187 9.42682 19.2052 10.7321C20.794 12.1086 21.5878 13.9085 21.5878 16.1307V16.7133H19.3644V16.1307C19.3644 14.6492 18.8349 13.485 17.7768 12.6382C17.6357 12.497 17.4065 12.3728 17.088 12.2667V17.8244L11.4422 18.9367V10.3618C10.1065 9.96863 8.95917 9.10343 8.21392 7.92728Z"
                        fill="white"
                      />
                      <path
                        d="M11.4604 23.4884L10.6677 21.1115C10.5765 20.8382 10.5932 20.5405 10.7143 20.2792C10.8354 20.0178 11.0518 19.8127 11.3192 19.7057L15.977 17.8425L19.3645 25.7467"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="square"
                      />
                    </g>
                  </svg>
                </IconButton>
              </div>
            </Tooltip>
          )}

          {isNpcEdit && (
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
                  Change skin
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
                  <AccessibilityNewOutlinedIcon/>
                </IconButton>
              </div>
            </Tooltip>
          )}

          {!isNpcEdit && (
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
          )}

          {!isLocked && !isNpcEdit && (
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

          {!isLocked && !isNpcEdit && (
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

          {!isNpcEdit && <Tooltip
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
          </Tooltip>}

          {!isLocked && !isNpcEdit && (
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

          {!isNpcEdit && (
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
                  <DeleteOutlineIcon
                    style={{ width: "27px", height: "27px" }}
                  />
                </IconButton>
              </div>
            </Tooltip>
          )}
        </Box>
      </div>
    );
  }
}

export default EditDock;
