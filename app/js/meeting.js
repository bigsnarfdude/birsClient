window.addEventListener('DOMContentLoaded', function(event) {
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  var tmpArgs = testTool.parseQuery();
  var meetingConfig = {
    sdkKey: tmpArgs.sdkKey,
    meetingNumber: tmpArgs.mn,
    userName: "frank",
    passWord: tmpArgs.pwd,
    leaveUrl: "/index.html",
    role: 0,
    userEmail: "",
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      disableCORP: !window.crossOriginIsolated, // default true
      externalLinkPage: './externalLinkPage.html',
      success: function () {
        ZoomMtg.i18n.load(meetingConfig.lang);
        ZoomMtg.i18n.reload(meetingConfig.lang);
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          sdkKey: meetingConfig.sdkKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUser", res.result.currentUser);
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('inMeetingServiceListener onUserJoin', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('inMeetingServiceListener onUserLeave', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });
  
    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      console.log('inMeetingServiceListener onMeetingStatus', data);
    });
  }

  beginJoin(meetingConfig.signature);
};
