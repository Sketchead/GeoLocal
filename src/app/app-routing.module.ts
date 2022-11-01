import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landpage/landpage.module').then( m => m.LandpagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
   // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./register-client/register-client.module').then( m => m.RegisterClientPageModule),
   // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register-rest',
    loadChildren: () => import('./register-rest/register-rest.module').then( m => m.RegisterRestPageModule),
   // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./tablinks/tablinks.module').then(m => m.TablinksPageModule)
   },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-type',
    loadChildren: () => import('./user-type/user-type.module').then( m => m.UserTypePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}