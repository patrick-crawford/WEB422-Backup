---
title: Serving a React App 
layout: default
---

## Serving a React app with Vercel

Rather than building the app manually before every production deployment and pushing the contents to a static web server, we can leverage modern services such as [Vercel](https://vercel.com/) to automate this process.  Vercel will detect changes to our code and perform the build step for us automatically as well as host the built app on their server.      

For Vercel to gain access to our code however, it must be hosted online.  This is where GitHub comes in.

<br>

### GitHub

We will be using GitHub since it is the most popular and widely used source-code-hosting facility, however other services can also be used with Vercel such as [GitLab](https://about.gitlab.com/) or [Bitbucket](https://bitbucket.org/).

If you don't have an account on [GitHub](https://github.com/), create one now.

<br>

#### Create a GitHub Repository

Sign in to your GitHub account.

Find and click a "+" button on the Navigation Bar. Then, choose "New Repository" from the dropdown menu.

![New repository button screenshot](/media/react-deployment-1.png)

Fill in the repository name text field with the name of your project. Also, please make sure that the "Private" option is selected:

![New repository page screenshot](/media/react-deployment-2.png)

Once you're happy with the settings, hit the "Create repository" button.

<br>

#### Prepare Our Local Git Repo

Open the terminal and change the current working directory to your app.

You can run `git status` to verify that Git is set up properly. If you see `fatal: not a git repository (or any of the parent directories): .git` error message, then your local Git repository does not exist and you need to initialize it using `git init`.

Now that we're sure that our local git repository is set up, we need to add and commit all of our code changes:

1. Add the files to the local repository by running `git add .`
2. Commit the newly added files: `git commit -m "Initial commit"`.

<br>

#### Connect the Local Git Repository to GitHub

Go to your GitHub repository and click the "copy" button in the "Quick Setup" block:

![Quick setup page screenshot](/media/react-deployment-3.png)

This will copy the URL of your remote GitHub repository.

Now, go back to your Terminal again and add this remote URL by running the following command:

```
git remote add origin URL
```
where **URL** is the remote repository URL that you have copied in the previous step. 

If you run `git remote -v`, you should see something like this:
```
origin	git@github.com:patrick-crawford/my-app.git (fetch)
origin	git@github.com:patrick-crawford/my-app.git (push)
```

Finally, commit your changes (if you have not yet done so) and push the code from your local repository to the remote one:
```
git push origin master
```

You can verify that the code was pushed by going back to your Browser and opening your GitHub repository.

![Repo screenshot](/media/react-deployment-4.png)

<br>

### Deployment

Once we have made our source code available on GitHub, we can proceed to [Vercel](https://vercel.com/#get-started) and import our git repository from GitHub.

![Import Git Repository](/media/react-deployment-5.png)

Once you click on "Continue with Github", you will be asked to log into your github account before then proceeding to "**Import Git Repository**".  

From here, click the "**Select...**" dropdown and select "**+ Add GitHub Org or Account**".  This will open a new window asking you "**Where do you want to install Vercel**", followed by a list of containing your account and organizations that you are associated with in GitHub.

Pick your personal account, select "**Only Select Repositories**" and navigate to our newly created "my-app" repository, before clicking the green "**Install**" button:


![Install Vercel](/media/react-deployment-6.png)


Once this process has completed, you should see "my-app" listed in the "Import Git Repository" section next to a blue "**Import**" button.  Click this to select the "**Vercel Scope**" - this is going to just be our personal account (we do not need to create a team at this point).

Once you have selected your *Personal Account* by clicking the blue "Select" button, you will finally be presented with the "Deploy" option:

![Import Project](/media/react-deployment-7.png)

You will notice that before we click deploy, we have the option to set environment variables or build / output settings.  At this point, we do not need to change any of these settings and are free to proceed with the **Deploy**.

This will trigger a build step.  Once it is completed successfully, you wil have the option to visit the site, or open the dashboard to manage the deployment, view build logs, domains, etc.












