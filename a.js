// (async () => {
//     const req = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             'Authorization': "Bearer sk-hc-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//             'Content-Type': "application/json"
//         },
//         body: JSON.stringify({
//             model: "google/gemini-2.5-flash",
//             messages: [
//                 { "role": "user", "content": "Hello!" }
//             ]
//         }),
//     })
//     const res = await req.json()
//     console.log(res["choices"][0]["message"]["content"])
// })()