import React, { useEffect, useState, useRef } from "react";
import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ListView = (props) => {
  const { data, closeContent } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState(0);
  const [models, setModels] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const containerRef = useRef(null);

  const fetchModels = async () => {
    try {
      const response = await fetch(
        "https://api.sketchfab.com/v3/search?type=models&staffpicked=true&sort_by=-popularity"
      );
      const data = await response.json();
      setModels(data.results);
      setNextPageUrl(data.next);
    } catch (error) {
      console.error(error);
    }
  };

  const loadNextPage = async () => {
    if (nextPageUrl) {
      try {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        setModels((prevModels) => [...prevModels, ...data.results]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error(error);
      }
    }
  };


  window.loadNextPage = async () => {
    if (nextPageUrl) {
      try {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        setModels((prevModels) => [...prevModels, ...data.results]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadNextPage();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleItemToggle = (event, item) => {
    event.stopPropagation();
    if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleBulkAction = () => {
    console.log("Toplu işlem: ", selectedItems);
    //closeContent();
    selectedItems.forEach((item, index) => {
      setTimeout(() => {
        LoadModel(item.modelURL);
      }, index * 200);
    });
  };

  const handlePaperClick = (item) => {
    if (selectedItems.length > 0) {
      if (selectedItems.find((selectedItem) => selectedItem.id === item.uid)) {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem.id !== item.uid)
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      LoadModel(item.modelURL);
      //closeContent();
    }
    console.log("Clicked item UID:", item.uid);
  };

  const LoadModel = (modelURL) => {
    console.log(modelURL);
    //window.sendMessageToUnity("urlManager", "SetURL", modelURL);
    //window.sendMessageToUnityBasic("urlManager", "SpawnObject");
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page - 1);
  };

  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return models.slice(startIndex, endIndex);
  };

  return (
    <>
      <Grid style={{ marginRight: "-2385px" }} container spacing={2} sx={{}}>
        {getCurrentItems().map((item, index) => (
          <Grid key={item.uid} item xs={12} sm={6} md={4} lg={4}>
            <div
              className="mainObjectHolder"
              style={{
                border: selectedItems.find(
                  (selectedItem) => selectedItem.id === item.uid
                )
                  ? "3px solid #ffffff52"
                  : "3px solid transparent",
                transform: selectedItems.find(
                  (selectedItem) => selectedItem.id === item.uid
                )
                  ? "scale(0.95)"
                  : "scale(1)"
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  width: "220px",
                  position: "relative",
                  overflow: "hidden",
                  height: "180px",
                  backgroundColor: "transparent",
                  marginTop: "12px",
                  position: "relative",
                  display: "flex",
                  borderRadius: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  boxShadow:
                    hoveredItem === item.uid
                      ? "0px 0px 16px 2px rgb(0 0 0 / 52%)"
                      : "0px 3px 1px -2px rgba(0,0,0,0.0)",
                  color: "white",
                  cursor: "pointer",
                  transition: ".1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s"
                }}
                onClick={() => handlePaperClick(item)}
                onMouseEnter={() => setHoveredItem(item.uid)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={item.thumbnails.images[0].url}
                  alt={item.name}
                  style={{
                    width: "150%",
                    marginBottom: "0px",
                    filter:
                      hoveredItem === item.uid
                        ? "transform: 'scale(1)'"
                        : "transform: 'scale(0.8)'"
                  }}
                />
              </Paper>
              <Typography style={{marginTop: "22px"}} className="objectName" level="body2">
                {item.name}
              </Typography>
            </div>
          </Grid>
        ))}
        {selectedItems.length > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              display: "flex",
              marginLeft: "-20px",
              textAlign: "center",
              width: "220px",
              background: "rgb(0 0 0 / 12%)",
              padding: "20px",
              borderRadius: "25px",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(18px)"
            }}
          >
            <div>
              <Typography className="counter" variant="h6">
                {selectedItems.length}
              </Typography>
            </div>
            <IconButton
              aria-label="clear selection"
              onClick={handleClearSelection}
              style={{
                color: "white",
                marginLeft: "10px"
              }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              aria-label="add to scene"
              onClick={handleBulkAction}
              style={{
                color: "white",
                marginLeft: "10px"
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
      </Grid>
      <div ref={containerRef} style={{ marginTop: "24px" }} />
    </>
  );
};

export default ListView;
