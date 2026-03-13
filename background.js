let currentTabId = 0

const explain = async (selectionText) => {
    const { uid } = await chrome.tabs.sendMessage(currentTabId, { action: "explain", progress: "sending" })
    const req = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
        method: "POST",
        headers: {
            'Authorization': "Bearer sk-hc-x",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
                { role: "user", content: `Explain the following ${selectionText.includes(" ") ? "sentence" : "word"} briefly and clearly (no unnecessary details): "${selectionText}".` }
            ]
        }),
    })
    const res = await req.json()

    await chrome.tabs.sendMessage(currentTabId, { action: "explain", progress: "done", content: res["choices"][0]["message"]["content"], uid })
}


chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    if (menuItemId == "explain") {
        explain(selectionText)
    }
})

chrome.contextMenus.create({
    title: "Explain it",
    contexts: ["selection"],
    id: "explain"
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo?.status == "complete") currentTabId = tabId
})