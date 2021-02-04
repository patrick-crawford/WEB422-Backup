---
title: Serving a React App 
layout: default
---

## Serving a React app with Vercel

Throughout our discussion of React, we've been learning and practicing our skills in a controlled, "development" environment.  Once we're happy with the end result however, we can actually "build" the application, which will generate a much smaller footprint (bundled, minified JavaScript / CSS, etc). 

### "Build" the app

If you take a look at the generated `package.json` file, you will see that the `"scripts"` property contains our initial `"start"` script (ie: **npm start**), as well as a number of *other* scripts that we can invoke.  The one we're most interested in here, is the `"build"` script (ie: **npm run build**).  Once executed, this script initiates a "build" process that creates a highly optimized "production" build of our code in a new folder called "build".

Try executing this command in one of your React apps, by following the below steps:

* Stop the "development server" currently running using **ctrl + c**
* Execute the command **"npm run build"**

Once this process is complete, open the newly created "build" folder.  You will see that there's only a handful of files now, most notably, an "**index.html**" file and a "**static**" folder containing 2 sub-folders: "**js**" and "**css**" which contain your bundled JavaScript &amp; CSS files respectfully. If you take a look at index.html (after temporarily formatting it in Visual Studio Code), you will see that it's a small skeleton that references your .js file.

Now, all we need to run this in a "production" environment, is someplace to host the files.  Fortunately for us,

... to be continued











