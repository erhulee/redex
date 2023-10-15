import { useState } from "react"
const prefix = "__redex__";
import { isEqual } from "lodash-es"
function useLocalSetting<T>(defaultValue: T, key: string): [T, (value: T) => void] {
    const [setting, setSetting] = useState(defaultValue);
    const settingJSON = localStorage.getItem(`${prefix}${key}`);
    const changeSetting = (value: T) => {
        const json = JSON.stringify(value);
        setSetting(value);
        localStorage.setItem(`${prefix}${key}`, json)
    }

    if (settingJSON != undefined) {
        try {
            const settingObj = JSON.parse(settingJSON);
            if (!isEqual(settingObj, setting)) {
                setSetting(settingObj)
            }
        } catch {
            console.log("[inner] parse local setting error")
        }
    } else {
        const json = JSON.stringify(defaultValue);
        localStorage.setItem(`${prefix}${key}`, json)
    }


    return [setting, changeSetting]
}

export default useLocalSetting