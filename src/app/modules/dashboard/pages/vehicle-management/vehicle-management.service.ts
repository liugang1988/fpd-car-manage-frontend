import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class VehicleManagementService {

  constructor(private authHttp: AuthService) { }

}
