import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChatService } from '../../../services/chat.service';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cantidadchats',
  imports: [    BaseChartDirective,
    RouterLink],
  templateUrl: './cantidadchats.component.html',
  styleUrl: './cantidadchats.component.css'
})
export class CantidadchatsComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true
  }

  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private pS: ChatService) { }

  ngOnInit(): void {
    this.pS.obtenerCantidadProductosPorTienda().subscribe(data => {
      this.barChartLabels=data.map(item=>item.nombre)
      this.barChartData=[
        {
          data:data.map(item=>item.cantidadChats),
          label:'Cantidad de Chats por tienda',
          backgroundColor:[
            '#d13f20',
            '#e8745b'
          ],
          borderColor: '#d13f20',
          borderWidth: 1
        }
      ]
    })
  }

}

