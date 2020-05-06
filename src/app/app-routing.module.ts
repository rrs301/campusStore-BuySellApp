import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItemsListPageModule } from './items-list/items-list.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  
  { path: 'add-item', loadChildren: './add-item/add-item.module#AddItemPageModule' },
  { path: 'display-items', loadChildren: './display-items/display-items.module#DisplayItemsPageModule' },
  { path: 'items-list', loadChildren: './items-list/items-list.module#ItemsListPageModule' },
  { path: 'items-lists', loadChildren: './items-lists/items-lists.module#ItemsListsPageModule' },
  { path: 'add-items', loadChildren: './add-items/add-items.module#AddItemsPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'my-post', loadChildren: './my-post/my-post.module#MyPostPageModule' },
  { path: 'login-user', loadChildren: './login-user/login-user.module#LoginUserPageModule' },
  { path: 'user-chat-home', loadChildren: './user-chat-home/user-chat-home.module#UserChatHomePageModule' },
  { path: 'chat-ui', loadChildren: './chat-ui/chat-ui.module#ChatUIPageModule' },
  { path: 'image-upload', loadChildren: './image-upload/image-upload.module#ImageUploadPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
