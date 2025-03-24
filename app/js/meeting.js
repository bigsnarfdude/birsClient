window.addEventListener('DOMContentLoaded', function(event) {
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  var tmpArgs = testTool.parseQuery();
  
  // Parse meeting parameters from URL
  var meetingConfig = {
    sdkKey: tmpArgs.sdkKey,
    meetingNumber: tmpArgs.mn,
    userName: tmpArgs.name || "frank",
    passWord: tmpArgs.pwd,
    leaveUrl: "/index.html",
    role: parseInt(tmpArgs.role, 10) || 0,
    userEmail: tmpArgs.email || "",
    lang: tmpArgs.lang || "en-US",
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  // Initialize Zoom SDK with new approach
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();

  // Begin joining the meeting
  function startMeeting(signature) {
    // Make the Zoom meeting root element visible
    if (document.getElementById('zmmtg-root')) {
      document.getElementById('zmmtg-root').style.display = 'block';
    }
    
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      patchJsMedia: true,
      leaveOnPageUnload: true,
      success: function () {
        // Load language
        ZoomMtg.i18n.load(meetingConfig.lang);
        ZoomMtg.i18n.reload(meetingConfig.lang);
        
        // Join the meeting
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          sdkKey: meetingConfig.sdkKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("Successfully joined the meeting", res);
            // Get attendees list
            ZoomMtg.getAttendeeslist({});
            // Get current user info
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("Current user info:", res.result.currentUser);
              },
            });
          },
          error: function (res) {
            console.log("Failed to join the meeting", res);
          },
        });
      },
      error: function (res) {
        console.log("Failed to initialize Zoom SDK", res);
      },
    });
  }
  
  // Set up meeting event listeners
  ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
    console.log('User joined:', data);
  });

  ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
    console.log('User left:', data);
  });

  ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
    console.log('User in waiting room:', data);
  });

  ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
    console.log('Meeting status changed:', data);
  });

  // Start the meeting with the signature from URL parameters
  startMeeting(meetingConfig.signature);
}
