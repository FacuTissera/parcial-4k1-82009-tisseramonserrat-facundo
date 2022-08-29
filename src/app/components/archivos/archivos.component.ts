import { Component, OnInit } from '@angular/core';
import { Archivo } from '../../models/archivo';
import { ArchivosService } from '../../services/archivos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css'],
})
export class ArchivosComponent implements OnInit {
  Titulo = 'Archivos';
  Items: Archivo[] = [];

  banderaArchivos = false;
  banderaModificacion = false;

  FormModificacion = new FormGroup({
    id: new FormControl(0),
    archivo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    vistas: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,100000000}'),
    ]),
    activo: new FormControl('', [Validators.required]),
  });

  submitted = false;

  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  constructor(private archivosService: ArchivosService) {}

  ngOnInit() {
    this.GetArchivos();
  }

  GetArchivos() {
    this.archivosService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }

  Modificar(item) {
    this.submitted = false;
    this.FormModificacion.markAsUntouched();
    this.BuscarPorId(item);
    this.banderaArchivos = true;
    this.banderaModificacion = true;
  }

  BuscarPorId(item) {
    window.scroll(0, 0); // ir al incio del scroll

    this.archivosService.getById(item.id).subscribe((res: any) => {
      this.FormModificacion.patchValue(res);
    });
  }

  Cancelar() {
    this.banderaArchivos = false;
    this.banderaModificacion = false;
  }

  // grabar tanto altas como modificaciones
  Guardar() {
    // verificar que los validadores esten OK
    if (this.FormModificacion.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormModificacion.value };

    {
      // modificar put
      this.archivosService.put(itemCopy.id, itemCopy).subscribe((res: any) => {
        alert('Registro modificado correctamente.');
        this.Cancelar();
        this.GetArchivos();
      });
    }
  }
}
