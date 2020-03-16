---
title: Angular Deployment Introduction
layout: default
---

## Angular Deployment Introduction

Until now, we've been working with our web applications in a local environment.  We have relied on the frameworks (the integrated "development servers" included in React and Angular) to execute our code on *localhost*.  However, sooner or later we will have to build and publish these applications so that they are available for the public to use. 

<br>

### Angular App Deployment with Netlify

Previously, we used Heroku for hosting our web applications, but there are a lot of other options available. Heroku works well when you have a backend for your application. However, if you just have a front-end application, there are other services that are more convenient to use. One of them is Netlify, and we are going to use it for deploying our Angular applications.

<br>

#### Preparation

Before we actually go and deploy our app with Netlify, there are a few steps that need to be done first:

We need to host the source code of the application. We will use GitHub since it is the most popular and widely used source-code-hosting facility. If you have never worked with GitHub before, this is a good opportunity to learn some basics.

If you don't have an account on [GitHub](https://github.com/), create one now.

<br>

#### Create a GitHub Repository

Sign in to your GitHub account.

Find and click a "+" button on the Navigation Bar. Then, choose "New Repository" from the dropdown menu.

![New repository button screenshot](/media/angular-deployment-1.png)

Fill in the repository name text field with the name of your project. Also, please make sure that "Initialize this repository with a README" checkbox is unselected as well as "Add .gitignore" and "Add a licence" set to none. That will help us to avoid Git conflicts. See the screenshot below:

![New repository page screenshot](/media/angular-deployment-2.png)

Finally, hit the "Create repository" button.

<br>

#### Prepare Our Local Git Repo

Open the terminal and change the current working directory to your app.

If you created your Angular application **without** the `-g` option (i.e. `ng new my-app`), then, a Git repository was created automatically for you. Otherwise, if you accidentally used `-g` option while creating the app, you can initialize a local Git repository by running `git init` in the project's directory.

Additionally, you can run `git status` to verify that Git is set up properly. If you *do not* see `fatal: not a git repository (or any of the parent directories): .git` error message, then, your local Git repository exists.

Now that we're sure that our local git repository is set up, we need to add and commit all of our code changes:

1. Add the files to the local repository by running `git add .`
2. Commit the newly added files: `git commit -m "Initial commit"`.

<br>

#### Connect the Local Git Repository to GitHub

Go to your GitHub repository and click the "copy" button in the "Quick Setup" block:

![Quick setup page screenshot](/media/angular-deployment-3.png)

This will copy the URL of your remote GitHub repository.

Now, go back to your Terminal again and add this remote URL by running the following command:

```
git add remote origin URL
```
where **URL** is the remote repository URL that you have copied in the previous step. 

If you run `git remote -v`, you should see something like this:
```
origin	git@github.com:vldmrkl/my-app.git (fetch)
origin	git@github.com:vldmrkl/my-app.git (push)
```

Finally, push the changes from your local repository to the remote one:
```
git push -u origin master
```

You can verify that the code was pushed by going back to your Browser and opening your GitHub repository.

![Repo screenshot](/media/angular-deployment-4.png)

<br>

### Deployment

After we have made our source code available on GitHub, we can finally go to [Netlify's website](https://www.netlify.com/) and deploy our app.

You will need a Netlify account, so click "Sign Up" on the navigation bar. You will have several sign-up options there - since you have a GitHub account, go ahead and login with GitHub. 

Once you have logged in, you should see the "Sites" page. Proceed to create a "New site from Git".

![Netlify sites screenshot](/media/angular-deployment-5.png)

Select GitHub from the "Continuous Deployment" section.

It will prompt you to select a repository, so simply click on the name of the repository containing your project. 

Next, you will have to fill in the deploy settings for your app:
  
1. Make sure that the "master" branch is selected under "Branch to deploy" option.
2. Add a build command stating: `ng build --prod`.
3. Add the publish directory: `dist/NAME_OF_YOUR_APP`.
    
    ![Netlify sites screenshot](/media/angular-deployment-6.png)

4. Click "Deploy site".
    
    This will take you to the site overview page, where you can find all the details about your project. Currently, you will see that the site is being published. After some time, if the site is built successfully, you will see the URL to your published website.
    
    ![Site overview screenshot](/media/angular-deployment-7.png)

    **Congrats**, your app is live!

<br>

### Updating Your App

After your app is deployed, making changes and updating the app is simple: All that is required is that you update the code on the GitHub repository and Netlify will automatically publish a new version of your application. In order to update your remote repository after you made changes to your code locally:

1. Stage updated files to the local repository: `git add .`
2. Commit these files: `git commit -m "Developed a new feature"`
3. Push the changes to your remote repository: `git push`