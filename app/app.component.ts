import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Label } from "ui/label";
import { View } from "ui/core/view";

export const slideIn = {
    translate: { x: 0, y: 0 },
    duration: 800
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    public counter: number = 16;
    public p1Health: number = 20;
    public p2Health: number = 20;
    @ViewChild("p1H") p1H: ElementRef;
    @ViewChild("p2H") p2H: ElementRef;

    constructor(private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        let p1H = <View>this.p1H.nativeElement;
        let p2H = <View>this.p2H.nativeElement;
        p1H.translateY = -2000;
        p2H.translateY = 2000;
        p1H.animate(slideIn);
        p2H.animate(slideIn);
    }

    public plusHealth(player) {
        console.log("Plus :D " + player);
        this[player]++;
    }

    public minusHealth(player) {
        console.log("Minus :( " + player);
        this[player]--;
    }
}
