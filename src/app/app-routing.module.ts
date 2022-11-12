import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo,redirectLoggedInTo, AuthGuard} from '@angular/fire/auth-guard';
import { Firestore } from '@angular/fire/firestore';


firestore: Firestore
const redirectLoggedInToHome = () => redirectLoggedInTo(['/app/home']);
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landpage/landpage.module').then( m => m.LandpagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./register-client/register-client.module').then( m => m.RegisterClientPageModule),
  },
  {
    path: 'register-rest',
    loadChildren: () => import('./register-rest/register-rest.module').then( m => m.RegisterRestPageModule),
  },{
    path: 'user-type',
    loadChildren: () => import('./user-type/user-type.module').then( m => m.UserTypePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'app',
    loadChildren: () => import('./tablinks/tablinks.module').then(m => m.TablinksPageModule),
   },
  {
    path: 'view-post', //TODAVIA NO SIRVE
    loadChildren: () => import('./view-post/view-post.module').then( m => m.ViewPostPageModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./create-post/create-post.module').then( m => m.CreatePostPageModule)
  },
  {
    path: 'datos-cliente',
    loadChildren: () => import('./datos-cliente/datos-cliente.module').then( m => m.DatosClientePageModule)
  },
  {
    path: 'datos-restaurant',
    loadChildren: () => import('./datos-restaurant/datos-restaurant.module').then( m => m.DatosRestaurantPageModule)
  },
  {
    path: 'create-publicity-post',
    loadChildren: () => import('./create-publicity-post/create-publicity-post.module').then( m => m.CreatePublicityPostPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


