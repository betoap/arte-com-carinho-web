import { HttpErrorResponse } from '@angular/common/http';

export interface ILogMessage {
  data: object;
  getTextMessage(): string;
  getMessageData(): object;
}

export class LogMessage implements ILogMessage {
  data: object;

  getMessageData(): object {
    return this.data;
  }

  getTextMessage(): string {
    if (this.data instanceof Error) {
      let error: Error;
      let logMessage: string;
      error = this.data;
      const date = new Date().toISOString();
      if (error instanceof HttpErrorResponse) {
        logMessage = date + ' Erro HTTP ' + error.message + 'Status code: ' + (<HttpErrorResponse>error).status;
      } else if (error instanceof TypeError) {
        logMessage = date + ' Erro de tipagem ' + error.message;
      } else {
        logMessage = date + ' Erro ' + error.message;
      }
      return logMessage;
    } else {
      return JSON.stringify(this.data);
    }
  }

  constructor(_message: string|object) {
    if (typeof _message === 'string') {
      this.data = {
        'message': _message
      };
    } else {
      this.data = _message;
    }
  }

}
