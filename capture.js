async function startCapture() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(d => d.kind === "videoinput");
  const audioDevices = devices.filter(d => d.kind === "audioinput");

  const videoSource = videoDevices.find(d =>
    d.label.toLowerCase().includes("capture") || d.label.toLowerCase().includes("hdmi")
  );
  const audioSource = audioDevices.find(d =>
    d.label.toLowerCase().includes("capture") || d.label.toLowerCase().includes("hdmi")
  );

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: videoSource?.deviceId || undefined },
      audio: audioSource ? { deviceId: audioSource.deviceId } : false
    });

    const videoEl = document.getElementById('viewer');
    videoEl.srcObject = stream;
    videoEl.muted = false;
  } catch (err) {
    alert("Error accessing HDMI capture device: " + err.message);
  }
}

startCapture();
