import { createTheme } from "@mui/material";

const CustomStyles = {

     employeeModal: {
        position: 'absolute',
        margin: "auto",
        overflow: "scroll",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "55%",
        bgcolor: 'background.paper',
        border: '2px grey #000',
        boxShadow: 24,
        p: 4,
      },

    colorTheme : createTheme({
      palette: {

        addEmployee: {
          main: 'black',
          contrastText: 'white'
        },
      },
    })

};



export default CustomStyles