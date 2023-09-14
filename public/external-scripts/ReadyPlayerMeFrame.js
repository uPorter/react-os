var ui = document.getElementById('ui').className = 'newclass';
let isCharacter = "true"; // Başlangıçta true olarak başlatın
rpmHideButton.onclick = function () {
    if (document.fullscreenElement) {
        canvasWrapper.requestFullscreen();
    }
    rpmContainer.style.display = "none";
    ui.style.display = "none";

};

function toggleNpcAvatar(value) {
    isCharacter = value; // Değişkenin değerini ters çevir (true ise false, false ise true yap)
}

toggleNpcAvatar("true");
setupRpmFrame();

// Çerezi oluştur
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  // Çerezi "sharedData" adıyla ve değeri "yourSharedValue" olarak ayarla
  
  

function setupRpmFrame(subdomain) {
    rpmFrame.src = `https://metaos.readyplayer.me/avatar?frameApi`;

    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);

    function subscribe(event) {
        const json = parse(event);
        if (
            unityInstance == null ||
            json?.source !== "readyplayerme" ||
            json?.eventName == null
        ) {
            return;
        }
        // Send web event names to Unity can be useful for debugging. Can safely be removed
        unityInstance.SendMessage(
            "DebugPanel",
            "LogMessage",
            `Event: ${json.eventName}`
        );

        // Subscribe to all events sent from Ready Player Me once frame is ready
        if (json.eventName === "v1.frame.ready") {
            rpmFrame.contentWindow.postMessage(
                JSON.stringify({
                    target: "readyplayerme",
                    type: "subscribe",
                    eventName: "v1.**",
                }),
                "*"
            );
        }

        // Get avatar GLB URL
        if (json.eventName === "v1.avatar.exported") {
            rpmContainer.style.display = "none";
            // Send message to a Gameobject in the current scene
            if(isCharacter === "true"){
                unityInstance.SendMessage(
                    "WebAvatarLoader", // Target GameObject name
                    "LoadWebviewAvatar", // Name of function to run
                    json.data.url
                );
                setCookie("avatarURL", json.data.url, 30); // 30 gün boyunca geçerli
                console.log(`Avatar URL: ${json.data.url}`);
            }else{
                unityInstance.SendMessage(
                    "WebAvatarLoaderNPC", // Target GameObject name
                    "objectLoad", // Name of function to run
                    json.data.url
                );
            }
            
        }

        // Get user id
        if (json.eventName === "v1.user.set") {
            console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
        }
    }

    function parse(event) {
        try {
            return JSON.parse(event.data);
        } catch (error) {
            return null;
        }
    }
}



function showRpm() {
    rpmContainer.style.display = "flex";
}

function hideRpm() {
    rpmContainer.style.display = "none";
}
