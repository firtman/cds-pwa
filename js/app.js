window.addEventListener("DOMContentLoaded", init);

async function init() {
    let res = await fetch("/data/activities.json");
    let data = await res.json();

    document.title = data.title;
    document.querySelector("h1").innerHTML = data.title;

    let shortcuts = [];
    for (let activity of data.activities) {
        if ("type" in activity && handlers[activity.type]) {
            // Get an activity's shorcut handler for the current type
            let handler = handlers[activity.type];
            let shortcut = handler.parse(activity);
            let html = `
                <li><a href="${shortcut.url}">
                    <i class="material-icons">${shortcut.icon}</i>
                    <p>${shortcut.name}</p>
                </a></li>
            `;
            shortcuts.push(html);
        } else {
            console.log(`Error parsing activity '${activity.type}'`)
        }
    }
    document.querySelector("#shortcuts").innerHTML = shortcuts.join("");
}