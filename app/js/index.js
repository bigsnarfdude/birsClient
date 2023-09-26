window.addEventListener('DOMContentLoaded', function(event) {
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  
  ZoomMtg.preLoadWasm();
  var CLIENT_ID = "";
  var CLIENT_SECRET = "";
  var DISPLAY_NAME = "frank";
  var MEETING_NAME = 1234567890;
  var MEETING_PASSWORD = 'abc123';

  document.getElementById("display_name").value = DISPLAY_NAME; 
  document.getElementById("meeting_number").value = MEETING_NAME;
  document.getElementById("meeting_pwd").value    = MEETING_PASSWORD;
    document.getElementById("meeting_lang").value  = "en-US";
    document.getElementById("meeting_role").value = 0;

  document.getElementById("clear_all").addEventListener("click", function (e) {
    testTool.deleteAllCookies();
    document.getElementById("display_name").value = "";
    document.getElementById("meeting_number").value = "";
    document.getElementById("meeting_pwd").value = "";
    document.getElementById("meeting_lang").value = "en-US";
    document.getElementById("meeting_role").value = 0;
    window.location.href = "/index.html";
  });

  var meetingConfig = testTool.getMeetingConfig();

  var signature = ZoomMtg.generateSDKSignature({
      meetingNumber: meetingConfig.mn,
      sdkKey: CLIENT_ID,
      sdkSecret: CLIENT_SECRET,
      role: 0,
      success: function (res) {
        console.log(res.result);
        meetingConfig.signature = res.result;
        meetingConfig.sdkKey = CLIENT_ID;
        var joinUrl =
          testTool.getCurrentDomain() +
          "/meeting.html?" +
          testTool.serialize(meetingConfig);
      },
    });

  var joinUrl = testTool.getCurrentDomain() + "/meeting.html?" + testTool.serialize(meetingConfig);
  console.log(joinUrl)
  document.getElementById('meeting_email').value = JSON.stringify(joinUrl);
  document.getElementById("link").innerHTML = JSON.stringify(joinUrl);

}
