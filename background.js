chrome.contextMenus.create({
    title: "Explain it",
    contexts: ["selection"],
    id: "explain"
});

const explain = async (selectionText) => {
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
    console.log(res["choices"][0]["message"]["content"])
}

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    if (menuItemId == "explain") {
        explain(selectionText)
    }
})