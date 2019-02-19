// export interface ResourceStates extends ResourceState {}

export interface ResourceState {
    // resources: Array<ResourceData>;
    data: any;
    loading: boolean;
    loaded: boolean;
    identity?: any;
    error: any;
}

export const ResourceInitial = {
    // resources: []
    data: [],
    loading: false,
    loaded: false,
    identity: null,
    error: null
};

export interface ResourceData {
  loading?: boolean;
  loaded?: boolean;
  data?: Array<any>;
  identity?: null;
  error?: any;
  effectId?: any;
}
