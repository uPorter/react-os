import React, { Component } from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export class EditDock extends Component {
  render() {
    //const { handleAddContent } = this.props;
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

          <IconButton
            id="dockButtonID"
            className="dockButtonsEditor"
            variant="solid"
            sx={{
              "--IconButton-size": "55px",
              "--IconButton-radius": "50px",
            }}
          >
            <LockOpenIcon />
          </IconButton>

          <IconButton
            id="dockButtonID"
            className="dockButtonsEditor"
            variant="solid"
            sx={{
              "--IconButton-size": "55px",
              "--IconButton-radius": "50px",
            }}
          >
            <ModeEditIcon />
          </IconButton>

          <IconButton
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

          <IconButton
            id="dockButtonID"
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

          <IconButton
            id="dockButtonID"
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

          <IconButton
            id="dockButtonID"
            className="dockButtonsEditor"
            variant="solid"
            sx={{
              "--IconButton-size": "55px",
              "--IconButton-radius": "50px",
            }}
          >
            <DeleteOutlineIcon style={{ width: "27px", height: "27px" }} />
          </IconButton>
        </Box>
      </div>
    );
  }
}

export default EditDock;
