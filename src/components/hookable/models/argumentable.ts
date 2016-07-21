import {ArgumentableNext}   from './argumentable-next';

export interface Argumentable<T, U> extends ArgumentableNext<T, U> {
    pre?: Array<ArgumentableNext<T, U>>;
    post?: Array<ArgumentableNext<T, U>>;
    actor?: Array<ArgumentableNext<T, U>>;
}