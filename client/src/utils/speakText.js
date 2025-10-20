export const speakText = (text) => {
  window.speechSynthesis.cancel();
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.volume = 1;
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.lang = "en-US";
  window.speechSynthesis.speak(text_speak);
};
