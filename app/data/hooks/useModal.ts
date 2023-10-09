import { useState } from "react"
// toggle, open, close
export default function useModal() {
    const [visible, setVisible] = useState(false)
    return [visible, () => { setVisible(!visible) }, () => { setVisible(true) }, () => { setVisible(false) }] as const;
}