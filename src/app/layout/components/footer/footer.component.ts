import { Component, OnInit } from "@angular/core";

@Component({
    selector: "footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
    currentYear: number;

    /**
     * Constructor
     */
    constructor() {}

    ngOnInit() {
        let today = new Date();
        this.currentYear = today.getFullYear();
    }
}
