export interface IAction {
    /**
     * Action type string key name.
     */
    type: string;
}

export interface IResponse {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}

// Todo types
export * from './todos';
