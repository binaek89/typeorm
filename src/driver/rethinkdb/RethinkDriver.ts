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
import { ApplyValueTransformers } from '../../util/ApplyValueTransformers';
import { RethinkQueryRunner } from './RethinkQueryRunner';
import { ObjectUtils } from '../../util/ObjectUtils';

export class RethinkDBDriver implements Driver {

    rConnectionPool: MasterPool;
    queryRunner: QueryRunner;

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
            .then((pool) => {
                this.rConnectionPool = pool;
                this.queryRunner = new RethinkQueryRunner(this.connection);
                ObjectUtils.assign(this.queryRunner, { manager: this.connection.manager });
            });
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

    /**
     * Creates a query runner used to execute database queries.
     */
    createQueryRunner(mode: "master" | "slave" = "master") {
        return this.queryRunner!;
    }

    /**
     * Replaces parameters in the given sql with special escaping character
     * and an array of parameter names to be passed to a query.
     */
    escapeQueryWithParameters(sql: string, parameters: ObjectLiteral, nativeParameters: ObjectLiteral): [string, any[]] {
        throw new Error(`This operation is not supported by Rethinkdb driver.`);
    }

    /**
     * Escapes a column name.
     */
    escape(columnName: string): string {
        return columnName;
    }


    /**
     * Build full table name with database name, schema name and table name.
     * E.g. "myDB"."mySchema"."myTable"
     */
    buildTableName(tableName: string, schema?: string, database?: string): string {
        return tableName;
    }

    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    preparePersistentValue(value: any, columnMetadata: ColumnMetadata): any {
        if (columnMetadata.transformer)
            value = ApplyValueTransformers.transformTo(columnMetadata.transformer, value);
        return value;
    }

    /**
     * Prepares given value to a value to be persisted, based on its column type or metadata.
     */
    prepareHydratedValue(value: any, columnMetadata: ColumnMetadata): any {
        if (columnMetadata.transformer)
            value = ApplyValueTransformers.transformFrom(columnMetadata.transformer, value);
        return value;
    }

    /**
     * Creates a database type from a given column metadata.
     */
    normalizeType(column: { type?: ColumnType, length?: number | string, precision?: number | null, scale?: number }): string {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Normalizes "default" value of the column.
     */
    normalizeDefault(columnMetadata: ColumnMetadata): string {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Normalizes "isUnique" value of the column.
     */
    normalizeIsUnique(column: ColumnMetadata): boolean {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Calculates column length taking into account the default length values.
     */
    getColumnLength(column: ColumnMetadata): string {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Normalizes "default" value of the column.
     */
    createFullType(column: TableColumn): string {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Obtains a new database connection to a master server.
     * Used for replication.
     * If replication is not setup then returns default connection's database connection.
     */
    obtainMasterConnection(): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Obtains a new database connection to a slave server.
     * Used for replication.
     * If replication is not setup then returns master (default) connection's database connection.
     */
    obtainSlaveConnection(): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Creates generated map of values generated or returned by database after INSERT query.
     */
    createGeneratedMap(metadata: EntityMetadata, insertedId: any) {
        return metadata.objectIdColumn!.createValueMap(insertedId);
    }

    /**
     * Differentiate columns of this table and columns from the given column metadatas columns
     * and returns only changed.
     */
    findChangedColumns(tableColumns: TableColumn[], columnMetadatas: ColumnMetadata[]): ColumnMetadata[] {
        throw new Error(`MongoDB is schema-less, not supported by this driver.`);
    }

    /**
     * Returns true if driver supports RETURNING / OUTPUT statement.
     */
    isReturningSqlSupported(): boolean {
        return false;
    }

    /**
     * Returns true if driver supports uuid values generation on its own.
     */
    isUUIDGenerationSupported(): boolean {
        return true;
    }
    /**
     * Creates an escaped parameter.
     */
    createParameter(parameterName: string, index: number): string {
        return "";
    }
    constructor(protected connection: Connection) { }
}