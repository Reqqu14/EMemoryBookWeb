import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMediaComponent } from '../components/view-media/view-media.component';
import { AddMediaComponent } from '../components/add-media/add-media.component';

export const routes: Routes = [
  { path: '', component: AddMediaComponent },
  { path: 'view-media/:eventId', component: ViewMediaComponent },
];
