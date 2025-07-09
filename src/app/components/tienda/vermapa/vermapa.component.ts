import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-vermapa',
  imports: [],
  templateUrl: './vermapa.component.html',
  styleUrl: './vermapa.component.css'
})
export class VermapaComponent implements OnInit {
lat: number = 0;
  lon: number = 0;
  private L: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.lat = data.lat;
    this.lon = data.lon;
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const leaflet = await import('leaflet'); // lo carga solo en navegador
      this.L = leaflet;
      this.initMap();
    }
  }

  private initMap(): void {
    const map = this.L.map('mapa').setView([this.lat, this.lon], 15);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    this.L.marker([this.lat, this.lon]).addTo(map);
  }
}
