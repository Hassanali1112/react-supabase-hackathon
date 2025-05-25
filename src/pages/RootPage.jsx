import React, { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/config";

const RootPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  

  const getUser = async ()=>{
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if(user){
        console.log(user)
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log('effect')
   getUser()
   navigate("/user-dashboard");
  },[])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `white`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          height: { xs: "auto", md: "500px", lg: "500px" },
          maxWidth: "1200px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: theme.shadows[5],
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          p: { xs: 3, md: 5 },
          gap: 4,
        }}
      >
        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "start", md: "left" },
            width: "100%",
            height: "100%",
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'center',
            // alignItems : 'center'

          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            EventFlow
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Seamlessly manage your events with ease – from planning to
            execution.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* Illustration */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/046/732/733/small/vibrant-colors-blend-together-and-swirl-into-a-mystical-haze-as-the-ceremony-progresses-photo.jpg"
            alt="Event Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: theme.shadows[3],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RootPage;
