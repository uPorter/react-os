import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const OPENAI_API_KEY = "sk-Jr6PTxJiYrsL0Vu7B640E3F32090434b81B2EeCaD9D9F151";

const AiInput = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const pathAnimation1 = !isAiThinking ? "path1" : "path1_fast";
  const pathAnimation2 = !isAiThinking ? "path2" : "path2_fast";
  const pathAnimation3 = !isAiThinking ? "path3" : "path3_fast";

  const handleSubmit = (event) => {
    event.preventDefault();
    // Burada yapmak istediğiniz işlemi gerçekleştirin.
    setIsAiThinking(true);
    sendRequest();
    setSearchQuery("");
  };

  const data = {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: "You are a smart assistant that writes Console commands. Generate command with no explanations.\nThe command must be wrapped in an anonymous command that is then executed.\nThe command must not define any new command.\nThe command must define all variables and constants used.\nThe command must not call any command or use any data types besides those defined by the base language spec and the following:\n- A command window.chageNameNearest(); that takes only a string value (for example, 'model_5757'), The return value is the object.\n- A command window.chageDescNearest(); that takes only a string value (for example, 'model_5877'), The return value is the object.\n- A command window.chageArtistNearest(); that takes only a string value (for example, 'model_58787'), The return value is the object.\n- A command window.chageLinkNearest(); that takes only a string value (for example, 'model_58787'), The return value is the object.\n- A command window.toggleShowPanelNearest(); that takes no argument, The return value is the object.\n- A command window.changeScaleNearest(); that takes only a float value (for example, '3'), The return value is the object.\n- A command window.changeXNearest(); that takes only a float value (for example, '4'), The return value is the object.\n- A command window.changeYNearest(); that takes only a float value (for example, '6'), The return value is the object.\n- A command window.changeZNearest(); that takes only a float value (for example, '7'), The return value is the object.\n- A command window.changeRotationNearest(); that takes only a float value (for example, '5'), The return value is the object.\n- A command window.removeNearest(); that takes no argument, The return value is the object.\n- A command window.chageNameWithName(); that takes only a string value (for example, 'model_5757'), The return value is the object.\n- A command window.chageDescWithName(); that takes only a string value (for example, 'model_5877'), The return value is the object.\n- A command window.chageArtistWithName(); that takes only a string value (for example, 'model_58787'), The return value is the object.\n- A command window.chageLinkWithName(); that takes only a string value (for example, 'model_58787'), The return value is the object.\n- A command window.toggleShowPanelWithName(); that takes no argument, The return value is the object.\n- A command window.changeScaleWithName(); that takes two paramters one is a float value (for example, '2'), other one is a string value (for example, 'model_5757'), The return value is the object.\n- A command window.changeXWithName(); that takes two paramters one is a float value (for example, '2'), other one is a string value (for example, 'model_5757'), The return value is the object.\n- A command window.changeYWithName(); that takes two paramters one is a float value (for example, '3'), other one is a string value (for example, 'model_5757'), The return value is the object.\n- A command window.changeZWithName(); that takes two paramters one is a float value (for example, '5'), other one is a string value (for example, 'model_5757'), The return value is the object.\n- A command window.changeRotationWithName(); that takes two paramters one is a float value (for example, '7'), other one is a string value (for example, 'model_5757'), The return value is the object.\n- A command window.removeWithName(); that only a string value (for example, 'model_5778'), The return value is the object.\n- The edit query will be provided by the user with editQuery:()\n- if there is text content that doesn't mention editing, for example \"create a new object for me\" or \"create an object for my scene\", you need to return window.itsNotEditMode(); \n- An example for the window.changeScaleNearest(); command editQuery:(enlarge the object near me by 2 units) in this case the command you should return is window.changeScaleNearest(2)\n- Another example for the window.changeScaleNearest(); command editQuery:(set the size of the nearest object to 3) in this case the command you should return is window.changeScaleNearest(3)\n- Another example for window.changeScaleNearest(); is if the value of editQuery:(reduce the size of the object near me) is set in this way, the command you should return is window.changeScaleNearest(-1)\n- An example for the window.changeXNearest(); command editQuery:(move the object near me 2 units away) in this case the command you should return is window.changeXNearest(2)\n- Another example for the window.changeXNearest(); command editQuery:(move the object near me 3 units closer) in this case the command you should return is window.changeXNearest(3)\n- Another example for window.changeXNearest(); is if the value of editQuery:(move the closest object closer to me) is set in this way, the command you should return is window.changeXNearest(-1)\n\n- An example for the window.chageNameNearest(); command editQuery:(Change the name of the nearest object to RandomObject) in this case the command you should return is window.chageNameNearest('RandomObject');\n- An example for the window.chageDescNearest(); command editQuery:(Change the description of the nearest object to LoremIpsumDolar) in this case the command you should return is window.chageNameNearest('LoremIpsumDolar');\n- An example for the window.chageArtistNearest(); command editQuery:(Change the Artist name of the nearest object to Porter) in this case the command you should return is window.chageNameNearest('Porter');\n- An example for the window.chageLinkNearest(); command editQuery:(Change the view link of the nearest object to https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676) in this case the command you should retur is window.chageNameNearest('https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676');\n- An example for the window.toggleShowPanelNearest(); command editQuery:(Activate the info panel of the nearest object) in this case the command you should return window.toggleShowPanelNearest();\n- In chageNameWithName,chageDescWithName,chageArtistWithName,chageLinkWithName,toggleShowPanelWithName parameters, you need to apply the same directives as in Nearest commands, but you should add the name of the object extra so that it can access the object and perform the necessary operation, for example editQuery: (change the name of object model_7575 to model_8468) then the value you should return is chageNameWithName('model_7575','model_8468');\n\n-If you are given an object name instead of near me, use the window.changeXWithName(); functions I want you to use these variants when the object name is given, in these variants you need to enter the object name in addition, for example editQuery:(shift my object named model_849684 2 units to the right at z coordinate) When you receive this input, the value you should return is window.changeXWithName(\"model_849684\",2);\n- All commands with WithName must first get the object name and then the float value to be changed, for example window.changeXWithName(\"model_849684\",2); , window.changeYWithName(\"model_849684\",2); , window.changeZWithName(\"model_849684\",2); , window.changeScaleWithName(\"model_849684\",2);\n-If you see right or left in editQuery:(reduce the size of the object near me), you should return window.changeXNearest();. if you see forward or backward, you should return window.changeZNearest();. if you see up or down, you should return window.changeYNearest();, but you should pay attention if there is an expression like near me.\n-If you see a specifically specified coordinate plane in editQuery:(), do not check up, down, right, left, x, y, z, etc. and run the necessary command according to the specified plane, if in addition to the coordinate plane input, if up is used, you should increase the value, if down is used, you should decrease the value, likewise, if right is used, you should increase the value, if left is used, you should decrease the value.\n-If the user comes up with an input that asks you to perform more than one operation, for example editQuery:(first reduce the size of the object near me a little and then set it to 2), then the command you should return is window.changeScaleNearest(0.9)\nwindow.changeScaleNearest(2)\n- never, ever use signs other than the command format in the values you return, use signs like {}() only according to the command format\n- If you encounter a scenario that does not fit any of the given examples, you need to return window.dontUnderstand()\n- Be very careful with the command format, you should never break it, for example (window.changeScaleNearest()) is a wrong usage, it should be window.changeScaleNearest()\n- each command you return must end with ; pay special attention to this"        
      },
      {
        role: 'user',
        content: "editQuery:(" + searchQuery + ")",
      },
    ],
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        'https://api.zeroai.link/v1/chat/completions',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-Jr6PTxJiYrsL0Vu7B640E3F32090434b81B2EeCaD9D9F151'
          }
        }
      );
      console.log(response.data.choices[0].message.content);
      const parsedResponse = response.data.choices[0].message.content
      .split('\n') // Satırları ayır
      .filter(line => line.trim() !== '') // Boş satırları filtrele
      .join('\n'); // Yeniden birleştir
      eval(parsedResponse);
      setIsAiThinking(false);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
    className={`${props.aiCommandsClass ? 'aiInputHolderIn' : 'aiInputHolderOut'} aiInputHolder`}
      style={{
        position: "absolute",
        border: "1px solid rgb(242, 242, 242)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "6px",
        padding: "8px 18px",
        width: "320px",
        marginRight: "2px",
        display: "flex",
        height: "38px",
        zIndex: 2,
        transformOrigin: "50% 100% 0px",
        opacity: 1,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.13)",
        bottom: "87px",
        transform: "scale(1)",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignContent: "center",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
    <svg
        class="group-5"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.0048 9.20814C20.8663 9.06974 20.7581 8.90393 20.6873 8.72133V8.71971L19.0997 4.59274V4.59031C19.0834 4.54732 19.0544 4.51035 19.0164 4.48442C18.9785 4.45849 18.9334 4.44484 18.8875 4.44532H18.8794C18.8337 4.44517 18.789 4.45898 18.7514 4.48489C18.7138 4.5108 18.6849 4.54758 18.6688 4.59031L18.6672 4.59274L17.0795 8.72133L17.0787 8.72214C17.0082 8.90439 16.9005 9.07044 16.762 9.20895M21.0048 9.20814L21.5451 8.66706ZM21.0048 9.20814C21.1425 9.34584 21.3078 9.45438 21.4908 9.52485L25.6202 11.1133C25.6642 11.13 25.7021 11.1597 25.7289 11.1985C25.7557 11.2373 25.77 11.2832 25.7701 11.3303C25.77 11.377 25.7559 11.4226 25.7294 11.4611C25.7029 11.4996 25.6654 11.5291 25.6218 11.5458L21.4941 13.1334H21.4924C21.3099 13.2041 21.1441 13.3122 21.0058 13.4507C20.8674 13.5892 20.7595 13.7551 20.6889 13.9377L19.0997 18.0671C19.0831 18.1109 19.0536 18.1486 19.015 18.1752C18.9764 18.2019 18.9307 18.2161 18.8838 18.2161C18.837 18.2161 18.7912 18.2019 18.7527 18.1752C18.7141 18.1486 18.6846 18.1109 18.668 18.0671L17.0811 13.9402V13.9385C17.0105 13.7559 16.9025 13.5901 16.764 13.4517C16.6254 13.3133 16.4595 13.2055 16.2768 13.135L12.1725 11.5555L12.1636 11.5523C12.1157 11.5347 12.0743 11.5028 12.045 11.461C12.0157 11.4191 12 11.3693 12 11.3182C12.0014 11.274 12.0158 11.2312 12.0415 11.1951C12.0671 11.1591 12.1029 11.1315 12.1442 11.1157L12.1474 11.1141L16.2744 9.52728H16.276C16.4582 9.456 16.6243 9.34746 16.762 9.20895M16.762 9.20895L16.2217 8.66868Z"
          fill="white"
          id={pathAnimation1}
          fill-opacity="0.74"
        ></path>
        <path
          d="M20.6873 8.72133C20.7581 8.90393 20.8663 9.06974 21.0048 9.20814C21.1425 9.34584 21.3078 9.45438 21.4908 9.52485L25.6202 11.1133C25.6642 11.13 25.7021 11.1597 25.7289 11.1985C25.7557 11.2373 25.77 11.2832 25.7701 11.3303C25.77 11.377 25.7559 11.4226 25.7294 11.4611C25.7029 11.4996 25.6654 11.5291 25.6218 11.5458L21.4941 13.1334H21.4924C21.3099 13.2041 21.1441 13.3122 21.0058 13.4507C20.8674 13.5892 20.7595 13.7551 20.6889 13.9377L19.0997 18.0671C19.0831 18.1109 19.0536 18.1486 19.015 18.1752C18.9764 18.2019 18.9307 18.2161 18.8838 18.2161C18.837 18.2161 18.7912 18.2019 18.7527 18.1752C18.7141 18.1486 18.6846 18.1109 18.668 18.0671L17.0811 13.9402V13.9385C17.0105 13.7559 16.9025 13.5901 16.764 13.4517C16.6254 13.3133 16.4595 13.2055 16.2768 13.135L12.1725 11.5555L12.1636 11.5523C12.1157 11.5347 12.0743 11.5028 12.045 11.461C12.0157 11.4191 12 11.3693 12 11.3182C12.0014 11.274 12.0158 11.2312 12.0415 11.1951C12.0671 11.1591 12.1029 11.1315 12.1442 11.1157L12.1474 11.1141L16.2744 9.52728H16.276C16.4582 9.456 16.6243 9.34746 16.762 9.20895C16.9005 9.07044 17.0082 8.90439 17.0787 8.72214L17.0795 8.72133L18.6672 4.59274L18.6688 4.59031C18.6849 4.54758 18.7138 4.5108 18.7514 4.48489C18.789 4.45898 18.8337 4.44517 18.8794 4.44532H18.8875C18.9334 4.44484 18.9785 4.45849 19.0164 4.48442C19.0544 4.51035 19.0834 4.54732 19.0997 4.59031V4.59274L20.6873 8.71971V8.72133Z"
          fill="white"
          fill-opacity=""
          id={pathAnimation1}
        ></path>
        <path
          d="M6.13251 3.60059C6.18232 3.72937 6.25846 3.84635 6.35607 3.94403C6.45327 4.04204 6.57072 4.11818 6.70032 4.1684L9.6147 5.28943C9.64564 5.30136 9.67225 5.32236 9.69105 5.34968C9.70984 5.377 9.71993 5.40936 9.72 5.44252C9.72011 5.47562 9.71007 5.50796 9.69125 5.53519C9.67242 5.56241 9.64571 5.58322 9.6147 5.5948L6.70194 6.71503C6.57298 6.76493 6.45505 6.84121 6.35727 6.93899C6.2595 7.03676 6.18322 7.15388 6.13332 7.28284V7.28446L5.01147 10.1972C4.99977 10.2282 4.97894 10.2548 4.95174 10.2736C4.92453 10.2924 4.89225 10.3024 4.85919 10.3024C4.82613 10.3024 4.79385 10.2924 4.76665 10.2736C4.73944 10.2548 4.71861 10.2282 4.70691 10.1972L3.58668 7.28446V7.28284C3.53695 7.15401 3.46082 7.03701 3.36317 6.93936C3.26552 6.84171 3.14851 6.76557 3.01968 6.71584H3.01806L0.121501 5.60128L0.115021 5.59886C0.0812316 5.58641 0.0520801 5.56389 0.0315087 5.53433C0.0109373 5.50478 -6.13393e-05 5.46962 2.57314e-07 5.43361C0.000870375 5.40229 0.0110391 5.37193 0.0292132 5.3464C0.0473873 5.32087 0.0727451 5.30132 0.10206 5.29024H0.103681L3.01725 4.16921C3.14685 4.11899 3.2643 4.04284 3.3615 3.94483C3.45951 3.84763 3.53565 3.73019 3.58587 3.60059L4.70772 0.686206V0.684585C4.71925 0.654442 4.73968 0.628527 4.76631 0.610293C4.79294 0.592059 4.82449 0.582373 4.85676 0.582525H4.86243C4.89473 0.582258 4.92633 0.591898 4.95298 0.610147C4.97963 0.628396 5.00004 0.654376 5.01147 0.684585V0.686206L6.13251 3.60059Z"
          fill="white"
          id={pathAnimation2}
          fill-opacity="0.84"
        ></path>
        <path
          d="M10.3561 20.5124C10.2585 20.4147 10.1823 20.2977 10.1325 20.1689L9.01149 17.2546V17.2529C9.00006 17.2227 8.97965 17.1968 8.953 17.1785C8.92635 17.1603 8.89475 17.1506 8.86245 17.1509H8.85678C8.82451 17.1507 8.79296 17.1604 8.76633 17.1787C8.7397 17.1969 8.71927 17.2228 8.70774 17.2529V17.2546L7.58588 20.1689C7.53566 20.2985 7.45952 20.416 7.36151 20.5132M10.3561 20.5124L10.7384 20.1309ZM10.3561 20.5124C10.4533 20.6104 10.5707 20.6865 10.7003 20.7368L13.6147 21.8578C13.6456 21.8697 13.6723 21.8907 13.691 21.918C13.7098 21.9454 13.7199 21.9777 13.72 22.0109C13.7201 22.044 13.7101 22.0763 13.6912 22.1035C13.6724 22.1308 13.6457 22.1516 13.6147 22.1632L10.702 23.2834C10.573 23.3333 10.4551 23.4096 10.3573 23.5073C10.2595 23.6051 10.1832 23.7222 10.1333 23.8512V23.8528L9.01149 26.7656C8.99979 26.7965 8.97896 26.8231 8.95176 26.8419C8.92455 26.8607 8.89227 26.8708 8.85921 26.8708C8.82615 26.8708 8.79387 26.8607 8.76667 26.8419C8.73947 26.8231 8.71863 26.7965 8.70693 26.7656L7.58669 23.8528V23.8512C7.53696 23.7224 7.46083 23.6054 7.36318 23.5077C7.26553 23.4101 7.14853 23.3339 7.01969 23.2842H7.01807L4.1215 22.1696L4.11502 22.1672C4.08123 22.1548 4.05208 22.1322 4.03151 22.1027C4.01094 22.0731 3.99994 22.038 4 22.002C4.00087 21.9706 4.01104 21.9403 4.02921 21.9148C4.04739 21.8892 4.07275 21.8697 4.10206 21.8586H4.10368L7.01726 20.7376C7.14686 20.6873 7.26431 20.6112 7.36151 20.5132M7.36151 20.5132L6.98 20.1317Z"
          id={pathAnimation3}
          fill="white"
          fill-opacity="0.95"
        ></path>
      </svg>

    <form
        style={{ width: "fit-content", height: "fit-content" }}
        onSubmit={handleSubmit}
      >
        <input
          className="aiInput"
          placeholder="Feed me your ideas, I'll do the rest..."
          style={{
            textAlign: "left",
            borderWidth: "0px",
            outline: "none",
            fontFamily: "Roboto, sans-serif",
            fontSize: "0.875rem",
            width: "250px",
            fontWeight: 500,
            background: "transparent",
            color: "rgba(255, 255, 255, 0.5)",
            marginRight: "-10px",
          }}
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>

      {!isAiThinking && (
        <div style={{ visibility: "hidden" }} class="spinner">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
          <div class="bar7"></div>
          <div class="bar8"></div>
          <div class="bar9"></div>
          <div class="bar10"></div>
          <div class="bar11"></div>
          <div class="bar12"></div>
        </div>
      )}

      {isAiThinking && (
        <div class="spinner">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
          <div class="bar7"></div>
          <div class="bar8"></div>
          <div class="bar9"></div>
          <div class="bar10"></div>
          <div class="bar11"></div>
          <div class="bar12"></div>
        </div>
      )}
    </div>
  );
};

export default AiInput;
