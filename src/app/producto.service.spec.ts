import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { Producto } from './producto';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService],
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerListaDeProductos should return an array of productos', (done: DoneFn) => {
    const dummyProductos: Producto[] = [
      { id: 1, nombre: 'Producto 1', categoria: 'Vino seco', marca: 'Queirolo', cantidad: 12, precio: 100 },
      { id: 2, nombre: 'Producto 2', categoria: 'Vino semi-seco', marca: 'Queirolo', cantidad: 13,precio: 200 },
    ];

    service.obtenerListaDeProductos().subscribe((productos) => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
      done();
    });

    const req = httpMock.expectOne(service['baseURL']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('registrarProducto should return a newly created producto', (done: DoneFn) => {
    const newProducto: Producto = { id: 0, nombre: 'Producto Nuevo', categoria: 'Vino semi-seco', marca: 'Tabernero', cantidad: 13 precio: 150 };
    const returnedProducto: Producto = { ...newProducto, id: 3 };

    service.registrarProducto(newProducto).subscribe((producto) => {
      expect(producto).toEqual(returnedProducto);
      done();
    });

    const req = httpMock.expectOne(service['baseURL']);
    expect(req.request.method).toBe('POST');
    req.flush(returnedProducto);
  });

  it('actualizarProducto should update the producto', (done: DoneFn) => {
    const updatedProducto: Producto = { id: 1, nombre: 'Producto Actualizado', categoria: 'Categoria Actualizada', marca: 'Queirolo', cantidad: 13, precio: 120 };

    service.actualizarProducto(updatedProducto.id, updatedProducto).subscribe((producto) => {
      expect(producto).toEqual(updatedProducto);
      done();
    });

    const req = httpMock.expectOne(`${service['baseURL']}/${updatedProducto.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProducto);
  });

  it('obtenerProductoId should return a producto by ID', (done: DoneFn) => {
    const dummyProducto: Producto = { id: 1, nombre: 'Producto 1', categoria: 'Vino semi-seco', marca: 'Queirolo', cantidad: 13, precio: 100 };

    service.obtenerProductoId(dummyProducto.id).subscribe((producto) => {
      expect(producto).toEqual(dummyProducto);
      done();
    });

    const req = httpMock.expectOne(`${service['baseURL']}/${dummyProducto.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducto);
  });

  it('eliminarProducto should delete a producto by ID', (done: DoneFn) => {
    const productoId = 1;

    service.eliminarProducto(productoId).subscribe((response) => {
      expect(response).toBeNull();
      done();
    });

    const req = httpMock.expectOne(`${service['baseURL']}/${productoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

