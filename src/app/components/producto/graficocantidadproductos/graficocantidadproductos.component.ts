import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ProductoService } from '../../../services/producto.service';
import { BaseChartDirective } from 'ng2-charts';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-graficocantidadproductos',
  imports: [
    BaseChartDirective,
    RouterLink

  ],
  templateUrl: './graficocantidadproductos.component.html',
  styleUrl: './graficocantidadproductos.component.css'
})
export class GraficocantidadproductosComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true
  }

  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private pS: ProductoService) { }

  ngOnInit(): void {
    this.pS.obtenerCantidadProductosPorTienda().subscribe(data => {
      this.barChartLabels=data.map(item=>item.nombre)
      this.barChartData=[
        {
          data:data.map(item=>item.cantidadProductos),
          label:'Cantidad de productos por tienda',
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
