import { CircularProgress, Container,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';

import Employee from '../components/Employee';
import { getEmployees } from '../api/api';


const Employees = (props) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        getEmployees().then(res => {
          setEmployees(res.data)
          setTimeout(() => {
            setLoading(false)
          }, 2000)
        })
        .catch(err => {
          setLoading(false)
        })

    },[employees])



    return (
      <Container maxWidth="sm" sx={{ marginTop: "5%" }}>
        {loading ?  <CircularProgress sx={{margin: "20% 45%"}}/> : employees.map((em) => (
          <Box
            key={em.email}
            maxWidth="sm"
            display="flex"
            flexDirection="column"
            alignContent="center"
            sx={{
              border: "1px solid grey",
              marginBottom: "3%"
            }}
          >
            <Employee employee={em} employees={employees} setEmployees={setEmployees} />
          </Box>
        ))}
      </Container>
    );

}

export default Employees