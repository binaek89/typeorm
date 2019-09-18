import { SchemaBuilder } from '../../schema-builder/SchemaBuilder';
import { SqlInMemory } from '../SqlInMemory';
import { Connection } from '../../connection/Connection';

export class RethinkSchemaBuilder implements SchemaBuilder {
    constructor(protected connection: Connection) { }
    build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    log(): Promise<SqlInMemory> {
        throw new Error("Method not implemented.");
    }
}