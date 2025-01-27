import { convertToJson } from "./utils.mjs";


export default class Alert {
    async init() {
        this.alerts = await fetch("/json/alerts.json").then(convertToJson);
        
        if (this.alerts.length) {
            const section = document.createElement("section");

            this.alerts.forEach(alert => {
                const p = document.createElement("p");

                p.textContent = alert.message;
                p.style.backgroundColor = alert.background;
                p.style.color = alert.color;
                p.style.textAlign = "center";

                section.appendChild(p);
            })

            document.querySelector("main").insertAdjacentElement("beforebegin", section);
        }
    }
}