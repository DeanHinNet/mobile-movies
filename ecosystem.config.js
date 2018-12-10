module.exports = {
  apps: [
   {
    name: "mobile-movies",
    script: "./bin/www",
    env: {
     PORT: 4500,
     NODE_ENV: "production"
    }
   }
  ],
  deploy: {
   production: {
    user: "ubuntu",
    host: "ec2-xx-xxx-xxx-xx.us-east-2.compute.amazonaws.com",
    key: "~/.ssh/AWS-EC2-INSTANCE-LIVE.pem",
    ref: "origin/master",
    repo: "git@bitbucket.org:Balasubramani/my-app.git",
    path: "/home/ubuntu/my-app",
    "post-deploy":
     "npm install && pm2 startOrRestart ecosystem.config.js"
   }
  }
 };