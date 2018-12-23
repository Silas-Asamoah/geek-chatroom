import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { PusherServiceProvider } from "../../providers/pusher-service/pusher-service";
import { HttpClient } from "@angular/common/http";

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
            'username': 'geeksilas',
            'content': "I'm going to buy the Bose QC 35 11"
        },
        {
            'username': 'kwasi_gah',
            'content': "The Ewe gods gave me powers to climb mountains"
        }
    ];

    constructor(public navCtrl: NavController, private pusher: PusherServiceProvider, private http: HttpClient, public alertCtrl: AlertController) {
        let self = this
        this.presence_channel = this.pusher.init();

        //updates list of users online
        this.presence_channel.bind('pusher:subscription_succeeded', function (members) {
            console.log(members);
            self.users_online = members.members;
            self.current_user = members.myID;
        })


        this.presence_channel.bind('new-post', function (body) {
            self.post_list.unshift(body);
        })
    }
}

    isOnline(username: string) {
        // this function is responsible for determining if a user is online or not
        if (username in this.users_online) {
        return 'online'
        } else {
        return 'offline'
        }
    }

    submitPost() {
        let self = this;
        // make a post request to the server
        let body = {
        'username': this.current_user,
        'content': this.post.content
        }

        const alert = this.alertCtrl.create({
        title: 'Post Shared!',
        subTitle: `Users online to see your post: ${self.get_users_online()}`,
        buttons: ['OK']
        });

        // submit post to the backend server to trigger pusher event
        this.http.post('http://localhost:3128/create-post', body).subscribe(() => {
        alert.present();
        });
    }

    get_users_online() {
        return Object.keys(this.users_online).length - 1;
    }
    