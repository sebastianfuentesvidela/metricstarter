import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ContentDialogComponent } from './login/contentdialog';
import { LoginDialogComponent } from './login/logindialog';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [
      AboutComponent,
      FeaturesComponent,
      ContentDialogComponent,
      LoginDialogComponent
    ]
})
export class StaticModule {}
