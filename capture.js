let stream = null;

async function getCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(d => d.kind === "videoinput");

  const select = document.getElementById("cameraSelect");
  select.innerHTML = "";

  videoDevices.forEach(device => {
    const option = document.createElement("option");
    option.value = device.deviceId;
    option.text = device.label || `Camera ${select.length + 1}`;
    select.appendChild(option);
  });
}

async function startCapture() {
  const select = document.getElementById("cameraSelect");
  const deviceId = select.value;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
      audio: false
    });

    const video = document.getElementById("viewer");
    video.srcObject = stream;
    video.muted = false;

    document.getElementById("startBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
  } catch (err) {
    alert("Could not access device: " + err.message);
  }
}

function stopCapture() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;

    const video = document.getElementById("viewer");
    video.srcObject = null;

    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
  }
}

document.getElementById("startBtn").addEventListener("click", startCapture);
document.getElementById("stopBtn").addEventListener("click", stopCapture);
window.addEventListener("load", getCameras);
