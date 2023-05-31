import React, { Component } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import { Slide, Stack } from '@mui/material';
import Fade from '@mui/material/Fade';


export class Dock extends Component {
    render() {
        const { handleEditorMode } = this.props;
        return (<div style={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ transform: 'scale(0.9)', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', zIndex: '15' }}>
                <Tooltip followCursor className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" endDecorator={<TuneRoundedIcon fontSize="small"></TuneRoundedIcon>} sx={{
                    fontStyle: 'bold',
                    fontWeight: 'Bold',
                    color: 'white',
                    backgroundColor: '#00000040',
                    '&:hover': {
                        backgroundColor: '#00000040',
                    },
                }}>Turn On Mic</Button>}>
                    <IconButton className='dockButtons' variant="solid" sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                    }}>
                        <MicOffOutlinedIcon />
                    </IconButton>
                </Tooltip>


                <Tooltip followCursor TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain"
                        sx={{
                            fontStyle: 'bold',
                            fontWeight: 'Bold',
                            color: 'white',
                            backgroundColor: '#00000040',
                            '&:hover': {
                                backgroundColor: '#00000040',
                            },
                        }}>Reactions</Button>}>
                    <IconButton className='dockButtons' variant="solid" sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <g clipPath="url(#clip0_1129_7940)">
                                <path fill="#fff" d="M12.953 5.984c-.531 0-1-.203-1.406-.609-.406-.406-.61-.875-.61-1.406 0-.531.204-.985.61-1.36.406-.406.875-.609 1.406-.609.531 0 1 .203 1.406.61.407.374.61.828.61 1.359s-.203 1-.61 1.406c-.406.406-.875.61-1.406.61z"></path>
                                <path fill="#fff" d="M7.125 6.219C6.437 5.125 6.062 3.844 6 2.375V2h1.969v.469c0 1.469.515 2.625 1.547 3.469.906.687 1.062 1.03 2.468 1.03 1.844 0 3.47.579 4.875 1.735 1.407 1.219 2.11 2.813 2.11 4.781V14H17v-.516c0-1.312-.469-2.343-1.406-3.093-.125-.125-.328-.235-.61-.329v4.922l-5 .985V8.375a5.084 5.084 0 01-2.859-2.156z"></path>
                                <path stroke="#fff" strokeLinecap="square" strokeWidth="2.2" d="M10 20l-.702-2.105a1 1 0 01.577-1.245L14 15l3 7"></path>
                                <path fill="#fff" d="M20 7l.938-2.063L23 4l-2.063-.938L20 1l-.938 2.063L17 4l2.063.938L20 7z"></path>
                                <path fill="#fff" fillRule="evenodd" d="M4.147 6.154L5.15 7.891A5.001 5.001 0 006 16.584v2.126A7.003 7.003 0 014.147 6.154z" clipRule="evenodd"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1129_7940">
                                    <path fill="#fff" d="M0 0H24V24H0z"></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </IconButton>
                </Tooltip>


                <Tooltip followCursor className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} color="neutral" placement="top" variant="soft" title={
                    <Stack>
                        <Button size="sm" variant="plain" sx={{
                            fontStyle: 'bold',
                            fontWeight: 'Bold',
                            padding: '20px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            borderEndEndRadius: '0px',
                            borderEndStartRadius: '0px',
                            color: 'white',
                            backgroundColor: '#00000040',
                            '&:hover': {
                                backgroundColor: '#00000040',
                            },
                        }}>Take a Shot!</Button>
                        <Button size="sm" variant="plain" sx={{
                            fontStyle: 'bold',
                            padding: '20px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                            paddingBottom: '5px',
                            paddingTop: '5px',
                            fontWeight: 'Bold',
                            color: 'white',
                            backgroundColor: '#00000040',
                            '&:hover': {
                                backgroundColor: '#00000040',
                            },
                        }}>Record Screen</Button>
                    </Stack>
                }>
                    <IconButton className='dockButtons' variant="solid" sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                    }}>
                        <CameraAltOutlinedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip followCursor className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
                    fontStyle: 'bold',
                    fontWeight: 'Bold',
                    color: 'white',
                    backgroundColor: '#00000040',
                    '&:hover': {
                        backgroundColor: '#00000040',
                    },
                }}>Share Screen</Button>}>
                    <IconButton className='dockButtons' variant="solid" sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                    }}>
                        <PresentToAllOutlinedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip followCursor className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
                    fontStyle: 'bold',
                    fontWeight: 'Bold',
                    color: 'white',
                    backgroundColor: '#00000040',
                    '&:hover': {
                        backgroundColor: '#00000040',
                    },
                }}>Add Content</Button>}>
                    <IconButton className='dockButtons' variant="solid" sx={{
                        "--IconButton-size": "55px",
                        "--IconButton-radius": "50px",
                    }}>
                        <AddOutlinedIcon />
                    </IconButton>
                </Tooltip>

            </Box>

        </div>);
    }
}
