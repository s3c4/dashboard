import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/albums/albums.module').then(m => m.AlbumsModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }