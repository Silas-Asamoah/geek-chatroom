import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";

@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage {
    //New post by user
    post: any = {};
    //Pusher presence channel
    presence_channel: any;
    //username of current user
    current_user;
    //list of users online
    users_online = {};
    //list of default posts
    post_list = [
        {
            'username': geeksilas,
            'content': "I'm going to buy the Bose QC 35 11"
        },
        {
            'username': kwasi_gah,
            'content': "The Ewe gods gave me powers to climb mountains"
        }
    ];
}