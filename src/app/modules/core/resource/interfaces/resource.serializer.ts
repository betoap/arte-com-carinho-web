import { Resource } from './../classes';

export interface ISerializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}
