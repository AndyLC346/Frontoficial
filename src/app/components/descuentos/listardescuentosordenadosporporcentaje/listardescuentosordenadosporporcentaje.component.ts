import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DescuentoService } from '../../../services/descuento.service';
import { ListarDescuentosOrdenadosPorPorcentajeDTO } from '../../../models/ListarDescuentosOrdenadosXPorcentaje';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listardescuentosordenadosporporcentaje',
  standalone: true,
  imports: [BaseChartDirective,RouterLink],
  templateUrl: './listardescuentosordenadosporporcentaje.component.html',
  styleUrl: './listardescuentosordenadosporporcentaje.component.css'
})
export class ListardescuentosordenadosporporcentajeComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private descuentoService: DescuentoService) {}

  ngOnInit(): void {
    this.descuentoService.OrdenarDescuento().subscribe(
      (data: ListarDescuentosOrdenadosPorPorcentajeDTO[]) => {
        this.barChartLabels = data.map(item => item.codigoDescuento);
        this.barChartData = [
          {
            data: data.map(item => item.porcentajeDescuento),
            label: 'Descuentos ordenados por %',
            backgroundColor: [
              '#f44336', '#2196f3', '#4caf50', '#ff9800',
              '#9c27b0', '#00bcd4', '#ffeb3b', '#8bc34a'
            ],
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        ];
      }
    );
  }
}
