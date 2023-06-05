import { Avatar, Box, Button, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import Card from '@mui/material/Card'
export const CardTicket = () => {
    return(
        <Card sx={{minWidth:780,minHeight:200}}>
            <CardHeader
                action={
                    <Avatar sx={{width:60,height:60,padding:'5px'}} src='http://pics.avs.io/200/200/9U.png'/>
                }
                avatar= {
                    <Chip variant='outlined' label='Самый дешевый' sx={{ bgcolor: '#009E23',minWidth:'30%',color:'white',boxShadow:'0px 0px 10px 0px #009E23' }} aria-label="chip"/>
                }
            />
            <CardContent>
                
            </CardContent>
        </Card>
    )
}