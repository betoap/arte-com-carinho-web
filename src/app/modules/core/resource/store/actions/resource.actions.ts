import { Action } from '@ngrx/store';
import { IRequest } from './../../interfaces';

export enum ResourceAction {
  POST    = '[RESOURCE] Create',
  GET     = '[RESOURCE] Read',
  PUT     = '[RESOURCE] Update',
  DELETE  = '[RESOURCE] Delete',
  SUCCESS = '[RESOURCE] Success process',
  FAIL    = '[RESOURCE] Fail process'
}

export class ResourcePost implements Action {
    public readonly type = ResourceAction.POST;
    constructor ( public payload: IRequest ) { }
}

export class ResourceGet implements Action {
    public readonly type = ResourceAction.GET;
    constructor ( public payload: IRequest ) { }
}

export class ResourcePut implements Action {
    public readonly type = ResourceAction.PUT;
    constructor ( public payload: IRequest ) { }
}

export class ResourceDelete implements Action {
    public readonly type = ResourceAction.DELETE;
    constructor ( public payload: IRequest ) { }
}

export class ResourceSuccess implements Action {
    public readonly type = ResourceAction.SUCCESS;
    constructor ( public payload: any, public request?: IRequest ) { }
}

export class ResourceFail implements Action {
    public readonly type = ResourceAction.FAIL;
    constructor ( public payload: any, public request?: IRequest ) { }
}

export type ResourceActions = ResourcePost |
                            ResourceGet |
                            ResourcePut |
                            ResourceDelete |
                            ResourceSuccess |
                            ResourceFail;


