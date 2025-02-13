import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoiburukoaComponent } from './goiburukoa.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GoiburukoaComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [GoiburukoaComponent]
})
export class ModuluaModule { }
