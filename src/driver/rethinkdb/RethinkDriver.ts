import { Connection } from '../../connection/Connection';
import { Driver } from '../Driver';
import { RethinkConnectionOptions } from './RethinkConnectionOptions';
import { ColumnType } from '../types/ColumnTypes';
import { DataTypeDefaults } from '../types/DataTypeDefaults';
import { MappedColumnTypes } from '../types/MappedColumnTypes';
import { r, MasterPool } from "rethinkdb-ts"
import { SchemaBuilder } from '../../schema-builder/SchemaBuilder';
import { QueryRunner } from '../../query-runner/QueryRunner';
import { ObjectLiteral } from '../../common/ObjectLiteral';
import { ColumnMetadata } from '../../metadata/ColumnMetadata';
import { EntityMetadata } from '../../metadata/EntityMetadata';
import { TableColumn } from '../../schema-builder/table/TableColumn';
import { RethinkSchemaBuilder } from './RethinkSchemaBuilder';

export class RethinkDBDriver implements Driver {

    rConnectionPool: MasterPool;

    // -------------------------------------------------------------------------
    // Public Implemented Properties
    // -------------------------------------------------------------------------

    /**
     * Connection options.
     */
    options: RethinkConnectionOptions;

    /**
     * Master database used to perform all write queries.
     */
    database?: string;

    /**
     * Indicates if replication is enabled.
     */
    isReplicated: boolean = false;

    /**
     * Indicates if tree tables are supported by this driver.
     */
    treeSupport = false;

    /**
     * Mongodb does not need to have column types because they are not used in schema sync.
     */
    supportedDataTypes: ColumnType[] = [];

    /**
     * Gets list of spatial column data types.
     */
    spatialTypes: ColumnType[] = [];

    /**
     * Gets list of column data types that support length by a driver.
     */
    withLengthColumnTypes: ColumnType[] = [];

    /**
     * Gets list of column data types that support precision by a driver.
     */
    withPrecisionColumnTypes: ColumnType[] = [];

    /**
     * Gets list of column data types that support scale by a driver.
     */
    withScaleColumnTypes: ColumnType[] = [];

    /**
     * Mongodb does not need to have a strong defined mapped column types because they are not used in schema sync.
     */
    mappedDataTypes: MappedColumnTypes = {
        createDate: "int",
        createDateDefault: "",
        updateDate: "int",
        updateDateDefault: "",
        version: "int",
        treeLevel: "int",
        migrationId: "int",
        migrationName: "int",
        migrationTimestamp: "int",
        cacheId: "int",
        cacheIdentifier: "int",
        cacheTime: "int",
        cacheDuration: "int",
        cacheQuery: "int",
        cacheResult: "int",
        metadataType: "int",
        metadataDatabase: "int",
        metadataSchema: "int",
        metadataTable: "int",
        metadataName: "int",
        metadataValue: "int",
    };

    /**
     * Default values of length, precision and scale depends on column data type.
     * Used in the cases when length/precision/scale is not specified by user.
     */
    dataTypeDefaults: DataTypeDefaults;

    /**
     * No documentation specifying a maximum length for identifiers could be found
     * for MongoDB.
     */
    maxAliasLength?: number;

    /**
     * Performs connection to the database.
     */
    connect(): Promise<void> {
        return r.connectPool(this.options.rConnectionOptions)
            .then((pool) => { this.rConnectionPool = pool; })

        // return new Promise<void>((ok, fail) => {
        //     this.mongodb.MongoClient.connect(
        //         this.buildConnectionUrl(),
        //         this.buildConnectionOptions(),
        //         (err: any, client: any) => {
        //             if (err) return fail(err);

        //             this.queryRunner = new MongoQueryRunner(this.connection, client);
        //             ObjectUtils.assign(this.queryRunner, { manager: this.connection.manager });
        //             ok();
        //         });
        // });
    }

    afterConnect(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Closes connection with the database.
     */
    async disconnect(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Creates a schema builder used to build and sync a schema.
     */
    createSchemaBuilder(): SchemaBuilder {
        return new RethinkSchemaBuilder(this.connection);
    }

    createQueryRunner(mode: "master" | "slave"): QueryRunner {
        throw new Error("Method not implemented.");
    }

    /**
     * Replaces parameters in the given sql with special escaping character
     * and an array of parameter names to be passed to a query.
     */
    escapeQueryWithParameters(sql: string, parameters: ObjectLiteral, nativeParameters: ObjectLiteral): [string, any[]] {
        throw new Error(`This operation is not supported by Rethinkdb driver.`);
    }

    escape(name: string): string {
        throw new Error("Method not implemented.");
    }
    buildTableName(tableName: string, schema?: string | undefined, database?: string | undefined): string {
        throw new Error("Method not implemented.");
    }
    preparePersistentValue(value: any, column: ColumnMetadata) {
        throw new Error("Method not implemented.");
    }
    prepareHydratedValue(value: any, column: ColumnMetadata) {
        throw new Error("Method not implemented.");
    }
    normalizeType(column: { type?: string | BooleanConstructor | DateConstructor | NumberConstructor | StringConstructor | undefined; length?: string | number | undefined; precision?: number | null | undefined; scale?: number | undefined; isArray?: boolean | undefined; }): string {
        throw new Error("Method not implemented.");
    }
    normalizeDefault(columnMetadata: ColumnMetadata): string {
        throw new Error("Method not implemented.");
    }
    normalizeIsUnique(column: ColumnMetadata): boolean {
        throw new Error("Method not implemented.");
    }
    getColumnLength(column: ColumnMetadata): string {
        throw new Error("Method not implemented.");
    }
    createFullType(column: import("../..").TableColumn): string {
        throw new Error("Method not implemented.");
    }
    obtainMasterConnection(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    obtainSlaveConnection(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    createGeneratedMap(metadata: EntityMetadata, insertResult: any): ObjectLiteral | undefined {
        throw new Error("Method not implemented.");
    }
    findChangedColumns(tableColumns: TableColumn[], columnMetadatas: ColumnMetadata[]): ColumnMetadata[] {
        throw new Error("Method not implemented.");
    }
    isReturningSqlSupported(): boolean {
        throw new Error("Method not implemented.");
    }
    isUUIDGenerationSupported(): boolean {
        throw new Error("Method not implemented.");
    }
    createParameter(parameterName: string, index: number): string {
        throw new Error("Method not implemented.");
    }
    constructor(protected connection: Connection) { }
}