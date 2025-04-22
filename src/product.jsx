import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ProductPage = () => {
  return (
    <Box
      component={"div"}
      sx={{
        height: "100vh",
        margin: 0,
        padding: 0,
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image-hero-desktop.jpg)`,
          height: "35%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          component={"div"}
          sx={{
            width: "95%",
            margin: "auto",
            p: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component={"span"}
            variant="h5"
            color={"#ffff"}
            sx={{
              mt: 2,
            }}
          >
            crowdfund
          </Typography>
          <List
            sx={{
              width: "29%",
              color: "#ffff",
            }}
          >
            {[1].map((ele) => (
              <ListItem>
                <ListItemText primary={"About"} />
                <ListItemText primary={"Discover"} />
                <ListItemText primary={"Get Started"} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box
        component={"div"}
        sx={{
          width: "45%",
          margin: "auto",
          //   height: "100%",
          display: "grid",
          gridTemplateColumns: "auto",
          rowGap: 4,
          position: "absolute",
          left: "30%",
          top: "25%",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            p: 4,
          }}
        >
          <Box
            component="img"
            src={"logo-mastercraft.svg"}
            alt="Congrats"
            width={"40px"}
            height={"40px"}
            sx={{ position: "absolute", top: "-3%" }}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                p: 1,
              }}
            >
              Mastercraft Bamboo Monitor Riser
            </Typography>
            <Typography
              sx={{
                color: "lightgray",
                fontSize: 14,
                p: 1,
              }}
            >
              A beautiful & handcrafted monitor stand to reduce neck and eye
              strain.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 10,
                  background: "lightblue",
                }}
              >
                Back this project
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 10,
                  background: "lightgreen",
                }}
              >
                Back this project
              </Button>
            </Box>
          </Box>
        </Card>
        <Card variant="outlined">sgdfs</Card>
        <Card variant="outlined">sgdfs</Card>
      </Box>
    </Box>
  );
};

export default ProductPage;
