import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CarritocompraService } from '../../../services/carritocompra.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ordencarritocompra',
  standalone: true,
  imports: [BaseChartDirective, RouterLink],
  templateUrl: './ordencarritocompra.component.html',
  styleUrl: './ordencarritocompra.component.css',
})
export class OrdencarritocompraComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: {
            weight: 'bold',
          }
        }
      },
      y: {
        ticks: {
          color: '#333',
          font: {
            weight: 'bold',
          }
        },
        title: {
          display: true,
          text: 'Precio (S/.)',
          color: '#333',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    }
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset<'bar'>[] = [];

  constructor(private ccService: CarritocompraService) {}

  ngOnInit(): void {
    this.ccService.OrderCarritoCompra().subscribe((data) => {
      this.barChartLabels = data.map(item => item.username);
      this.barChartData = [
        {
          data: data.map(item => item.precioProducto),
          label: 'Precio de productos por usuario',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          borderWidth: 1,
        },
      ];
    });
  }
}
