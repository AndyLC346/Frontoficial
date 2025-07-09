import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { UsuarioService } from '../../../services/usuario.service';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-graficoestadousuario',
  imports: [
    BaseChartDirective,
    RouterLink
  ],
  templateUrl: './graficoestadousuario.component.html',
  styleUrl: './graficoestadousuario.component.css'
})
export class GraficoestadousuarioComponent implements OnInit {

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  barChartLabels: string[] = ['Usuarios'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Activos',
        data: [], // se llenará en ngOnInit
        backgroundColor: '#4caf50'
      },
      {
        label: 'Inactivos',
        data: [], // se llenará en ngOnInit
        backgroundColor: '#f44336'
      }
    ]
  };

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.obtenerUsuariosPorEstado().subscribe(data => {
      const activos = data.find(u => u.estado === 'Activo')?.cantidad || 0;
      const inactivos = data.find(u => u.estado === 'Inactivo')?.cantidad || 0;

      this.barChartData.datasets[0].data = [activos];
      this.barChartData.datasets[1].data = [inactivos];
    });
  }
}
