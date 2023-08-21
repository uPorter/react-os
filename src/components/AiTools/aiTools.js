import React, { useState } from "react";
import "./aiTools.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import Button from "@mui/joy/Button";
import { Toaster, toast } from "sonner";
import Typography from "@mui/joy/Typography";

function aiTools(props) {
  const fillColorAssistant = props.aiAssistantClass ? "black" : "white";
  const fillColorChatBot = props.aiChatbotClass ? "black" : "white";
  const fillColorSearch = props.aiSearchClass ? "black" : "white";
  const fillColorCommands = props.aiCommandsClass ? "black" : "white";
  const fillColorSkyboxgen = props.aiSkyboxGenClass ? "black" : "white";
  return (
    <div
      style={{ position: "absolute", bottom: "15px", left: "30px" }}
      className={`${
        props.aiToolsOnClass ? "frame-5-1" : "aiInputHolderOut"
      } frame-5`}
    >
      <div
        style={{
          animation:
            "reactionInAI 0.2s cubic-bezier(0, 0.2, 0.2, 1) 0.8s 1 normal forwards",
          transform: "scale(0)",
          background: props.aiAssistantClass ? "rgb(255 255 255 / 25%)" : "",
        }}
        onClick={() => window.aiAssistantInputHandler()}
        className="inner-1"
      >
        <svg
          className="vector"
          width={21}
          height={19}
          viewBox="0 0 21 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 12.65C15.5 13.649 14.6909 14.45 13.6818 14.45C12.6727 14.45 11.8636 13.649 11.8636 12.65C11.8636 11.651 12.6818 10.85 13.6818 10.85C14.6818 10.85 15.5 11.66 15.5 12.65ZM7.31818 10.85C6.31818 10.85 5.5 11.66 5.5 12.65C5.5 13.64 6.31818 14.45 7.31818 14.45C8.31818 14.45 9.13636 13.649 9.13636 12.65C9.13636 11.651 8.32727 10.85 7.31818 10.85ZM20.5 12.2V14.9C20.5 15.395 20.0909 15.8 19.5909 15.8H18.6818V16.7C18.6818 17.699 17.8727 18.5 16.8636 18.5H4.13636C3.13636 18.5 2.31818 17.699 2.31818 16.7V15.8H1.40909C0.909091 15.8 0.5 15.395 0.5 14.9V12.2C0.5 11.705 0.909091 11.3 1.40909 11.3H2.31818C2.31818 7.817 5.16364 5 8.68182 5H9.59091V3.857C9.04545 3.551 8.68182 2.966 8.68182 2.3C8.68182 1.31 9.5 0.5 10.5 0.5C11.5 0.5 12.3182 1.31 12.3182 2.3C12.3182 2.966 11.9545 3.551 11.4091 3.857V5H12.3182C15.8364 5 18.6818 7.817 18.6818 11.3H19.5909C20.0909 11.3 20.5 11.705 20.5 12.2ZM18.6818 13.1H16.8636V11.3C16.8636 8.816 14.8273 6.8 12.3182 6.8H8.68182C6.17273 6.8 4.13636 8.816 4.13636 11.3V13.1H2.31818V14H4.13636V16.7H16.8636V14H18.6818V13.1Z"
            fill={fillColorAssistant}
          />
        </svg>
        <div className="rectangle-1" />
        <div
          style={{ color: props.aiAssistantClass ? "black" : "" }}
          className="assistant"
        >
          Assistant
        </div>
      </div>
      <div
        style={{
          animation:
            "reactionInAI 0.2s cubic-bezier(0, 0.2, 0.2, 1) 0.6s 1 normal forwards",
          transform: "scale(0)",
          background: props.aiChatbotClass ? "rgb(255 255 255 / 25%)" : "",
        }}
        onClick={() => window.aiChatbotInputHandler()}
        className="inner-2"
      >
        <svg
          className="message-outline"
          width={19}
          height={19}
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 2H3.5C2.675 2 2 2.675 2 3.5V17L5 14H15.5C16.325 14 17 13.325 17 12.5V3.5C17 2.675 16.325 2 15.5 2ZM15.5 12.5H4.4L3.5 13.4V3.5H15.5V12.5Z"
            fill={fillColorChatBot}
          />
        </svg>
        <div className="rectangle-1" />
        <div
          style={{ color: props.aiChatbotClass ? "black" : "" }}
          className="chat-bot"
        >
          Chat Bot
        </div>
      </div>
      <div
        style={{
          animation:
            "reactionInAI 0.2s cubic-bezier(0, 0.2, 0.2, 1) 0.4s 1 normal forwards",
          transform: "scale(0)",
          background: props.aiSearchClass ? "rgb(255 255 255 / 25%)" : "",
        }}
        onClick={() => window.aiSearchInputHandler()}
        className="inner-3"
      >
        <svg
          className="magnify"
          xmlns="http://www.w3.org/2000/svg"
          width={21}
          height={21}
          viewBox="0 0 48 48"
          fill={fillColorSearch}
        >
          <g clipPath="url(#clip0_72_4)">
            <path
              d="M16.84 29.92C16.46 29.92 16.1 29.86 15.8 29.76C15.48 29.64 15.22 29.5 15 29.28C14.78 29.08 14.6 28.84 14.48 28.54C14.36 28.26 14.3 27.94 14.3 27.6H11.7C11.7 28.32 11.84 28.96 12.12 29.5C12.4 30.04 12.78 30.5 13.24 30.88C13.72 31.24 14.26 31.52 14.88 31.7C15.48 31.9 16.1199 32 16.7999 32C17.5399 32 18.24 31.9 18.86 31.7C19.5 31.5 20.06 31.2 20.52 30.82C20.98 30.44 21.36 29.96 21.62 29.38C21.88 28.8 22.02 28.16 22.02 27.44C22.02 27.06 21.9799 26.68 21.8799 26.32C21.7799 25.96 21.64 25.62 21.42 25.3C21.22 24.98 20.94 24.7 20.62 24.44C20.28 24.18 19.88 23.98 19.4 23.82C19.8 23.64 20.14 23.42 20.44 23.16C20.74 22.9 20.98 22.62 21.18 22.32C21.38 22.02 21.52 21.72 21.62 21.4C21.72 21.08 21.76 20.76 21.76 20.44C21.76 19.72 21.64 19.08 21.4 18.52C21.16 17.96 20.8199 17.5 20.3799 17.14C19.9799 16.76 19.44 16.48 18.84 16.28C18.22 16.1 17.5399 16 16.7999 16C16.0799 16 15.42 16.1 14.8 16.32C14.2 16.54 13.66 16.84 13.22 17.22C12.8 17.6 12.46 18.04 12.2 18.56C11.96 19.08 11.84 19.64 11.84 20.26H14.44C14.44 19.92 14.5 19.62 14.62 19.36C14.74 19.1 14.9 18.86 15.12 18.68C15.34 18.5 15.58 18.34 15.88 18.24C16.18 18.14 16.48 18.08 16.84 18.08C17.64 18.08 18.24 18.28 18.62 18.7C19 19.1 19.2 19.68 19.2 20.42C19.2 20.78 19.14 21.1 19.04 21.4C18.94 21.7 18.76 21.94 18.54 22.14C18.32 22.34 18.0399 22.5 17.7199 22.62C17.3999 22.74 16.9999 22.8 16.5599 22.8H15.02V24.86H16.5599C16.9999 24.86 17.4 24.9 17.76 25C18.12 25.1 18.42 25.26 18.66 25.46C18.9 25.68 19.1 25.94 19.24 26.26C19.38 26.58 19.44 26.96 19.44 27.4C19.44 28.22 19.2 28.84 18.74 29.26C18.28 29.72 17.64 29.92 16.84 29.92ZM33.94 18.08C33.3 17.42 32.54 16.9 31.66 16.54C30.78 16.18 29.7999 16 28.7199 16H24V32H28.6C29.7 32 30.72 31.82 31.62 31.46C32.52 31.1 33.3 30.6 33.94 29.94C34.58 29.28 35.08 28.48 35.42 27.56C35.76 26.62 35.94 25.58 35.94 24.42V23.62C35.94 22.46 35.76 21.42 35.42 20.48C35.08 19.54 34.58 18.74 33.94 18.08ZM33.16 24.4C33.16 25.24 33.06 25.98 32.88 26.66C32.68 27.32 32.4 27.9 32.02 28.36C31.64 28.82 31.16 29.18 30.6 29.42C30.02 29.66 29.36 29.78 28.62 29.78H26.7999V18.24H28.74C30.18 18.24 31.28 18.7 32.02 19.62C32.78 20.54 33.16 21.86 33.16 23.6V24.4Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_72_4">
              <rect width={48} height={48} fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div className="rectangle-2" />
        <div
          style={{ color: props.aiSearchClass ? "black" : "" }}
          className="search"
        >
          Models
        </div>
      </div>
      <div
        style={{
          animation:
            "reactionInAI 0.2s cubic-bezier(0, 0.2, 0.2, 1) 0.2s 1 normal forwards",
          transform: "scale(0)",
          background: props.aiCommandsClass ? "rgb(255 255 255 / 25%)" : "",
        }}
        onClick={() => window.aiCommandsInputHandler()}
        className="inner-4"
      >
        <svg
          className="apple-keyboard-command"
          width={21}
          height={21}
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.50002 2.16669C6.38408 2.16669 7.23192 2.51788 7.85704 3.143C8.48216 3.76812 8.83335 4.61597 8.83335 5.50002V7.16669H12.1667V5.50002C12.1667 4.61597 12.5179 3.76812 13.143 3.143C13.7681 2.51788 14.616 2.16669 15.5 2.16669C16.3841 2.16669 17.2319 2.51788 17.857 3.143C18.4822 3.76812 18.8334 4.61597 18.8334 5.50002C18.8334 6.38408 18.4822 7.23192 17.857 7.85704C17.2319 8.48216 16.3841 8.83335 15.5 8.83335H13.8334V12.1667H15.5C16.3841 12.1667 17.2319 12.5179 17.857 13.143C18.4822 13.7681 18.8334 14.616 18.8334 15.5C18.8334 16.3841 18.4822 17.2319 17.857 17.857C17.2319 18.4822 16.3841 18.8334 15.5 18.8334C14.616 18.8334 13.7681 18.4822 13.143 17.857C12.5179 17.2319 12.1667 16.3841 12.1667 15.5V13.8334H8.83335V15.5C8.83335 16.3841 8.48216 17.2319 7.85704 17.857C7.23192 18.4822 6.38408 18.8334 5.50002 18.8334C4.61597 18.8334 3.76812 18.4822 3.143 17.857C2.51788 17.2319 2.16669 16.3841 2.16669 15.5C2.16669 14.616 2.51788 13.7681 3.143 13.143C3.76812 12.5179 4.61597 12.1667 5.50002 12.1667H7.16669V8.83335H5.50002C4.61597 8.83335 3.76812 8.48216 3.143 7.85704C2.51788 7.23192 2.16669 6.38408 2.16669 5.50002C2.16669 4.61597 2.51788 3.76812 3.143 3.143C3.76812 2.51788 4.61597 2.16669 5.50002 2.16669ZM13.8334 15.5C13.8334 15.942 14.0089 16.366 14.3215 16.6785C14.6341 16.9911 15.058 17.1667 15.5 17.1667C15.942 17.1667 16.366 16.9911 16.6785 16.6785C16.9911 16.366 17.1667 15.942 17.1667 15.5C17.1667 15.058 16.9911 14.6341 16.6785 14.3215C16.366 14.0089 15.942 13.8334 15.5 13.8334H13.8334V15.5ZM12.1667 8.83335H8.83335V12.1667H12.1667V8.83335ZM5.50002 13.8334C5.05799 13.8334 4.63407 14.0089 4.32151 14.3215C4.00895 14.6341 3.83335 15.058 3.83335 15.5C3.83335 15.942 4.00895 16.366 4.32151 16.6785C4.63407 16.9911 5.05799 17.1667 5.50002 17.1667C5.94205 17.1667 6.36597 16.9911 6.67853 16.6785C6.99109 16.366 7.16669 15.942 7.16669 15.5V13.8334H5.50002ZM7.16669 5.50002C7.16669 5.05799 6.99109 4.63407 6.67853 4.32151C6.36597 4.00895 5.94205 3.83335 5.50002 3.83335C5.05799 3.83335 4.63407 4.00895 4.32151 4.32151C4.00895 4.63407 3.83335 5.05799 3.83335 5.50002C3.83335 5.94205 4.00895 6.36597 4.32151 6.67853C4.63407 6.99109 5.05799 7.16669 5.50002 7.16669H7.16669V5.50002ZM15.5 7.16669C15.942 7.16669 16.366 6.99109 16.6785 6.67853C16.9911 6.36597 17.1667 5.94205 17.1667 5.50002C17.1667 5.05799 16.9911 4.63407 16.6785 4.32151C16.366 4.00895 15.942 3.83335 15.5 3.83335C15.058 3.83335 14.6341 4.00895 14.3215 4.32151C14.0089 4.63407 13.8334 5.05799 13.8334 5.50002V7.16669H15.5Z"
            fill={fillColorCommands}
          />
        </svg>
        <div className="rectangle-2" />
        <div
          style={{ color: props.aiCommandsClass ? "black" : "" }}
          className="commands"
        >
          Commands
        </div>
      </div>
      <div
        style={{
          animation:
            "reactionInAI 0.2s cubic-bezier(0, 0.2, 0.2, 1) 0s 1 normal forwards",
          transform: "scale(0)",
          background: props.aiSkyboxGenClass ? "rgb(255 255 255 / 25%)" : "",
        }}
        onClick={() => window.aiSkyboxInputHandler()}
        className="skybox-gen-back"
      >
        <svg
          className="vector5"
          width={34}
          height={23}
          viewBox="0 0 34 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.4125 8.72335C26.4492 3.83585 22.1567 0.166687 17 0.166687C12.9058 0.166687 9.35 2.49002 7.57917 5.89002C3.315 6.34335 0 9.95585 0 14.3333C0 19.0225 3.81083 22.8333 8.5 22.8333H26.9167C30.8267 22.8333 34 19.66 34 15.75C34 12.01 31.0958 8.97835 27.4125 8.72335ZM26.9167 20H8.5C5.36917 20 2.83333 17.4642 2.83333 14.3333C2.83333 11.2025 5.36917 8.66668 8.5 8.66668H9.50583C10.4408 5.39419 13.43 3.00002 17 3.00002C21.3067 3.00002 24.7917 6.48502 24.7917 10.7917V11.5H26.9167C29.2683 11.5 31.1667 13.3984 31.1667 15.75C31.1667 18.1017 29.2683 20 26.9167 20Z"
            fill={fillColorSkyboxgen}
          />
        </svg>
        <div className="svg" />
        <div
          style={{ color: props.aiSkyboxGenClass ? "black" : "" }}
          className="skybox-generator"
        >
          SKYBOX
          <br />
          GENERATOR
        </div>
      </div>
    </div>
  );
}
export default aiTools;
