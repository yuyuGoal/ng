/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjXnxecHRWRGBbVkVwXg==');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
