---
title: MyApps Instructions
layout: default
---

## Writing Code In the Lab / Learning Commons

During this course, you may wish to use the computers in the Learning Commons or one of Seneca's many Windows-based Lab computers to write your code.  Like other courses offered at Seneca, we have made this possible by making the required software available through MyApps.  

While it's recommended that you use your own Linux / Unix based platform (Or one of the pre-configured Mac Labs), we understand that it's not always possible.  If this is indeed the case, please follow these instructions to get Visual Studio, Git and Node.js up and running using MyApps.

1.  Click on the "Seneca MyApps" shortcut on the desktop to open up the main web interface for MyApps (This may already be open after logging on)

2.  On the right corner (under your name), you should see a "Search Apps" field: 
    
    ![MyApps Search](/media/myapps-search.png)

3.  Search for the text "VSCode"
    
    ![MyApps Search - VSCode](/media/VSCode-search.png )

4.  This should effectively trim the results down to a single result (VSCode + Node + Git).  Hover over the result to reveal a "Launch" button:
    
    ![Launch VSCode](/media/lauch-vsCode.png)

5.  Click the "Launch" Button.  This should open the "Cloudpaging Player" with our VSCode + Node + Git combo added to the bottom:
    
    ![Cloudpaging Player](/media/cloudpaging-player.png)
        
    You should also notice that a folder has opened up containing the following shortcuts:

    ![MyApps Shortcuts Folder](/media/myapps-shortcuts-folder.png)

6.  Click on the "Code - Shortcut" shortcut to open Visual Studio Code.


**Before you do anything in Visual Studio Code**, you must change the "Default Shell" that will be used by our Integrated Terminal in Visual Studio Code:

1.  With Visual Studio Code open and focused, enter the keyboard shortcut: **Shift + Ctrl + P**.  This will bring up a command prompt with various options:
    
    ![VS Code Prompt](/media/vs-code-prompt.png)

2.  Type "Shell" and you should see the following options:
    
    ![VS Code Prompt - Shell](/media/vs-code-prompt-shell.png)

3.  Click the first option "Terminal: Select Default Shell"  You should then see the below options: 
    
    ![VS Code Prompt - Shell Options](/media/vs-code-prompt-shell-options.png)

4.  Lastly, Click the bottom option: "Git Bash"


This should correctly configure your development environment within MyApps.  To confirm this, open up the Integrated Terminal and try entering the commands:

```
git --version
```

and 

```
node --version
```

You should see that the commands are found and the current version numbers are displayed in the Terminal.

**Congratulations** your development environment is properly configured.  Happy Coding!