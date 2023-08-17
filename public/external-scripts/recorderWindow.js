let canvas2;
let recorder;

window.initializeRecorder = () =>{
    canvas2 = document.getElementById('react-unity-webgl-canvas-1');
    recorder = new CanvasRecorder(canvas2); 
}

window.startRecording = () =>{
    recorder.start();
}

window.stopRecording = () =>{
    recorder.stop();
    recorder.save();
}