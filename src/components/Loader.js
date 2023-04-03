import React, { Component } from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import LinearProgress from '@mui/joy/LinearProgress';
import App from '../App';
import Typography from '@mui/joy/Typography';
import { Button } from "@mui/joy";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Avatar from '@mui/joy/Avatar';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export class Loader extends Component {
    render() {
        const Item = styled(Sheet)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.vars.palette.text.tertiary,
        }));

        const loadingProgression = App.loadingProgression;
        return (
            <div className='loader' style={{ display: "flex", justifyContent: "center" }}>
                <div className='overlay'></div>
                <Grid style={{ position: 'absolute', left: '125px', bottom: '125px' }} container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
                    <Grid xs={15}>
                        <div className='avatar-container' style={{bottom:'25px', display: 'flex'}}>
                            <Avatar  alt="Porter" src="https://models.readyplayer.me/6185a4acfb622cf1cdc49348.png" size="sm" ></Avatar>
                            <Typography className='loaderAvatarText' textColor="common.white" level="body2">Porter</Typography>
                        </div>
                        
                        <Typography className='loaderText' style={{ position: 'relative', bottom: '25px' }} fontWeight="lg" textColor="common.white" level="h1">Function Demo
                            <Button
                                style={{
                                    backgroundColor: '#00000000;',

                                    "&:hover": {
                                        background: "#efefef"
                                    },
                                }}
                                className='favButton'
                                disabled={false}
                                onClick={function () { }}
                                size="lg"
                                variant="plain">

                                <FavoriteBorderOutlinedIcon className='favIcon' Color="common.white"></FavoriteBorderOutlinedIcon>
                                <FavoriteOutlinedIcon className='favIconFilled' Color="common.white"></FavoriteOutlinedIcon>
                            </Button>
                        </Typography>
                        <LinearProgress color="neutral" thickness={5} style={{ width: '600px' }} determinate size="lg" value={loadingProgression * 100} />
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                </Grid>
            </div>);
    }
}
