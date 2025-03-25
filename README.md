# BIRS Zoom Web Client

```
bash one liner

get file | parse meetingid password | open "link to zoom"

just found project from zoom (NOTE: need to publish to zoom marketplace and client needs approval from zoom to join meetings in other workplace spaces)

https://github.com/zoom/meetingsdk-headless-linux-sample
```

A browser-based Zoom meeting client built with the Zoom Web SDK.

## Overview

This application allows users to join Zoom meetings directly from a web browser without installing the Zoom desktop client. It's built using the Zoom Web SDK version 2.18.0.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Zoom Developer account
- SDK Key and Secret from the Zoom Marketplace

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/birsClient.git
cd birsClient
```

### 2. Install Dependencies

```bash
npm install express cors body-parser
```

### 3. Configure Your Zoom Credentials

Edit the `server.js` file to add your Zoom SDK credentials:

```javascript
const SDK_KEY = 'YOUR_SDK_KEY';
const SDK_SECRET = 'YOUR_SDK_SECRET';
```

Also update the `index.js` file to include your SDK Key:

```javascript
var sdkKey = "YOUR_SDK_KEY";
```

### 4. Start the Server

```bash
node server.js
```

This will start the server on port 4000.

### 5. Access the Application

Open your browser and navigate to:

```
http://localhost:4000
```

## Usage

1. Enter your display name
2. Enter the Zoom meeting number
3. Enter the meeting password if required
4. Click on the generated meeting link to join

## Project Structure

```
birsClient/
├── app/                  # Frontend web application
│   ├── js/               # JavaScript files
│   │   ├── index.js      # Entry point handling form input
│   │   ├── meeting.js    # Zoom meeting initialization
│   │   ├── tool.js       # Utility functions
│   │   └── vconsole.min.js # Console debugging tool
│   ├── index.html        # Landing page with meeting form
│   └── meeting.html      # Zoom meeting page
└── server.js             # Backend for Zoom SDK authentication
```

## Security Notes

- Always generate Zoom SDK signatures on the server-side
- Never expose your SDK Secret in client-side code
- Use HTTPS in production environments

## Customization

### Meeting Parameters

Default meeting parameters can be customized in `index.js`:

```javascript
var DISPLAY_NAME = "YourName";
var MEETING_NUMBER = 1234567890; 
var MEETING_PASSWORD = 'yourpassword';
```

### Localization

The application supports different languages. Modify the language in the dropdown menu or change the default in `index.js`:

```javascript
document.getElementById("meeting_lang").value = "fr-FR"; // For French
```

## Troubleshooting

### Common Issues

- **"Invalid Signature" error**: Check that your SDK Key and Secret are correct and that your server is generating signatures properly.

- **Audio/Video not working**: Ensure your browser has the necessary permissions to access your camera and microphone.

- **Browser Compatibility**: The Zoom Web SDK works best in Chrome, Firefox, and the new Microsoft Edge.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
