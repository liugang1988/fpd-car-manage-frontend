import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 页面
import { InsurancePriceComponent } from './insurance-price.component';
import { InsuranceProjectComponent } from './insurance-project/insurance-project.component';
import { PriceResultComponent } from './price-result/price-result.component';
import { VehicleInforComponent } from './vehicle-infor/vehicle-infor.component';



const routes: Routes = [
  {
    path: '',
    component: InsurancePriceComponent,
    data: {
      title: '常规保险核价'
    }
  }
];

export const InsurancePriceRoutes: ModuleWithProviders = RouterModule.forChild( routes );


