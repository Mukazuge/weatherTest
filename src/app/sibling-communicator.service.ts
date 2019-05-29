import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingCommunicatorService {
  public changeConversionSubject = new Subject();

  constructor() { }

  public changeConversionType(data) {
    this.changeConversionSubject.next(data);
  }
}
