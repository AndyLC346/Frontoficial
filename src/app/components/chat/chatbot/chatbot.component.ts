import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../../services/gemini.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  // 🆕 2. valor que viene desde el padre (<app-chatbot [abierto]="true">)
  @Input() abierto: boolean = false;

  // getters para el HTML
  get isOpen() { return this.abierto; }
  get isLoading() { return this.loading; }

  userMessage = '';
  botMessage = '';
  loading = false;

  // lista de palabras permitidas
  private allowedKeywords = [
    'hola', 'buenos días', 'cómo compro', 'carrito',
    'registr', 'inicio de sesión', 'devolución', 'reembolso', 'productos','promociones'
  ];

  constructor(private gemini: GeminiService) { }

  async enviar() {
    if (!this.userMessage.trim() || this.loading) { return; }

    const texto = this.userMessage.toLowerCase();
    const esValido = this.allowedKeywords.some(k => texto.includes(k));

    if (!esValido) {
      this.botMessage =
        'Lo siento, solo puedo ayudarte con preguntas sobre Ahorra Comprando Web.';
      this.userMessage = '';
      return;         // no llama a la API
    }

    this.loading = true;
    try {
      this.botMessage = await this.gemini.ask(this.userMessage);
    } finally {
      this.loading = false;
      this.userMessage = '';
    }
  }
}
