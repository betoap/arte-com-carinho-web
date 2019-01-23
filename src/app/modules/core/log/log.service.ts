import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionStorageService } from '../storage/session-storage.service';
import { LogApiService } from './log.api.service';
import { LogLevels } from './log-levels';
import { interval } from 'rxjs';
import { LogMessage } from './log-message.model';

const DEFAULT_TIMEOUT = 10000;

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logLevel: string;
  private logInterval: any;
  private endpoint: string;
  private storageLimit: number;
  private currentLogs: any[];
  private logMessage: LogMessage;
  private logIntervalTime: number;
  constructor(
    private storage: SessionStorageService,
    private logApiService: LogApiService) {
    this.logLevel = environment.logLevel;
    this.storageLimit = environment.storageLimit;
    this.endpoint = environment.endpoint;
    this.logIntervalTime = environment.logIntervalTime;
  }

  public error(message: string|object): void {
    this.log(LogLevels.error, message, 'error');
  }

  public warn(message: string|object): void {
    this.log(LogLevels.warn, message, 'warn');
  }

  public info(message: string|object): void {
    this.log(LogLevels.info, message, 'info');
  }

  public log(levelsList: string[], message: string|object, level?: string): void {
    if (levelsList.indexOf(this.logLevel) >= 0) {
      this.logMessage = new LogMessage(message);
      level ? console[level](this.logMessage.getTextMessage()) : console.error(this.logMessage.getTextMessage());
      this.initLogInterval();
    }
  }

  private initLogInterval(): void {
    if (this.endpoint && this.endpoint.length > 0) {
      this.storeLog(this.logMessage);
      if (this.logInterval === undefined) {
        this.startLogInterval();
      }
    } else {
      console.error('Não foi configurado o endpoint para envio de logs');
    }
  }

  private clearStoredLogsAndStopInterval(): void {
    this.logInterval.unsubscribe();
    this.logInterval = undefined;
    this.storage.removeStorageItem('logs');
  }

  private storeLog(log: LogMessage): void {
    if (this.storage.getStorageItem('logs') &&
      this.storage.getStorageItem('logs').length === this.storageLimit) {
      this.sendLogs();
    } else {
      this.currentLogs = this.storage.getStorageItem('logs') || [];
      this.currentLogs.push(log);
      this.storage.setStorageItem('logs', this.currentLogs);
    }
  }

  private startLogInterval(): void {
    this.logInterval = interval(this.logIntervalTime || DEFAULT_TIMEOUT).subscribe(() =>
      this.sendLogs()
    );
  }

  private sendLogs(): void {
    this.currentLogs = this.storage.getStorageItem('logs');
    this.logApiService.postLogs(this.currentLogs)
      .subscribe(() => this.clearStoredLogsAndStopInterval(),
        (err) => this.sendLogsError(err));
  }

  private sendLogsError(err: string): void {
    if (this.storage.getStorageItem('logs').length === this.storageLimit) {
      console.error('Erro: Limite de storage alcançado e api de log inacessível');
      this.logInterval.unsubscribe();
    } else {
      console.error('Erro: ', err);
    }
  }
}
