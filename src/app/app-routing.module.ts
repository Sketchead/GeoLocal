import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landpage/landpage.module').then( m => m.LandpagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'register-rest',
    loadChildren: () => import('./register-rest/register-rest.module').then( m => m.RegisterRestPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tablinks/tablinks.module').then(m => m.TablinksPageModule)
   }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}