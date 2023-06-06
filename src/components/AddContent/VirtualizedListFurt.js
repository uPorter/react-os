import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove'; 
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ListView = (props) => {
    const { data, sendMessage } = props;
    const [selectedItems, setSelectedItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(0);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const handleClearSelection = () => {
        setSelectedItems([]);
    };

    const handleItemToggle = (event, item) => {
        event.stopPropagation();
        if (
            selectedItems.find((selectedItem) => selectedItem.id === item.id)
        ) {
            setSelectedItems(
                selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
            );
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleBulkAction = () => {
        console.log("Toplu işlem: ", selectedItems);
        selectedItems.forEach((item) => LoadModel(item.modelURL));
    };

    const handlePaperClick = (item) => {
  if (selectedItems.length > 0) {
    if (
      selectedItems.find((selectedItem) => selectedItem.id === item.id)
    ) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  } else {
    LoadModel(item.modelURL);
  }
};


    const LoadModel = (modelURL) => {
        console.log(modelURL);
        sendMessage("urlManager", "SetURL", modelURL);
        sendMessage("urlManager", "SpawnObject");
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page - 1);
    };

    const getCurrentItems = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
            </ThemeProvider>
            <Grid
                style={{ marginRight: "-2385px" }}
                container
                spacing={2}
                sx={{}}
            >
                {getCurrentItems().map((item, index) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={4}>
                        <div
                            className="mainObjectHolder"
                            style={{
                                border: selectedItems.find(
                                    (selectedItem) => selectedItem.id === item.id
                                )
                                    ? "3px solid #ffffff52"
                                    : "3px solid transparent",
                                transform: selectedItems.find(
                                    (selectedItem) => selectedItem.id === item.id
                                )
                                    ? "scale(0.95)"
                                    : "scale(1)",
                            }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    width: "220px",
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
                                        hoveredItem === item.id
                                            ? "0px 0px 16px 2px rgb(0 0 0 / 52%)"
                                            : "0px 3px 1px -2px rgba(0,0,0,0.0)",
                                    color: "white",
                                    cursor: "pointer",
                                    transition:
                                        ".1s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s",
                                }}
                                onClick={() => handlePaperClick(item)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <Checkbox
                                    checked={
                                        !!selectedItems.find(
                                            (selectedItem) => selectedItem.id === item.id
                                        )
                                    }
                                    color="neutral"
                                    onChange={(event) => handleItemToggle(event, item)}
                                    onClick={(event) => event.stopPropagation()} // Checkbox tıklama olayını durdur
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        left: 8,
                                        zIndex: 1,
                                        transform:
                                            hoveredItem === item.id ? "scale(1.4)" : "scale(0)",
                                        transition: "transform 0.3s",
                                    }}
                                />
                                <img
                                    src={item.contentImage}
                                    alt={item.name}
                                    style={{ width: "220px", marginBottom: "10px",
                                    filter:
                                        hoveredItem === item.id
                                            ? "drop-shadow(-3px 7px 12px #00000000)"
                                            : "drop-shadow(-2px 5px 14px transparent)",
                                    
                                     }}
                                />
                            </Paper>
                            <Typography className="objectName" level="body2">
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
                            backdropFilter: "blur(18px)",
                        }}
                    >
                        <div>
                            <Typography
                                style={{ color: "white", fontWeight: "600" }}
                                level="body2"
                            >
                                {selectedItems.length} object selected
                            </Typography>
                        </div>
                        <div style={{ width: "13px" }} />
                        <IconButton
                            style={{
                                color: "black",
                                borderRadius: "25px",
                                backgroundColor: "white",
                            }}
                            onClick={handleBulkAction}
                            variant="solid"
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            style={{
                                color: "white",
                                borderRadius: "279px",
                                transform: "scale(0.8)",
                                position: "absolute",
                                right: "-13px",
                                top: "-12px",
                                backgroundColor: "rgb(0 0 0 / 44%)"
                            }}
                            onClick={handleClearSelection}
                            variant="solid"
                        >
                            <RemoveIcon />
                        </IconButton>
                    </div>
                )}
            </Grid>
            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage + 1}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                style={{ position: "absolute", bottom: "15px", right: "10px", display: "flex", justifyContent: "center" }}
            />
        </>
    );
};

export default ListView;
