import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  // 1️⃣  SOLO la clave (sin segundo parámetro)
  private genAI = new GoogleGenerativeAI(environment.geminiApiKey);

  // 2️⃣  El nombre del modelo debe llevar el prefijo  models/
  private model = this.genAI.getGenerativeModel({
    model: 'models/gemini-1.5-flash-latest',   // ✅ v1 estable
  });

  constructor() { }

  async ask(prompt: string): Promise<string> {

    /* 1) Instrucción de contexto (“system prompt”) */
    const contexto = `Eres el asistente oficial de Ahorra Comprando Web.
    Sólo respondes saludos y preguntas sobre la web
    (registro, compras, carrito, devoluciones, inicio de sesión, productos, promociones).
    Si el usuario pregunta otra cosa, responde:
    "Lo siento, solo puedo ayudarte con preguntas sobre Ahorra Comprando Web."`;
    /* 2) Unimos contexto + mensaje del usuario en un solo texto */
    const promptFinal = `${contexto}\n\nUsuario: ${prompt}`;

    /* 3) Llamada a Gemini con un único string */
    const res = await this.model.generateContent(promptFinal);

    return res.response.text();
  }
}
