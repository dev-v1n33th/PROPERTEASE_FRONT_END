import React from 'react'
import { Image, Row, Col,Container } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from '../../../../../Uri'
import { Grid } from '@mui/material';
import  './GuestPic.css';

function GuestPic(props) {
    console.log(props.GuestPic)
    const [guestPicUrl, setGuestPicUrl] = React.useState({});
    // console.log(props.guestdetails.id);

    useEffect(async () => {
        await axios

            .get(`/guest/files/${props.guestdetails.id}`)
            .then((res) => {
                setGuestPicUrl(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)

            });
    }, [props.guestdetails.id]);
    return (
       
       <Grid container>
           <Grid item xs={12}>
            <Image className='pic'  src={guestPicUrl.url} height={200}/>
            </Grid>
            </Grid>
        
       
       )
}

export default GuestPic