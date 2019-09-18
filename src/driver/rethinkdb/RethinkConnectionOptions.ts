import { RPoolConnectionOptions } from 'rethinkdb-ts';
import { BaseConnectionOptions } from '../../connection/BaseConnectionOptions';

export interface RethinkConnectionOptions extends BaseConnectionOptions {
    /**
     * Database type.
     */
    readonly type: "rethinkdb";

    readonly rConnectionOptions: RPoolConnectionOptions;
}