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
    dialog.style.top = `${(top + window.scrollY) - 30}px`
    dialog.style.backgroundColor = "#6367FF"
    dialog.style.width = `auto` // ${width}px
    dialog.style.height = `30px` // !!! Not for multiline yet
    dialog.innerText = "loading..."
    dialog.setAttribute("id", `explain_${uid}`)
    document.body.appendChild(dialog)

    return uid
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action == "explain") {
        if (message?.progress == "sending") {
            const uid = createLoadingDialog()
            sendResponse({ uid })
        } else if (message?.progress == "done") {

        }
    }
    return true
})