import { GestionStorageService } from './../servicios/gestion-storage.service';
import { AlertController } from '@ionic/angular';
import { Component, input } from '@angular/core';
import { CuestionarioService } from './../servicios/cuestionario.service';
import { IPregunta } from './../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  //Importar servicio
  constructor(public cs:CuestionarioService, private gs:GestionStorageService) {}

  //Crear método para gestionar el onclick de RESPONDER
  //Recibirá un IPregunta y llamará al servicio para realizar las operaciones necesarias.
  respuesta(respuesta:IPregunta){
    console.log(respuesta);
    this.cs.presentAlert(respuesta);
  }

  //Crear método para gestionar el onclick de Guardar
  //No recibe parámetros y llamará al servicio para realizar las operaciones necesarias.
  async guardar(){
    await this.gs.setObject('guardar',this.cs.getPreguntas());
    console.log('Datos guardados');
  }

}
