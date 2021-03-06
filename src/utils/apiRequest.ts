/* eslint-disable no-case-declarations */
import EventBus from './eventbus';
import { EVENTS } from '../constants';

type ApiMethod = "GET" | "POST" | "DELETE";
interface ApiOptions {
    method?: ApiMethod,
    body?: any;
    headers?: Record<string, string>;
    credentials?: RequestCredentials,
}

const DEFAULT_SETTINGS: ApiOptions = {
    method: 'GET',
    credentials: 'include',
}

export const ApiRequest = (path: string, callback: (response: any) => void, options?: ApiOptions, failureCb?: () => void) => {
    const requestOptions = { ...DEFAULT_SETTINGS, ...options };
    fetch(`${process.env.REACT_APP_URL_ROOT}${path}`, requestOptions).then(res => {
        if(res.status >= 200 && res.status < 300) {
            res.json().then(response => {
                callback(response);
            });
        } else {
            res.json().then(response => {
                switch(res.status) {
                    case 403:
                        EventBus.trigger(EVENTS.NAVIGATE, '/login');
                        break;
                    default:
                        const message = response?.error || response?.msg || "Api Error";
                        EventBus.trigger(EVENTS.API_ERROR_DISPLAY, message);
                        failureCb && failureCb();
                        break;
                }
                throw Error("Failed Api Call")
            });
        }
    }).catch(err => {
        EventBus.trigger(EVENTS.API_ERROR)
        if(failureCb) {
            failureCb();
        }
    });
}
