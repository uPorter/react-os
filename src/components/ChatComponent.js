import React, { useState, useEffect } from 'react';
import { SendMessage, Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread, withChannelContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import IconButton from '@mui/joy/IconButton';
import 'stream-chat-react/dist/css/index.css';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import './ChatComponent.css'
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/material';
import Input from '@mui/joy/Input';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Divider from '@mui/joy/Divider';
import Switch, { switchClasses } from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CameraMode from './CamManager/CameraMode';
import Fade from '@mui/material/Fade';

const chatClient = StreamChat.getInstance('pwy6c3gk995u');

const ChatComponent = (props) => {
  const { spaceName, userName, userID, userToken, userImage, sendMessage, showChat, isStarted,setupRpmFrame } = props;
  const [isActive, setIsActive] = useState(true);
  const [toggleChatText, setToggleChatText] = useState('Hide Chat')
  const [checked, setChecked] = useState(false);
  const initialIsCameraOn = localStorage.getItem('isCameraOn') === 'true' ? true : false;
  const [isCameraOn, setIsCameraOn] = useState(initialIsCameraOn);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsCameraOn(newValue);
    // Kameranın durumunu değiştirdiğimizde handleIsStartedChange fonksiyonunu çağırıyoruz
    sendMessage("VideoHolder", "ToggleObjectState");
    localStorage.setItem('isCameraOn', newValue.toString());
  };






  const toggleChat = () => {
    if (isActive) {
      const element = document.querySelector('.str-chat__list');
      element.classList.add('active');
      element.classList.remove('inActive');
      const textarea = document.querySelector('.str-chat__small-message-input textarea');
      textarea.placeholder = 'Disabled...';
      const mainArea = document.querySelector('.chatProfileSection');
      mainArea.classList.add('prevent-select')
      textarea.disabled = true;
      document.querySelector('.str-chat__small-message-input-emojiselect').style.visibility = 'hidden';
      const events = Object.keys(textarea);
      setToggleChatText('Show Chat')
      //sendMessage("AvatarEdit", "EditorON");
    }
    if (!isActive) {
      const element = document.querySelector('.str-chat__list');
      element.classList.add('inActive');
      element.classList.remove('active');
      const textarea = document.querySelector('.str-chat__small-message-input textarea');
      textarea.placeholder = 'Chat';
      textarea.disabled = false;
      const mainArea = document.querySelector('.chatProfileSection');
      mainArea.classList.remove('prevent-select')
      document.querySelector('.str-chat__small-message-input-emojiselect').style.visibility = 'visible';
      setToggleChatText('Hide Chat')
      //sendMessage("AvatarEdit", "EditorOFF");
      textarea.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          // burada mesaj gönderme işlemlerini yapabilirsiniz
        }
      });
    }
    setIsActive(!isActive);
  }

  const ReactshowRPM = () => {
    setupRpmFrame();
    window.showRpm();
    //sendMessage("AvatarEdit", "EditorON");
    handleTooltipClose();
  }

  const handleTooltipOpen = () => {
    document.querySelector('.avatarProfile').classList.add('avatarProfileonOpen');
    setIsActive(true);
    if(isActive){
      toggleChat();
    }
  };

  const handleTooltipClose = () => {
    document.querySelector('.avatarProfile').classList.remove('avatarProfileonOpen');
    document.querySelector('.avatarProfile').classList.add('avatarProfileonClose');
    setIsActive(false);
    if(!isActive){
      toggleChat();
    }
  };

  const testClick = () => {
    console.log('Hello Guys');
  }

  return (
    <>
      <div className='chatProfileSection' style={{ pointerEvents: 'none', width: '400px', height: 'fit-content', position: 'absolute', right: '16px', bottom: '2px', transform: 'scale(1)', zIndex: '50', userSelect: 'none' }} >
        <Chat client={chatClient} theme='livestream light' user={chatClient.user} userToken={userToken}>
          <Channel channel={chatClient.channel('livestream', spaceName || 'demoroom')} Message={MessageLivestream}>
            <Window hideOnThread>
              <ChannelHeader live />
              <MessageList />
              <MessageInput Input={MessageInputSmall} onSubmit={testClick}/>
              <CameraMode sendMessage={sendMessage} />
              <Tooltip TransitionComponent={Fade} className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
                fontStyle: 'bold',
                fontWeight: 'Bold',
                color: 'white',
                padding: '10px',
                marginBottom: '-4px',
                backgroundColor: '#00000040',
                '&:hover': {
                  backgroundColor: '#00000040',
                },
              }}>{toggleChatText}</Button>}>
                <IconButton onClick={toggleChat} className={`toggle-chat`} variant="solid" sx={{
                  "--IconButton-size": "55px",
                  "--IconButton-radius": "50px",
                }}>
                  {isActive && <QuestionAnswerIcon className='questionAnswerIcon' />}
                  {!isActive && <QuestionAnswerOutlinedIcon className='questionAnswerIconOutlined' />}
                </IconButton>
              </Tooltip>


              <Tooltip TransitionComponent={Fade} onOpen={handleTooltipOpen} onClose={handleTooltipClose} sx={{ borderRadius: '0px', backgroundColor: '#ffffff' }} color="neutral" placement="top" variant="soft"
                title={
                  <div className='avatarProfile' style={{ backdropFilter: "blur(0px)" }}>
                    <Stack className='avatarStack'>
                      <Avatar className='avatarProfileSection' style={{
                        width: '5.3rem', height: '5.3rem', zIndex: '999', background: '#2979FF',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          background: 'blue'
                        }
                      }}
                        size="lg" src={userImage} />
                      <Typography style={{ color: 'white', fontSize: '27px' }} level="h2">{userName}</Typography>
                      <Stack className='avatarButtonContainer'>
                        <div onClick={() => console.log('View Profile')} style={{ marginTop: '7px' }} className='editavatarContainerV'>
                          <ManageAccountsOutlinedIcon style={{ marginLeft: '25px', color: 'white' }} />
                          <Button style={{ position: 'static', background: 'transparent', color: 'white' }} >View Profile</Button>
                          <ArrowForwardIosOutlinedIcon className='hoverArrow' style={{ marginLeft: '75px', color: 'white', transform: 'scale(0.8)' }}></ArrowForwardIosOutlinedIcon>
                        </div>
                        <Divider style={{ height: '2px', marginTop: '7px', marginBottom: '0px', backgroundColor: '#ffffff26' }} orientation="horizontal" />
                        <div onClick={ReactshowRPM} style={{ marginTop: '7px' }} className='editavatarContainerV'>
                          <AccessibilityNewOutlinedIcon style={{ marginLeft: '25px', color: 'white' }} />
                          <Button onClick={ReactshowRPM} style={{ position: 'static', background: 'transparent', color: 'white' }} >Edit Avatar</Button>
                          <ArrowForwardIosOutlinedIcon style={{ marginLeft: '80px', color: 'white', transform: 'scale(0.8)' }}></ArrowForwardIosOutlinedIcon>
                        </div>
                        <Divider style={{ height: '2px', marginTop: '7px', marginBottom: '0px', backgroundColor: '#ffffff26' }} orientation="horizontal" />
                        <div style={{ marginTop: '7px', marginBottom: '7px' }} className='editavatarContainer'>
                          <VideocamOutlinedIcon style={{ marginLeft: '25px', color: 'white' }} />
                          <Button style={{ position: 'static', background: 'transparent', color: 'white' }} >Toggle Webcam</Button>
                          <Switch sx={{
                            [`& .${switchClasses.thumb}`]: {
                              transition: 'width 0.2s, left 0.2s',
                            }
                          }} style={{
                            marginLeft: '25px',
                            borderStyle: "solid",
                            borderColor: "#ffffff80",
                            borderRadius: "25px",
                            marginLeft: "5px",
                            borderWidth: "2px",
                            transform: 'scale(0.85)',
                            position: 'static'
                          }} variant="soft" color="neutral" className="mainSwitch"
                            checked={isCameraOn}
                            onChange={handleChange}
                          />
                          {/* <ArrowForwardIosOutlinedIcon style={{ marginLeft: '18px', color: 'black', transform: 'scale(0.8)' }}></ArrowForwardIosOutlinedIcon> */}
                        </div>
                      </Stack>
                    </Stack>
                  </div>
                }>
                <Avatar className='toggle-chat2' style={{
                  bottom: '7.5px', right: '0px', position: 'absolute', width: '3.8rem', height: '3.8rem', zIndex: '999', background: '#2979FF', borderRadius: '250px',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    background: '#2979FF'
                  }
                }}
                  size="lg" src={userImage} />
              </Tooltip>
            </Window>
            <Thread fullWidth />
          </Channel>
        </Chat>
      </div>
    </>
  );
};

export default ChatComponent;