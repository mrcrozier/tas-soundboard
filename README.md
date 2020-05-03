
# Soundboard PWA 🔈🔉🔊

React to the perfect moment with the perfect sound, quickly and easily by installing on your mobile device as a PWA! Or, just use the website as is, I'm a readme not a cop.  

# Introduction
Another project I built for fun, my coworkers and I always reference a lot of memes so I thought making a soundboard for the office favs would be a good little side project.

Tech used: Angular for making it a PWA and component interaction, Nebular for the styling, Firebase for all the No-SQL database and hosting needs

Note: Offline caching seems to work on Android PWA but not the iOS PWA. Will look into it if I have time/there is interest in me fixing it.  

# Install as a mobile application  

#### On iOS

With **Safari** (has to be Safari unfortunately), [navigate to the website](https://soundboard-pwa.firebaseapp.com/)

Tap the 'share' icon in the middle of the bottom screen

Scroll down and tap 'Add to Home Screen'

Give it whatever name you want and click Add

#### On Android

[Navigate to the website](https://soundboard-pwa.firebaseapp.com/) and you should be greeted with something similar to 

if your device and Android version support PWA's. Click Add, and then you're good to go!

Bonus, you also get a nice splash screen when the app starts on Android which makes it really feel like a standalone app

## Request Sounds

If you have a sound you'd love to see on the app, send me the sound source! 

You can reach me via email at
mrcrozier@gmail.com

or LinkedIn
https://www.linkedin.com/in/mitchell-crozier/

Thanks for using the app!

## Future Enhancements
Some ideas I have for future enhancements are

 - Track how many times each sound is played and have a 'Most Popular' section
	 - Add on to this could be to implement authorization and authentication and track per user to provide a custom 'Most Popular for You' list
 - Add a sound submission workflow, would still have to be approved by me to prevent shenanigans/lawsuits
 - Filtering of sounds, by type, name, times played, etc


Let me know if you have any ideas!
## Build Yourself

You're gonna have to make a new project in firebase and replace all my project info with yours. Also, in the environments you'll need to add your own firebase.environments.ts folder which will have the structure:

    export const firebase = {
	    apiKey: 'xyz',
	    authDomain: 'xyz',
	    databaseURL: 'xyz',
	    projectId: 'xyz',
	    storageBucket: 'xyz',
	    messagingSenderId: 'xyz',
	    appId: 'xyz',
	    measurementId: 'xyz'		
	};
If you need to use this in a pipeline, I recommend this article to hide your environment variables in the repo and still be able to leverage firebase https://itnext.io/github-actions-hide-and-set-angular-environment-variables-e753d06d16a8

Then just `ng s` and you're good to go! 

To test service workers, you'll need to install build `ng build --prod`,  and run an http-server in the output folder `http-server -p 8080 -c-1 dist/<project-name>` . Navigate to localhost:8080 and now your browsers dev tools should show service worker information.

If you need to use this in a pipeline, I recommend this article to hide your environment variables in the repo and still be able to leverage firebase https://itnext.io/github-actions-hide-and-set-angular-environment-variables-e753d06d16a8


