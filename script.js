Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#scanner')
    },
    decoder: {
      readers: ["code_128_reader"]
    }
  }, function(err) {
    if (err) return console.error(err);
    Quagga.start();
  });
  
  Quagga.onDetected(function(data) {
    const code = data.codeResult.code;
    document.getElementById("barcode-result").textContent = code;
    sendToGoogleSheet(code);
  });
  
  function sendToGoogleSheet(barcode) {
    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      body: JSON.stringify({ barcode: barcode }),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.text())
    .then(data => console.log("Google Sheet response:", data));
  }
  