import { RouterModule } from '@angular/router';
import { StuffComponent } from './stuff/stuff.component';

const APP_ROUTES = [
    {path: 'stuff', component: StuffComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
