import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  id: number;
  producto: Producto = new Producto();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoServicio: ProductoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productoServicio.obtenerProductoId(this.id).subscribe(dato => {
      this.producto = dato;
    }, error => console.log(error));
  }

  onSubmit() {
    this.productoServicio.actualizarProducto(this.id, this.producto).subscribe(dato => {
      this.irListaProductos();
    }, error => console.log(error));
  }

  irListaProductos() {
    this.router.navigate(['/productos']);
  }
}
