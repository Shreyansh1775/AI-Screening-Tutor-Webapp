type SpeechResultCallback = (text: string) => void;

let recognition: any = null;
let currentTranscript = "";

export function startListening(onResult: SpeechResultCallback) {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported.");
    return;
  }

  if (recognition) {
    recognition.abort();
    recognition = null;
  }

  currentTranscript = "";

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;

  // ✅ KEEP LISTENING UNTIL USER PRESSES SUBMIT
  recognition.continuous = true;

  recognition.onresult = (event: any) => {
    let transcript = "";

    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript + " ";
    }

    // ✅ ALWAYS KEEP LIVE TEXT
    currentTranscript = transcript.trim();
  };

  recognition.onerror = (event: any) => {
    if (event.error !== "aborted") {
  console.error("Speech error:", event.error);
}
  };

  recognition.onend = () => {
    recognition = null;
  };

  recognition.start();
}

export function stopListening() {
  if (recognition) {
    recognition.stop();
  }
}

export function getCurrentTranscript(): string {
  return currentTranscript;
}