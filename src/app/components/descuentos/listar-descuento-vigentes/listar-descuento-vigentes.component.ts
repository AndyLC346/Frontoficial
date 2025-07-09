import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DescuentoVigentesDTO } from '../../../models/descuentovigenteDTO';
import { DescuentoService } from '../../../services/descuento.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-descuento-vigentes',
  standalone: true,
  imports: [BaseChartDirective,RouterLink],
  templateUrl: './listar-descuento-vigentes.component.html',
  styleUrl: './listar-descuento-vigentes.component.css',
})
export class ListarDescuentoVigentesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dC: DescuentoService) {}

  ngOnInit(): void {
    this.dC.DescVigente().subscribe((data: DescuentoVigentesDTO[]) => {
      this.barChartLabels = data.map(item => item.codigoDescuento);
      this.barChartData = [
        {
          data: data.map(item => item.porcentajeDescuento),
          label: 'Descuentos Vigentes (%)',
          backgroundColor: [
            '#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4',
          ],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ];
    });
  }
}
