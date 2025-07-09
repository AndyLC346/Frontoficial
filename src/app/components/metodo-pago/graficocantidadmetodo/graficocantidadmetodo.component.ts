import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-graficocantidadmetodo',
  imports: [
    BaseChartDirective,
    RouterLink
  ],
  templateUrl: './graficocantidadmetodo.component.html',
  styleUrl: './graficocantidadmetodo.component.css'
})
export class GraficocantidadmetodoComponent implements OnInit {

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private mpS: MetodoPagoService) {}

  ngOnInit(): void {
    this.mpS.obtenerCantidadPorTipo().subscribe(data => {
      this.barChartLabels = data.map(item => item.tipo);
      this.barChartData = [
        {
          data: data.map(item => item.cantidad),
          label: 'Cantidad por tipo de método de pago',
          backgroundColor: ['#1976d2', '#42a5f5', '#90caf9', '#bbdefb'],
          borderColor: '#1976d2',
          borderWidth: 1
        }
      ];
    });
  }
}
