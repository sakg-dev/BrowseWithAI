const createLoadingDialog = () => {
    const uid = Math.floor(Math.random() * 100000)
    const selection = window.getSelection()
    if (!selection.rangeCount || selection.toString().length == 0) return
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const { left, top } = rect // , width, height

    const dialog = document.createElement("div")
    dialog.style.position = "absolute"
    dialog.style.left = `${left + window.scrollX}px`
    dialog.style.top = `${(top + window.scrollY) - 35}px`
    dialog.style.borderRadius = "7px"
    dialog.style.display = "flex"
    dialog.style.alignItems = "center"
    dialog.style.padding = "4px"
    dialog.style.backgroundColor = "#6367FF"
    dialog.style.width = `auto` // ${width}px
    dialog.style.minHeight = `30px` // !!! Not for multiline yet
    dialog.innerText = "loading..."
    dialog.setAttribute("id", `explain_${uid}`)
    document.body.appendChild(dialog)
    return uid
}

const updateDialogWithTxt = (explanation, uid) => {
    const dialog = document.getElementById(`explain_${uid}`)
    dialog.innerText = explanation
    const defaultTop = parseInt((dialog.style.top).replace("px", ""))
    dialog.style.top = `${defaultTop - (dialog.offsetHeight - 35)}px`
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action == "explain") {
        if (message?.progress == "sending") {
            const uid = createLoadingDialog()
            sendResponse({ uid })
        } else if (message?.progress == "done") {
            updateDialogWithTxt(message?.content, message?.uid)
        }
    }
    return true
})