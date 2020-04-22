import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from 'zoomus-jssdk';
import * as $ from 'jquery';

ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib', '/av')
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoom-websdk-sample-app';
  // signature: any;

  meetConfig = {
    apiKey: 'vND0q119T3aK-boGkJ8zXg',
    apiSecret: 'kSjS6CYagGsOiWXDQ3Qg5H8aLJk72HXjwvbR',
    meetingNumber: 72469055409,
    userName: 'smiftakhairul',
    passWord: "123456",
    leaveUrl: "http://localhost:4200",
    role: 1
  };

  signature: any;

  constructor() {

  }

  ngOnInit() {
    console.log('OnInit fired');

    this.signature = ZoomMtg.generateSignature({
      apiKey: this.meetConfig.apiKey,
      apiSecret: this.meetConfig.apiSecret,
      meetingNumber: this.meetConfig.meetingNumber,
      role: this.meetConfig.role,
      success: function(res){
        console.log(res.result);
      }
    });

    ZoomMtg.init({
      leaveUrl: 'http://localhost:4200',
      isSupportAV: true,
      success: (res) => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          signature: this.signature,
          apiKey: this.meetConfig.apiKey,
          userEmail: 's.m.iftakhairul@gmail.com',
          passWord: this.meetConfig.passWord,
          success: (res) => {
            console.log('join meeting success');
          },
          error: (res) => {
            console.log(res);
          }
        });
      },
      error: (res) => {
        console.log(res);
      }
    });
  }
}
