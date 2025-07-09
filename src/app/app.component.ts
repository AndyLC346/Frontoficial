import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from "./components/chat/chatbot/chatbot.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    ChatbotComponent,
    CommonModule,
    FormsModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'FrontendGrupo1';

  isMuted = true; // comienza silenciado
  volumenPersonalizado = 0.2; // para poner la cantidad de volumen

  toggleMute(audio: HTMLAudioElement) {
    if (this.isMuted) {
      // Desmutea y fija volumen personalizado
      this.isMuted = false;
      audio.muted = false;
      audio.volume = this.volumenPersonalizado;
      if (audio.paused) {
        audio.play();
      }
    } else {
      // Mutea
      this.isMuted = true;
      audio.muted = true;
    }
  }

  chatAbierto = false;

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

}




