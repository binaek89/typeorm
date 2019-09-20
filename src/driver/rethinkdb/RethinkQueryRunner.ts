import { QueryRunner } from "../../query-runner/QueryRunner";
import { Connection } from '../../connection/Connection';
import { Broadcaster } from '../../subscriber/Broadcaster';
import { EntityManager } from '../../entity-manager/EntityManager';
import { ObjectLiteral } from '../../common/ObjectLiteral';
import { Table } from '../../schema-builder/table/Table';
import { View } from '../../schema-builder/view/View';
import { ReadStream } from 'fs';
import { TableColumn } from '../../schema-builder/table/TableColumn';
import { SqlInMemory } from '../SqlInMemory';
import { TableIndex } from '../../schema-builder/table/TableIndex';
import { TableForeignKey } from '../../schema-builder/table/TableForeignKey';
import { TableExclusion } from '../../schema-builder/table/TableExclusion';
import { TableUnique } from '../../schema-builder/table/TableUnique';
import { TableCheck } from '../../schema-builder/table/TableCheck';
import { r } from 'rethinkdb-ts';

export class RethinkQueryRunner implements QueryRunner {

    // -------------------------------------------------------------------------
    // Public Implemented Properties
    // -------------------------------------------------------------------------

    /**
     * Connection used by this query runner.
     */
    connection: Connection;

    /**
     * Broadcaster used on this query runner to broadcast entity events.
     */
    broadcaster: Broadcaster;

    /**
     * Entity manager working only with current query runner.
     */
    manager: EntityManager;

    /**
     * Indicates if connection for this query runner is released.
     * Once its released, query runner cannot run queries anymore.
     * Always false for mongodb since mongodb has a single query executor instance.
     */
    isReleased = false;

    /**
     * Indicates if transaction is active in this query executor.
     * Always false for mongodb since mongodb does not support transactions.
     */
    isTransactionActive = false;

    /**
     * Stores temporarily user data.
     * Useful for sharing data with subscribers.
     */
    data = {};

    /**
     * All synchronized tables in the database.
     */
    loadedTables: Table[];

    /**
     * All synchronized views in the database.
     */
    loadedViews: View[];

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(connection: Connection) {
        this.connection = connection;
        this.broadcaster = new Broadcaster(this);
    }

    connect(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    release(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    clearDatabase(database?: string | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    startTransaction(isolationLevel?: "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE" | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    commitTransaction(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    rollbackTransaction(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    query(query: string, parameters?: any[] | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
    stream(query: string, parameters?: any[] | undefined, onEnd?: Function | undefined, onError?: Function | undefined): Promise<ReadStream> {
        throw new Error("Method not implemented.");
    }
    getDatabases(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getSchemas(database?: string | undefined): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getTable(tablePath: string): Promise<Table | undefined> {
        throw new Error("Method not implemented.");
    }
    getTables(tablePaths: string[]): Promise<Table[]> {
        throw new Error("Method not implemented.");
    }
    getView(viewPath: string): Promise<View | undefined> {
        throw new Error("Method not implemented.");
    }
    getViews(viewPaths: string[]): Promise<View[]> {
        throw new Error("Method not implemented.");
    }
    hasDatabase(database: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasSchema(schema: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasTable(table: string | Table): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasColumn(table: string | Table, columnName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createDatabase(database: string, ifNotExist?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropDatabase(database: string, ifExist?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createSchema(schemaPath: string, ifNotExist?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropSchema(schemaPath: string, ifExist?: boolean | undefined, isCascade?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createTable(table: Table, ifNotExist?: boolean | undefined, createForeignKeys?: boolean | undefined, createIndices?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropTable(table: string | Table, ifExist?: boolean | undefined, dropForeignKeys?: boolean | undefined, dropIndices?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createView(view: View, oldView?: View | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropView(view: string | View): Promise<void> {
        throw new Error("Method not implemented.");
    }
    renameTable(oldTableOrName: string | Table, newTableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addColumn(table: string | Table, column: TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addColumns(table: string | Table, columns: TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    renameColumn(table: string | Table, oldColumnOrName: string | TableColumn, newColumnOrName: string | TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeColumn(table: string | Table, oldColumn: string | TableColumn, newColumn: TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeColumns(table: string | Table, changedColumns: { oldColumn: TableColumn; newColumn: TableColumn; }[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropColumn(table: string | Table, column: string | TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropColumns(table: string | Table, columns: TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createPrimaryKey(table: string | Table, columnNames: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updatePrimaryKeys(table: string | Table, columns: TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropPrimaryKey(table: string | Table): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUniqueConstraint(table: string | Table, uniqueConstraint: TableUnique): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUniqueConstraints(table: string | Table, uniqueConstraints: TableUnique[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropUniqueConstraint(table: string | Table, uniqueOrName: string | TableUnique): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropUniqueConstraints(table: string | Table, uniqueConstraints: TableUnique[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCheckConstraint(table: string | Table, checkConstraint: TableCheck): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCheckConstraints(table: string | Table, checkConstraints: TableCheck[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropCheckConstraint(table: string | Table, checkOrName: string | TableCheck): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropCheckConstraints(table: string | Table, checkConstraints: TableCheck[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createExclusionConstraint(table: string | Table, exclusionConstraint: TableExclusion): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createExclusionConstraints(table: string | Table, exclusionConstraints: TableExclusion[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropExclusionConstraint(table: string | Table, exclusionOrName: string | TableExclusion): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropExclusionConstraints(table: string | Table, exclusionConstraints: TableExclusion[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createForeignKey(table: string | Table, foreignKey: TableForeignKey): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createForeignKeys(table: string | Table, foreignKeys: TableForeignKey[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropForeignKey(table: string | Table, foreignKeyOrName: string | TableForeignKey): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropForeignKeys(table: string | Table, foreignKeys: TableForeignKey[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createIndex(table: string | Table, index: TableIndex): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createIndices(table: string | Table, indices: TableIndex[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropIndex(table: string | Table, index: string | TableIndex): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropIndices(table: string | Table, indices: TableIndex[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /**
     * Drops collection.
     */
    async clearTable(tableName: string): Promise<void> {
        return r.db(this.connection.driver.database + "").table(tableName).delete().run().then(() => { });
    }

    /**
     * Enables special query runner mode in which sql queries won't be executed,
     * instead they will be memorized into a special variable inside query runner.
     * You can get memorized sql using getMemorySql() method.
     */
    enableSqlMemory(): void {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }

    /**
     * Disables special query runner mode in which sql queries won't be executed
     * started by calling enableSqlMemory() method.
     *
     * Previously memorized sql will be flushed.
     */
    disableSqlMemory(): void {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }

    /**
     * Flushes all memorized sqls.
     */
    clearSqlMemory(): void {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }

    /**
     * Gets sql stored in the memory. Parameters in the sql are already replaced.
     */
    getMemorySql(): SqlInMemory {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }

    /**
     * Executes up sql queries.
     */
    async executeMemoryUpSql(): Promise<void> {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }

    /**
     * Executes down sql queries.
     */
    async executeMemoryDownSql(): Promise<void> {
        throw new Error(`This operation is not supported by MongoDB driver.`);
    }


}