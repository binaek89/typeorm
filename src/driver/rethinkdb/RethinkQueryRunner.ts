import { QueryRunner } from "../../query-runner/QueryRunner";
import { Connection } from '../../connection/Connection';
import { Broadcaster } from '../../subscriber/Broadcaster';
import { EntityManager } from '../../entity-manager/EntityManager';
import { ObjectLiteral } from '../../common/ObjectLiteral';
import { Table } from '../../schema-builder/table/Table';
import { View } from '../../schema-builder/view/View';

export class RethinkQueryRunner implements QueryRunner {
    connection: Connection;
    broadcaster: Broadcaster;
    manager: EntityManager;
    isReleased: boolean;
    isTransactionActive: boolean;
    data: ObjectLiteral;
    loadedTables: Table[];
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
    stream(query: string, parameters?: any[] | undefined, onEnd?: Function | undefined, onError?: Function | undefined): Promise<import("fs").ReadStream> {
        throw new Error("Method not implemented.");
    }
    getDatabases(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getSchemas(database?: string | undefined): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getTable(tablePath: string): Promise<import("../..").Table | undefined> {
        throw new Error("Method not implemented.");
    }
    getTables(tablePaths: string[]): Promise<import("../..").Table[]> {
        throw new Error("Method not implemented.");
    }
    getView(viewPath: string): Promise<import("../../schema-builder/view/View").View | undefined> {
        throw new Error("Method not implemented.");
    }
    getViews(viewPaths: string[]): Promise<import("../../schema-builder/view/View").View[]> {
        throw new Error("Method not implemented.");
    }
    hasDatabase(database: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasSchema(schema: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasTable(table: string | import("../..").Table): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    hasColumn(table: string | import("../..").Table, columnName: string): Promise<boolean> {
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
    createTable(table: import("../..").Table, ifNotExist?: boolean | undefined, createForeignKeys?: boolean | undefined, createIndices?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropTable(table: string | import("../..").Table, ifExist?: boolean | undefined, dropForeignKeys?: boolean | undefined, dropIndices?: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createView(view: import("../../schema-builder/view/View").View, oldView?: import("../../schema-builder/view/View").View | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropView(view: string | import("../../schema-builder/view/View").View): Promise<void> {
        throw new Error("Method not implemented.");
    }
    renameTable(oldTableOrName: string | import("../..").Table, newTableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addColumn(table: string | import("../..").Table, column: import("../..").TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addColumns(table: string | import("../..").Table, columns: import("../..").TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    renameColumn(table: string | import("../..").Table, oldColumnOrName: string | import("../..").TableColumn, newColumnOrName: string | import("../..").TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeColumn(table: string | import("../..").Table, oldColumn: string | import("../..").TableColumn, newColumn: import("../..").TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeColumns(table: string | import("../..").Table, changedColumns: { oldColumn: import("../..").TableColumn; newColumn: import("../..").TableColumn; }[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropColumn(table: string | import("../..").Table, column: string | import("../..").TableColumn): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropColumns(table: string | import("../..").Table, columns: import("../..").TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createPrimaryKey(table: string | import("../..").Table, columnNames: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updatePrimaryKeys(table: string | import("../..").Table, columns: import("../..").TableColumn[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropPrimaryKey(table: string | import("../..").Table): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUniqueConstraint(table: string | import("../..").Table, uniqueConstraint: import("../..").TableUnique): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUniqueConstraints(table: string | import("../..").Table, uniqueConstraints: import("../..").TableUnique[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropUniqueConstraint(table: string | import("../..").Table, uniqueOrName: string | import("../..").TableUnique): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropUniqueConstraints(table: string | import("../..").Table, uniqueConstraints: import("../..").TableUnique[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCheckConstraint(table: string | import("../..").Table, checkConstraint: import("../..").TableCheck): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCheckConstraints(table: string | import("../..").Table, checkConstraints: import("../..").TableCheck[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropCheckConstraint(table: string | import("../..").Table, checkOrName: string | import("../..").TableCheck): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropCheckConstraints(table: string | import("../..").Table, checkConstraints: import("../..").TableCheck[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createExclusionConstraint(table: string | import("../..").Table, exclusionConstraint: import("../..").TableExclusion): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createExclusionConstraints(table: string | import("../..").Table, exclusionConstraints: import("../..").TableExclusion[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropExclusionConstraint(table: string | import("../..").Table, exclusionOrName: string | import("../..").TableExclusion): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropExclusionConstraints(table: string | import("../..").Table, exclusionConstraints: import("../..").TableExclusion[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createForeignKey(table: string | import("../..").Table, foreignKey: import("../..").TableForeignKey): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createForeignKeys(table: string | import("../..").Table, foreignKeys: import("../..").TableForeignKey[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropForeignKey(table: string | import("../..").Table, foreignKeyOrName: string | import("../..").TableForeignKey): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropForeignKeys(table: string | import("../..").Table, foreignKeys: import("../..").TableForeignKey[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createIndex(table: string | import("../..").Table, index: import("../..").TableIndex): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createIndices(table: string | import("../..").Table, indices: import("../..").TableIndex[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropIndex(table: string | import("../..").Table, index: string | import("../..").TableIndex): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dropIndices(table: string | import("../..").Table, indices: import("../..").TableIndex[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    clearTable(tableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    enableSqlMemory(): void {
        throw new Error("Method not implemented.");
    }
    disableSqlMemory(): void {
        throw new Error("Method not implemented.");
    }
    clearSqlMemory(): void {
        throw new Error("Method not implemented.");
    }
    getMemorySql(): import("../SqlInMemory").SqlInMemory {
        throw new Error("Method not implemented.");
    }
    executeMemoryUpSql(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    executeMemoryDownSql(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}