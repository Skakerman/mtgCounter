import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Page } from "ui/page";
import { Label } from "ui/label";
import { View } from "ui/core/view";
import { alert } from "ui/dialogs";
import { GestureTypes, SwipeGestureEventData } from "ui/gestures";


export const slideIn = {
    translate: { x: 0, y: 0 },
    duration: 800
}

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    public p1Health: number;
    public p1HealthOld: number;
    public p2Health: number;
    public p2HealthOld: number;
    public isWaiting;
    public changeLog: Array<string>;
    @ViewChild("p1H") p1H: ElementRef;
    @ViewChild("p2H") p2H: ElementRef;

    constructor(private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.p1Health = 20;
        this.p1HealthOld = 20;
        this.p2Health = 20;
        this.p2HealthOld = 20;
        this.changeLog = ["The game has begun!"];
        this.coolSlideIn();
    }

    coolSlideIn() {
        let p1H = <View>this.p1H.nativeElement;
        let p2H = <View>this.p2H.nativeElement;
        p1H.translateY = -2000;
        p2H.translateY = 2000;
        p1H.animate(slideIn);
        p2H.animate(slideIn);
    }

    restartGame() {
        this.ngOnInit();
    }

    public logChange(player: string) {
        let playerName = this.getPlayer(player);
        // console.log("Logging change!");
        let delta =  this[player+"Old"] - this[player];
        if (delta === 0) {
            return;
        }
        let logMessage = "logMessage";
        if (delta > 0) {
            logMessage = (playerName + " took " + Math.abs(delta) + " damage");
        } else if (delta < 0) {
            logMessage = (playerName + " gained " + Math.abs(delta) + " life");
        }
        console.log(logMessage);
        this.changeLog.push(logMessage);
        console.log(this.changeLog);
        this[player+"Old"] = this[player];
    }

    public checkHealth(player: string) {
        let playerName = this.getPlayer(player);
        // console.log("Checking Health");
        if (this[player] <= 0) {
            console.log(playerName + " is dead!");
            clearTimeout(this.isWaiting);
            this.logChange(player);
            alert({
                title: "Game over",
                message: playerName + " has lost!",
                okButtonText: "Start new game"
            }).then(() => {
                this.restartGame();
            });
        }
    }

    public changeHealth(player: string, change: string) {
        clearTimeout(this.isWaiting);
        if (change === 'plus') {
            // console.log("Plus :D " + player);
            this[player]++;
        } else if (change === 'minus') {
            // console.log("Minus :( " + player);
            this[player]--;
        }
        this.checkHealth(player);
        this.isWaiting = setTimeout(() => this.logChange(player), 3000);
    }

    public getPlayer(player: string) {
        let playerName = "Unknown Player";
        if (player.indexOf("p1") !== -1) {
            playerName = "Player 1";
        } else {
            playerName = "Player 2";
        }
        return playerName;
    }

}
