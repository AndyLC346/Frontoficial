import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarchatComponent } from './listarchat/listarchat.component';

@Component({
  selector: 'app-chat',
  imports: [RouterOutlet, ListarchatComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(public route: ActivatedRoute){}

}
