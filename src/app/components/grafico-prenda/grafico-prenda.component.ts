import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from 'src/app/services/inventarios/inventario.service';
import { Chart, registerables } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-prenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico-prenda.component.html',
  styleUrls: ['./grafico-prenda.component.scss']
})
export class GraficoPrendaComponent implements OnInit {
  @ViewChild('canvasSabanas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.cargarDatos();
  }

cargarDatos() {
  this.inventarioService.buscarPorNombre('sabanas').subscribe({
    next: (res: any[]) => {
      const mapa = new Map<string, number>();

      res.forEach(item => {
        // Si tiene unidad, usamos el nombre de la unidad
        let clave = item.unidad?.nombre_unidad 
          ? `Unidad: ${item.unidad.nombre_unidad}`
          : item.tipo_entidad; // si no tiene, usamos el tipo_entidad (roperia, lavanderia...)

        let cantidadActual = mapa.get(clave) || 0;
        mapa.set(clave, cantidadActual + item.cantidad);
      });

      const labels = Array.from(mapa.keys());
      const valores = Array.from(mapa.values());

      console.log('Labels:', labels);
      console.log('Valores:', valores);

      this.renderChart(labels, valores);
    },
    error: (err) => console.error(' Error al obtener datos de sábanas:', err),
  });
}


  renderChart(labels: string[], valores: number[]) {
    new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Cantidad de sábanas por unidad',
            data: valores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Inventario de sábanas por unidad clínica',
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    });
  }
}