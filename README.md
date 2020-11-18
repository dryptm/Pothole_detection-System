# Object Detection React App Frontend

You can find in depth walkthrough for training a TensorFlow.js model [here](https://github.com/cloud-annotations/training/).

## Setup
`git clone` the repo and `cd` into it by running the following command:

```bash
git clone https://github.com/cloud-annotations/Pothole_detection-System.git
cd Pothole_detection-System
```

### `npm install`

> **Note: You’ll need to have Node 8.10.0 or later on your local development machine.** You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

## Add TensorFlow.js Model to the App
There is already a model in the `public` folder of this repository, but if you have trained your own model then you can simply swap the existing model with the one you have

## Run the App
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Backend
When you go in the folder named as backend, you will find some files.
Open the package.json file and check for the depecdencies. Install all the dependencies that are written in it using the terminal.
Once intalled all the dependencies, navigate to the backend folder in the terminal and write the command
### `node app.js`
this will start the backend server at the port 5000.

Now you are ready to run the App and store the data in your backend and whatever database you've integrated.
