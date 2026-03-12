chrome.contextMenus.create({
    title: "Explain it",
    contexts: ["selection"],
    id: "explain"
});

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    if(menuItemId == "explain"){
        console.log(selectionText)
    }
})