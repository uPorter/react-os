import React, { useRef, useState, useEffect, useCallback } from "react";
import "./addcontent.css";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import VirtualizedList from "./VirtualizedList";
import VirtualizedListFurt from "./VirtualizedListFurt";
import VirtualizedListSketchfab from "./VirtualizedListSketchfab";
import data from "./data";
import data1 from "./data1";
import data2 from "./data2";
import FileUpload from "../FileUpload";

const AddContent = (props) => {
  const { setUploadOpen } = props;
  const [isClosed, setIsClosed] = React.useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [backClass, setBackClass] = useState("");
  const [animationHandler, setAnimationHandler] = useState("true");
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;

    const scrollHandler = () => {
      const { scrollTop, scrollHeight, clientHeight } = panel;

      if (scrollTop + clientHeight >= scrollHeight) {
        window.loadNextPage();
        console.log("scroll done");
      }
    };

    panel.addEventListener("scroll", scrollHandler);

    return () => {
      panel.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleClose = () => {
    setUploadOpen(false);
  };

  useEffect(() => {
    if (animationHandler) {
      setAnimationClass("container-addcontent addContentActive");
      setBackClass("addContentActiveback");
    } else {
      setAnimationClass("container-addcontent addContentDisabled");
      setBackClass("addContentDisabledback"); // Animasyon süresine göre ayarlayın
    }
  }, [animationHandler]);

  const closeContent = () => {
    setAnimationHandler(false);
    setTimeout(() => {
      handleClose();
    }, 450); // Animasyon süresine göre ayarlayın
  };

  return (
    <div>
      <div
        onClick={closeContent}
        className={backClass}
        style={{
          zIndex: "51",
          background: "rgb(0 0 0 / 33%)",
          backdropFilter: "blur(1px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div className={animationClass}>
        <IconButton className="closeButton-addcontent" onClick={closeContent}>
          <CloseIcon onClick={closeContent} />
        </IconButton>

        <Tabs
          className="content-addcontent"
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 300, borderRadius: "lg" }}
        >
          <div className="flexContainer">
            <div style={{ width: "fit-content", height: "fit-content" }}>
              <Typography
                style={{
                  fontSize: "1.75rem",
                  position: "relative",
                  fontWeight: "900",
                  color: "white",
                  marginTop: "24px",
                  marginBottom: "3px",
                }}
                level="h2"
              >
                Contentㅤㅤ
              </Typography>
              <div style={{ overflow: "hidden" }}>
                <Divider
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    height: "1px",
                    width: "165px",
                    backgroundColor: "white",
                    opacity: "0.5",
                  }}
                />
              </div>

              <TabList
                style={{ marginLeft: "-9px" }}
                className="tabHolder"
                variant="plain"
                sx={{
                  "--List-padding": "0px",
                  "--List-radius": "0px",
                  "--ListItem-minHeight": "40px",
                  bgcolor: "transparent",
                  color: "white!important",
                  [`& .${tabClasses.root}`]: {
                    boxShadow: "none",
                    fontWeight: "md",
                    background: "transparent",
                    [`&.${tabClasses.selected}::before`]: {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      left: "var(--ListItem-paddingLeft)", // change to `0` to stretch to the edge.
                      right: "var(--ListItem-paddingRight)", // change to `0` to stretch to the edge.
                      bottom: 0,
                      height: 3,
                      color: "white!important",
                      bgcolor: "transparent",
                    },
                    [`&.${tabClasses.selected}`]: {
                      color: "white!important",
                    },
                  },
                }}
              >
                <Tab>Archive</Tab>
                <Tab>STUFF</Tab>
                <Tab>FURNITURE</Tab>
                <Tab>SKETCHFAB</Tab>
                <Tab>UPLOAD</Tab>
              </TabList>
            </div>

            <button onClick={() => window.sendMessageToUnityBasic("portalUrlManager","SpawnObject")} className="createPortal" type="button">
              <span class="inline-flex flex-shrink-0 mr-1">
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-sm"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.1091 4.33333C12.5341 4.33333 11.0042 5.13045 9.82474 6.5H7.17278C8.71429 3.91113 11.1763 2.16666 14.1091 2.16666C19.1331 2.16666 22.7757 7.28606 22.7757 13C22.7757 18.7139 19.1331 23.8333 14.1091 23.8333C11.1763 23.8333 8.71429 22.0889 7.17278 19.5L2.19205 19.5V17.3333L19.7408 17.3333C20.0314 16.6692 20.2583 15.9434 20.4072 15.1667L6.52539 15.1667V13H20.6091C20.6091 12.243 20.5385 11.5183 20.4072 10.8333H2.19205V8.66666H19.7408C18.5765 6.0053 16.3901 4.33333 14.1091 4.33333ZM18.3934 19.5L9.82474 19.5C11.0042 20.8695 12.5341 21.6667 14.1091 21.6667C15.6841 21.6667 17.2139 20.8695 18.3934 19.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              Create Portal
            </button>
          </div>

          <Divider
            style={{
              marginLeft: "1.5rem",
              marginRight: "1.5rem",
              width: "2px",
              color: "white",
              background: "#ffffff4f",
            }}
            orientation="vertical"
          ></Divider>
          <TabPanel
            className="tabPanel"
            sx={{ p: 2, minHeight: 200, overflow: "hidden" }}
          >
            <VirtualizedList closeContent={closeContent} data={data} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={1}
            sx={{ p: 2, minHeight: 200, overflow: "hidden" }}
          >
            <VirtualizedList closeContent={closeContent} data={data1} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={2}
            sx={{ p: 2, minHeight: 200, overflow: "hidden" }}
          >
            <VirtualizedListFurt closeContent={closeContent} data={data2} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={3}
            sx={{ width: "50%", p: 2, minHeight: 200 }}
            ref={panelRef}
          >
            <VirtualizedListSketchfab closeContent={closeContent} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={4}
            sx={{ p: 2, minHeight: 200 }}
          >
            <FileUpload setUploadOpen={setUploadOpen} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AddContent;
