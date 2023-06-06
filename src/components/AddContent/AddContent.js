import React from "react";
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
import data from "./data";
import data1 from "./data1";
import data2 from "./data2";
import FileUpload from "../FileUpload";

const AddContent = (props) => {
  const { setUploadOpen } = props;
  const [isClosed, setIsClosed] = React.useState(false);

  const handleClose = () => {
    setUploadOpen(false);
  };

  if (isClosed) {
    return null; // Ekranda hiçbir şey gösterilmez
  }

  return (
    <div>
      <div style={{zIndex: "51",background: "#0000003b",backdropFilter:"blur(19px)",position:"absolute",width:"100%",height:"100%"}}>
      </div>
      <div className="container-addcontent">
        <IconButton className="closeButton-addcontent" onClick={handleClose}>
          <CloseIcon onClick={handleClose} />
        </IconButton>

        <Tabs
          className="content-addcontent"
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 300, borderRadius: "lg" }}
        >
          <div className="flexContainer">
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
          <TabPanel className="tabPanel" sx={{ p: 2, minHeight: 200 }}>
            <VirtualizedList data={data} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={1}
            sx={{ p: 2, minHeight: 200 }}
          >
            <VirtualizedList data={data1} />
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={2}
            sx={{ p: 2, minHeight: 200 }}
          >
            <VirtualizedListFurt data={data2} />
           
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={3}
            sx={{ p: 2, minHeight: 200 }}
          >
             <b className="TabContent">Work in progress...</b>
          </TabPanel>
          <TabPanel
            className="tabPanel"
            value={4}
            sx={{ p: 2, minHeight: 200 }}
          >
             <FileUpload setUploadOpen={setUploadOpen}/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AddContent;
