export enum RedisDataType {
    String = 'string',
    Hash = 'hash',
    List = 'list',
    Set = 'set',
    SortedSet = 'sortedset'
}
export type KeyItem = {
    type: string,
    name: string
}
export type KeysList = Array<KeyItem>
