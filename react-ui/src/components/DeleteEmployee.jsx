import { Typography, Button,Stack } from '@mui/material'
import { Container } from '@mui/system'
import { deleteEmployee } from '../api/api'



const DeleteEmployee = (props) => {

   const { employee, handleModalClose, employees, setEmployees } = props


   const handleDelete = () => {
        deleteEmployee(employee.id).then((res) => {
            setEmployees(employees.filter(em => em.id !== employee.id))
            handleModalClose();
        }).catch((err) => {
            console.log(err)
        })
   }

    return (
        <>
        <Container>
            <Typography>
                Are you Sure you want to delete the employee {employee.firstName} {employee.lastName} with the email {employee.email}?
            </Typography>
            <Stack direction="row" spacing={2} marginTop="2%" >
                <Button variant='contained' color='error' onClick={handleDelete}>Confirm</Button>
            </Stack>
        </Container>
        </>
    )
}

export default DeleteEmployee