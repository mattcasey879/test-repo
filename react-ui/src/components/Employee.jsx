import { Box, MenuItem, Menu, Card, CardHeader, IconButton, Typography, CardContent, Modal } from '@mui/material';
import React, {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import CustomStyles from '../materialUiStyles/CustomStyles';
import ClearIcon from '@mui/icons-material/Clear';



const Employee = (props) => {
    const { employee, setEmployees, employees } = props;
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    
    
    const handleMenuOpen = (event) => {
        setOpen(true)
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setOpen(false)
        setAnchorEl(false)
    }

    const handleModalOpen = (event) => {
        if (event.target.innerText === "Edit" || event.target.id === "edit") {
            setEdit(true)
        } if (event.target.innerText === 'Delete' || event.target.id === "delete") {
            setEdit(false)
        }
        setModal(true)
    }

    const handleModalClose = () => {
        setModal(false)
        setEdit(false)
    }

    return (
        <div>
        <Card>
            <CardHeader 
            title={
                <Typography variant='h5'>{employee.firstName} {employee.lastName}</Typography>
            }
            action={
                <IconButton
                    id='menu-button'
                    aria-controls={open ? "menu" : ""}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={handleMenuOpen}
                >
                    <MenuIcon></MenuIcon>
                </IconButton>
            }
            />
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top"
                    }}
                    transformOrigin={{
                        horizontal: "right",
                        vertical: "top"
                    }}
                    open={open}
                    onClose={handleClose}
                >   <div onClick={handleClose}>
                        <MenuItem sx={{margin: "5px 0"}} onClick={handleModalOpen}><EditIcon id="edit" sx={{paddingRight: "20px", color: "blue"}}/>Edit</MenuItem>
                        <MenuItem sx={{margin: "5px 0"}} onClick={handleModalOpen}><DeleteIcon id="delete" sx={{paddingRight: "20px", color: "red"}}/>Delete</MenuItem>
                    </div>
                </Menu>
                <CardContent>
                    <Box
                        display='flex'
                        flexDirection="column"
                        alignContent ="space-around"
                    >
                    <Typography>
                        Email: {employee.email}
                    </Typography>
                    <Typography>
                        Home Phone: {employee.homePhone}
                    </Typography>
                    <Typography>
                        Cell Phone: {employee.cellPhone}
                    </Typography>
                    <Typography>
                        Address: {employee.address}
                    </Typography>
                    <Typography>
                        State: {employee.state}
                    </Typography>
                    <Typography>
                        City: {employee.city}
                    </Typography>
                    <Typography>
                        Zip: {employee.zip}
                    </Typography>
                    </Box>
                </CardContent>
        </Card>
                <Modal
                    open={modal}
                    onClose={handleModalClose}
                >
                    <Box sx={CustomStyles.employeeModal}>
                        <IconButton onClick={() => handleModalClose()} sx={{marginLeft: "95%"}}><ClearIcon color='primary' /></IconButton>
                        {edit ?  
                        <EditEmployee handleModalClose={handleModalClose} employee={employee} employees={employees} setEmployees={setEmployees} /> : 
                        <DeleteEmployee handleModalClose={handleModalClose} employee={employee} employees={employees} setEmployees={setEmployees} />}
                    </Box>
                </Modal>
        </div>

    )
}


export default Employee