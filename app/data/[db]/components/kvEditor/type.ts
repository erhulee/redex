export namespace Editor {
    export type EditorProps<T = any> = {
        type: string
        // 相当于编辑器的初始值
        value: T
        db: string
        keyName: string
        keyExpire: number
    }
    export type EditorController<T = any> = {
        handleChangeName: (name: string) => void
        handleChangeExpire: (expire: number) => void
        handleChangeValue: (value: T) => void
    }

    type BaseEditorProps<T> = EditorProps<T> & EditorController<T>
    type ListData = Array<{
        id: string
        value: string
    }>
    type HashData = Array<{
        id: string,
        field: string
        value: string
    }>

    export type StringEditorProps = Omit<BaseEditorProps<string>, "type">
    export type ListEditorProps = Omit<BaseEditorProps<ListData>, "type">
    export type HashEditorProps = Omit<BaseEditorProps<HashData>, "type">
}
