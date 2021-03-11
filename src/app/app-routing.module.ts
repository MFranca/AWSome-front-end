import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TestsComponent } from './components/tests/tests.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { VideosComponent } from './components/videos/videos.component';

import { AuthGuard } from './guards/auth.guard';

// ROUTE TABLE para os componentes que serão renderizados em <router-outlet></router-outlet>
const routes: Routes = [ // the order of the routes MATTER! (top->down)
  { path: 'home', component: HomeComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }, // whenever AuthGuard resolves to true...
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] }, // the user can access these two...

  // lazy load/rota dinamica
  //{ path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule)}, // assíncrono (promise)
  
  { path: '**', redirectTo: '/home' } // outros casos/erros (wildcard) - "route safety"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }