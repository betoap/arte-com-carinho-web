import { Injectable, ErrorHandler } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler extends ErrorHandler {
  constructor(private errorLogService: LogService) {
    super();
  }

  public handleError(error: Error): void {
    this.errorLogService.error(error);
  }
}
