---
title: MongoDB Atlas Sample Data
layout: default
---

## MondoDB Atlas Sample Data

Throughout this course, we will be leveraging the excellent [sample data](https://docs.atlas.mongodb.com/sample-data/available-sample-datasets/) available from MongoDB Atlas.  This short guide will provide a short set of steps to help you create a new project in Atlas, as well as adding the sample data. 

**NOTE** This guide assumes that you still have your MongoDB Atlas account from WEB322.  If this is not the case, please create a new account and follow the below steps.

<br>

### Step 1: Creating a new Project

Once you log into MongoDB Atlas, you will be taken to your default project page.  On the bar on the left, you should see a green "context" label, followed by a drop down with your current project (likely Project 0).  To create a new Project, simply click on the drop down and click "New Project" at the bottom.

![New Project Step 1]({{ site.baseurl }}/media/atlas-new-project-1.png)

<br>

### Step 2: Name Your Project

Next, simply give a name to your project (keep it simple, something like "Project 1").  Once you have a name, click "Next"

![New Project Step 2]({{ site.baseurl }}/media/atlas-new-project-3.png)

<br>

### Step 3: Add Members and Set Permissions

On this step, simply click "Create Project".  It should automatically add yourself as the "Project Owner".

![New Project Step 3]({{ site.baseurl }}/media/atlas-new-project-4.png)

<br>

### Step 4: Create a Cluster

Once Step 3 is complete, you can go ahead and create a cluster for your Project by clicking "Build a Cluster".

![New Project Step 4]({{ site.baseurl }}/media/atlas-new-project-5.png).

This should take you to a screen where you can configure your cluster.  Just as we did in WEB322, pick the FREE options.

<table>
<tr>
<td valign="top">
<img src="{{ site.baseurl }}/media/atlas-new-project-6.png" alt="New Project Step 4.1">
</td>
<td>
<img src="{{ site.baseurl }}/media/atlas-new-project-7.png" alt="New Project Step 4.2"><br>
<img src="{{ site.baseurl }}/media/atlas-new-project-8.png" alt="New Project Step 4.3"><br>
</td>
</tr>
</table>

<br>

### Step 5: Wait...

![New Project Step 5]({{ site.baseurl }}/media/atlas-new-project-9.png)

<br>

### Step 6: Load Sample Data.

Now that our new project has a new cluster, we can load the sample data.  At the main screen for your newly created cluster (Cluster 0), you should see a button with elipsis dots on it ("...")

![New Project Step 6]({{ site.baseurl }}/media/atlas-new-project-10.png)

Click this to open a new menu and click the "Load Sample Dataset" menu item:

![New Project Step 6.1]({{ site.baseurl }}/media/atlas-new-project-11.png)

This should open a new modal window asking you to "confirm that you want to load the sample dataset."

![New Project Step 6.2]({{ site.baseurl }}/media/atlas-new-project-12.png)

Simply click the "Load Sample Dataset" button and prepare to wait for a few minutes while your datasets are populated.

<br>

### Step 7: Success!

If you click on the collections button now, you should see that you now have access to some awesome datasets!  Specifically:

* sample_airbnb
* sample_geospatial
* sample_mflix
* sample_supplies
* sample_training
* sample_weatherdata

**NOTE:** To get the connection string to connect to this database, you will have to go through the same procedure as WEB322 (ie: click the "connect" button and whitelist the IP address 0.0.0.0/0 and create a user before clicking "Connect Your Application").  For a refresher on how to do this, please see the [Week 8 notes for WEB322](https://sictweb.github.io/web322/notes/week08) under "Setting up a MongoDB Atlas account".  

Do not forget that once you get your connection string, replace the instance of "myFirstDatabase" with the database that you wish to connect to, ie: "sample_supplies".





