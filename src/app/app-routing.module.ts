import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockUI, BlockUIModule } from 'ng-block-ui';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
