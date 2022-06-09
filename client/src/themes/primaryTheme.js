import { createTheme } from "@mui/material/styles";

export const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#a59132',
      },
      secondary: {
        main: '#3581b8',
      },
      info: {
        main: '#CDF7F6',
      },
      error: {
        main: '#FE4A49',
      },
      success: {
        main: '#adf7b6',
      },
      warning: {
        main: '#a09be7',
      },
    },
    overrides: {
      MuiAppBar: {
        colorInherit: {
          color: '#fff',
        },
      },
    },
    components: {
      MuiAppBar:{
          styleOverrides:{
              colorPrimary:{
                  backgroundImage:`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                  radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);` 
              }
          }
      }
    },
  };

  const theme=createTheme(themeOptions);
  export default theme