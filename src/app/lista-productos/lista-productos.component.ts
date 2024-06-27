import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  productos: Producto[];

  constructor(private productoServicio: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  actualizarProducto(id: number) {
    this.router.navigate(['actualizar-producto', id]);
  }

  eliminarProducto(id: number) {
    this.productoServicio.eliminarProducto(id).subscribe(dato => {
      console.log(dato);
      this.obtenerProductos();
    });
  }

  private obtenerProductos() {
    this.productoServicio.obtenerListaDeProductos().subscribe(dato => {
      this.productos = dato;
    });
  }
}
