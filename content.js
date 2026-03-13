const createLoadingDialog = () => {
    const uid = Math.floor(Math.random() * 100000)
    const selection = window.getSelection()
    if (!selection.rangeCount || selection.toString().length == 0) return
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    let { left, right, top } = rect // , width, height
    right = window.innerWidth - right
    const [smallerXSide, biggerXSide] = [left, right].sort((a, b) => a - b)
    const smallerXSideName = smallerXSide == left ? "left" : "right"

    const dialog = document.createElement("div")
    dialog.style.position = "absolute"
    dialog.style.top = `${(top + window.scrollY) - 35}px`
    dialog.style.borderRadius = "7px"
    dialog.style.display = "flex"
    dialog.style.alignItems = "center"
    dialog.style.padding = "4px"
    dialog.style.backgroundColor = "#6367FF"
    dialog.style.maxWidth = `60vw`
    dialog.style.minHeight = `30px`
    dialog.innerText = "loading..."
    dialog.style.left = `${(left + window.scrollX) - (dialog.offsetWidth / 2)}px`
    dialog.setAttribute("id", `explain_${uid}`)
    document.body.appendChild(dialog)
    return [uid, smallerXSide, smallerXSideName]
}

const updateDialogWithTxt = (explanation, uid, smallerXSide, smallerXSideName) => {
    const dialog = document.getElementById(`explain_${uid}`)
    dialog.innerText = explanation
    const defaultTop = parseInt((dialog.style.top).replace("px", ""))

    dialog.style.left = null // resetting
    dialog.style[smallerXSideName] = `${smallerXSide - (dialog.offsetWidth / 2.1)}px`

    dialog.style.top = `${defaultTop - (dialog.offsetHeight - 35)}px`
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action == "explain") {
        if (message?.progress == "sending") {
            const [uid, smallerXSide, smallerXSideName] = createLoadingDialog()
            sendResponse({ uid, smallerXSide, smallerXSideName })
        } else if (message?.progress == "done") {
            updateDialogWithTxt(message?.content, message?.uid, message?.smallerXSide, message?.smallerXSideName)
        }
    }
    return true
})