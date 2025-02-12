import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IPregunta } from './../interfaces/interfaces';
import { Observable } from 'rxjs';
import { GestionStorageService } from './gestion-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  // Array para almacenar todas las preguntas del json. Recordad inicializar el array para evitar problemas
  preguntas:IPregunta[]=[];
  //Añadir los componentes y servicios que se necesitan
  constructor(private httpCliente:HttpClient, private alertController:AlertController) {
    //Cargar los datos
    this.leerDatos();
  }

  // Método que devolverá un array de IPregunta, es decir, todas las preguntas del cuestionario en un array
  getPreguntas (){
    return this.preguntas;
  }

  // Recupera las preguntas de Storage. Si no hay ninguna almacenada, las lee del fichero
  // Controlar la asincronía.


  // Lee los datos de un fichero y los almacena en un array
  leerDatos(){
    let fitx : Observable<IPregunta[]>;
    fitx=this.httpCliente.get<IPregunta[]>("/assets/datos/datos.json");
    fitx.subscribe(info => {
      this.preguntas.push(...info);
    });
  }

  // Abre una alerta con el enunciado de la pregunta y comprueba la respuesta
  // 1- En función de si es correcta o no, actualiza el estado de acierto.
  // 2- Si no se acierta:
  // 2.1- Restará el valor de los intentos
  // 2.2- Guardará el valor añadido en el array respuestasIncorrectas
  async presentAlert(pregunta:IPregunta){
    const alert = await this.alertController.create({
      header:'¿De qué marca es este logotipo?',
      inputs:[{
        name:'resp',
        type:'text',
        placeholder:'Atención a la ortografía'
      }],
      buttons:[{text:'ENVIAR', 
        handler:(data)=>{
          this.comprobarRespuesta(data.resp, pregunta);
        }
      }],
    });
    await alert.present();
  }

  comprobarRespuesta(resp:string, pregunta:IPregunta){
    let index=this.preguntas.indexOf(pregunta);
    if (pregunta.respuesta==resp){
      if (this.preguntas[index].acierto==null){
        this.preguntas[index].acierto==true;
      }
    }else{
      this.preguntas[index].intentos++;
      this.preguntas[index].respuestasIncorrectas.push(resp);
    }
  }

  // Almacenar el array de preguntas en Storage

}
