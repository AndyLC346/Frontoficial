import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  private recognition: any;
  private isListening = false;

  public text$ = new BehaviorSubject<string>('');

  constructor(private zone: NgZone) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-PE';
    this.recognition.interimResults = true;
    this.recognition.continuous = true;

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }

      this.zone.run(() => {
        this.text$.next(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition.start(); // vuelve a escuchar automáticamente
      }
    };
  }

  startListening() {
    if (!this.isListening) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getTranscriptObservable() {
    return this.text$.asObservable();
  }

  limpiarTextoReconocido(): void {
  this.text$.next('');
}
}