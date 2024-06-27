import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseURL = 'http://localhost:8081/api/v1/productos';

  constructor(private http: HttpClient) {}

  obtenerListaDeProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseURL);
  }

  registrarProducto(producto: Producto): Observable<Object> {
    return this.http.post(this.baseURL, producto);
  }

  actualizarProducto(id: number, producto: Producto): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, producto);
  }

  obtenerProductoId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseURL}/${id}`);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
