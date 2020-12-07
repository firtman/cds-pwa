
class ShortcutHandler {
    constructor(defaultIcon, pattern, variables) {
        this.defaultIcon = defaultIcon;
        this.pattern = pattern;
        this.variables = variables;
    }
    parse(activity) {
        // URL parsing, replacing each variable with its value
        let url = this.pattern;
        for (let variable of this.variables) {
            url = url.replace("$"+variable, activity[variable] || "");
            if ('standalone' in navigator) {
                // Hack for Apple Maps on iOS/iPadOS - we replace maps.google.com with maps.apple.com
                url = url.replace("maps.google.com", "maps.apple.com");
            }
        }
        return {
            url,
            name: activity.name,
            icon: activity.icon || this.defaultIcon
        }
    }
}

let handlers = {
    "link": new ShortcutHandler("public", "$url", ["url"]),
    "phonecall": new ShortcutHandler("local_phone", "tel:$phone", ["phone"]),
    "message": new ShortcutHandler("sms", "sms:$to?body=$body", ["to", "body"]),
    "whatsapp": new ShortcutHandler("chat", "https://wa.me/$to?text=$body", ["to", "body"]),
    "maps": new ShortcutHandler("map", "https://maps.google.com/?q=$place", ["place"]),
    "navigation": new ShortcutHandler("directions", "https://maps.google.com/?saddr=$from&daddr=$to", ["from", "to"]),
    "navigation-walk": new ShortcutHandler("directions_walk", "https://maps.google.com/?saddr=$from&daddr=$to&dirflg=w", ["from", "to"]),
    "navigation-transit": new ShortcutHandler("commute", "https://maps.google.com/?saddr=$from&daddr=$to&dirflg=r", ["from", "to"]),
    "uber": new ShortcutHandler("local_taxi", "https://m.uber.com/ul/?action=setPickup&client_id=&&pickup=my_location&dropoff[formatted_address]$to", ["to"]),
}
