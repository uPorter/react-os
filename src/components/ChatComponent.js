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
import { ShowChart } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';



const chatClient = StreamChat.getInstance('d9m7j2mj5ju8');

const ChatComponent = (props) => {

  const { userID, userToken, userImage, sendMessage, showChat } = props;
  const [isActive, setIsActive] = useState(true);
  const [toggleChatText, setToggleChatText] = useState('Hide Chat')

  useEffect(() => {
    const timer = setTimeout(() => {
      const textarea = document.querySelector('.str-chat__small-message-input textarea');
      console.log(textarea);

      const onFocus = () => {
        // onFocus event handling logic here
        sendMessage("AvatarNick", "Start");
        console.log('Focused');

        const edittextarea = document.querySelector('.str-chat__edit-message-form textarea');
        edittextarea.addEventListener('focus', onFocus);
        edittextarea.addEventListener('blur', onBlur);
      };

      const onBlur = () => {
        // onBlur event handling logic here
        sendMessage("AvatarNick", "enableInput");
        console.log('Blured');
      };

      if (textarea) {
        textarea.addEventListener('focus', onFocus);
        textarea.addEventListener('blur', onBlur);

        return () => {
          textarea.removeEventListener('focus', onFocus);
          textarea.removeEventListener('blur', onBlur);
        };
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);




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
      textarea.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          // burada mesaj gönderme işlemlerini yapabilirsiniz
        }
      });
    }
    setIsActive(!isActive);
  }



  const testClick = () => {
    console.log('Hello Guys');
  }
  return (
    <>
      <div className='chatProfileSection' style={{ width: '400px', height: 'fit-content', position: 'absolute', right: '24px', bottom: '10px', transform: 'scale(1)', zIndex: '50', userSelect: 'none' }} >
        <Chat client={chatClient} theme='livestream light' user={chatClient.user} userToken={userToken}>
          <Channel channel={chatClient.channel('livestream', 'BellyRub')} Message={MessageLivestream}>
            <Window hideOnThread>
              <ChannelHeader live />
              <MessageList />
              <MessageInput Input={MessageInputSmall} onSubmit={testClick} focus />
              <Tooltip className='dockTooltip' sx={{ borderRadius: '20px', backgroundColor: '#ffffff' }} interactive arrow color="neutral" placement="top" variant="soft" title={<Button size="sm" variant="plain" sx={{
                fontStyle: 'bold',
                fontWeight: 'Bold',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#ffffff',
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
              <Avatar className='toggle-chat2' style={{
                bottom: '7px', right: '-6px', position: 'absolute', width: '3.8rem', height: '3.8rem', zIndex: '999', background: '#2979FF',
                '&:hover': {
                  transform: 'scale(1.1)',
                  background: 'blue'
                }
              }}
                size="lg" src={userImage} />
            </Window>
            <Thread fullWidth />
          </Channel>
        </Chat>
      </div>
    </>
  );
};

export default ChatComponent;