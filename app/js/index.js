window.addEventListener('DOMContentLoaded', function(event) {
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  
  // New Zoom SDK initialization approach
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();
  
  // Configuration variables
  var sdkKey = "";
  var DISPLAY_NAME = "frank";
  var MEETING_NUMBER = 1234567890;
  var MEETING_PASSWORD = 'abc123';
  var userEmail = "";
  var registrantToken = "";
  var zakToken = "";
  var role = 0;
  var leaveUrl = "/index.html";

  // Set form field values
  document.getElementById("display_name").value = DISPLAY_NAME; 
  document.getElementById("meeting_number").value = MEETING_NUMBER;
  document.getElementById("meeting_pwd").value = MEETING_PASSWORD;
  document.getElementById("meeting_lang").value = "en-US";
  document.getElementById("meeting_role").value = role;

  // Clear button event listener
  document.getElementById("clear_all").addEventListener("click", function (e) {
    testTool.deleteAllCookies();
    document.getElementById("display_name").value = "";
    document.getElementById("meeting_number").value = "";
    document.getElementById("meeting_pwd").value = "";
    document.getElementById("meeting_lang").value = "en-US";
    document.getElementById("meeting_role").value = 0;
    window.location.href = "/index.html";
  });

  // Get meeting config from form
  var meetingConfig = testTool.getMeetingConfig();
  
  // This function would normally call your server endpoint to get a signature
  // For demonstration, we're creating a mock signature without a server call
  // In production, replace this with a proper server call as shown in the Zoom sample
  function getSignature() {
    // Mock signature generation (insecure, for demonstration only)
    // In production, this should be a server call to generate the signature
    var signature = ZoomMtg.generateSDKSignature({
      meetingNumber: meetingConfig.mn,
      sdkKey: sdkKey,
      role: meetingConfig.role,
    });
    
    meetingConfig.signature = signature;
    meetingConfig.sdkKey = sdkKey;
    
    // Create and display the meeting URL
    var joinUrl = testTool.getCurrentDomain() + "/meeting.html?" + testTool.serialize(meetingConfig);
    console.log(joinUrl);
    document.getElementById('meeting_email').value = JSON.stringify(joinUrl);
    document.getElementById("link").innerHTML = JSON.stringify(joinUrl);
  }
  
  // Generate the signature
  getSignature();
}
