# TODO: Add Voice Features to Chatbot (TTS and STT)

## Current Status
- [ ] Add state variables for voice input/output (isRecording, isTTSEnabled, transcript, recognition instance)
- [ ] Add microphone button to input area for voice input toggle
- [ ] Implement SpeechRecognition: start/stop listening, transcribe speech to text, handle results and errors
- [ ] Implement SpeechSynthesis: automatically speak assistant messages when TTS is enabled
- [ ] Add microphone permission handling and user consent prompts
- [ ] Add UI feedback for voice input status (recording indicator, TTS toggle)
- [ ] Integrate voice input seamlessly with existing text chat (auto-send after transcription)
- [ ] Test voice features: STT accuracy, TTS playback, permission handling
- [ ] Ensure accessibility: keyboard navigation, screen reader support for voice buttons
- [ ] Verify no regressions in existing chat functionality

## Notes
- Use Web Speech API (SpeechRecognition for STT, SpeechSynthesis for TTS)
- Handle browser compatibility (fallback for unsupported browsers)
- Voice input should set transcript as inputMessage and optionally auto-send
- TTS should read assistant responses aloud
- Add visual indicators for recording state
