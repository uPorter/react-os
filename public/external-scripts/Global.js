var rpmFrame = document.getElementById("rpm-frame");
var rpmContainer = document.getElementById("rpm-container");
var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");
var rpmHideButton = document.getElementById("rpm-hide-button");
var canvasWrapper = document.getElementById("canvas-wrap");

var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
var inMemCanvas = document.getElementById("inMem_Canvas");
var inMemContext = inMemCanvas.getContext('2d');

var angle = 0;
var unitygame;

window.chageNameNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "chageNameNearest", str);
  };

  window.chageDescNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "chageDescNearest", str);
  };

  window.chageLinkNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "chageLinNearest", str);
  };

  window.chageArtistNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "chageArtistNearest", str);
  };

  window.toggleShowPanelNearest = (str) => {
    window.sendMessageToUnityBasic("aiObjectController", "toggleShowPanelNearest");
  };

  window.changeScaleNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "changeScaleNearest", str);
  };

  window.changeXNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "changeXNearest", str);
  };

  window.changeYNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "changeYNearest", str);
  };

  window.changeZNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "changeZNearest", str);
  };

  window.changeRotationNearest = (str) => {
    window.sendMessageToUnity("aiObjectController", "changeRotationNearest", str);
  };

  window.removeNearest = () => {
    window.sendMessageToUnityBasic("aiObjectController", "removeNearest");
  };

  window.chageNameWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "chageNameWithName", val);
  };

  window.chageDescWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "chageDescWithName", val);
  };

  window.chageArtistWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "chageArtistWithName", val);
  };

  window.chageLinkWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "chageLinkWithName", val);
  };

  window.toggleShowPanelWithName = (str) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnityBasic("aiObjectController", "toggleShowPanelWithName");
  };

  window.changeScaleWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "changeScaleWithName", val);
  };

  window.changeXWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "changeXWithName", val);
  };

  window.changeYWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "changeYWithName", val);
  };

  window.changeZWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "changeZWithName", val);
  };

  window.changeRotationWithName = (str,val) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnity("aiObjectController", "changeRotationWithName", val);
  };

  window.removeWithName = (str) => {
    window.sendMessageToUnity("aiObjectController", "setObjectName", str);
    window.sendMessageToUnityBasic("aiObjectController", "removeWithName");
  };