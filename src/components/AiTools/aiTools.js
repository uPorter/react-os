import React, { useState } from "react";
import "./aiTools.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import Button from "@mui/joy/Button";
import { Toaster, toast } from "sonner";
import Typography from "@mui/joy/Typography";

function aiTools() {
  return (
    <div style={{position:"absolute", bottom:"15px", left:"30px"}} className="frame-5">
      <div style={{ animation:"reactionInAI 0.4s ease 1.6s 1 normal forwards",transform:"scale(0)"}} className="inner-1">
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
            fill="white"
          />
        </svg>
        <div className="rectangle-1" />
        <div className="assistant">Assistant</div>
      </div>
      <div style={{ animation:"reactionInAI 0.4s ease 1.2s 1 normal forwards",transform:"scale(0)"}} className="inner-2">
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
            fill="white"
          />
        </svg>
        <div className="rectangle-1" />
        <div className="chat-bot">Chat Bot</div>
      </div>
      <div style={{ animation:"reactionInAI 0.4s ease 0.8s 1 normal forwards",transform:"scale(0)"}} className="inner-3">
        <svg
          className="magnify"
          width={21}
          height={21}
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.41667 3C9.85326 3 11.231 3.57068 12.2468 4.5865C13.2627 5.60233 13.8333 6.98008 13.8333 8.41667C13.8333 9.75833 13.3417 10.9917 12.5333 11.9417L12.7583 12.1667H13.4167L17.5833 16.3333L16.3333 17.5833L12.1667 13.4167V12.7583L11.9417 12.5333C10.9917 13.3417 9.75833 13.8333 8.41667 13.8333C6.98008 13.8333 5.60233 13.2627 4.5865 12.2468C3.57068 11.231 3 9.85326 3 8.41667C3 6.98008 3.57068 5.60233 4.5865 4.5865C5.60233 3.57068 6.98008 3 8.41667 3ZM8.41667 4.66667C6.33333 4.66667 4.66667 6.33333 4.66667 8.41667C4.66667 10.5 6.33333 12.1667 8.41667 12.1667C10.5 12.1667 12.1667 10.5 12.1667 8.41667C12.1667 6.33333 10.5 4.66667 8.41667 4.66667Z"
            fill="white"
          />
        </svg>
        <div className="rectangle-2" />
        <div className="search">Search</div>
      </div>
      <div style={{ animation:"reactionInAI 0.4s ease 0.4s 1 normal forwards",transform:"scale(0)"}} className="inner-4">
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
            fill="white"
          />
        </svg>
        <div className="rectangle-2" />
        <div className="search">Commands</div>
      </div>
      <div style={{ animation:"reactionInAI 0.4s ease 0s 1 normal forwards",transform:"scale(0)"}} className="skybox-gen-back">
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
            fill="white"
          />
        </svg>
        <div className="svg" />
        <div className="skybox-generator">
          SKYBOX
          <br />
          GENERATOR
        </div>
      </div>
    </div>
  );
}
export default aiTools;
