# AgriSmart — Smart Agricultural System (DevOps Lab Mini Project)

A responsive demo web application for the **Crop Health & Yield Management System**. This single project can be reused across the DevOps laboratory experiments: Git/GitHub, branching, Jenkins, CI/CD, Docker, continuous testing, Ansible, and integrated deployment.

## Features
- Responsive farm dashboard and sample field statistics
- Crop-health table with illustrative soil-moisture and health values
- Yield overview for sample crops
- Farmer registration form with browser-side validation
- Dockerfile using Nginx on Alpine Linux
- Jenkins pipeline for file validation, Node.js smoke tests, and Docker image build
- Ansible example for deploying a Docker container to a Debian/Ubuntu host

**Important:** Dashboard values are demonstration data only. The registration form does not send data to a server or store it in a database. Live sensors, real weather data, authentication, and a backend API are not included.

## Project structure
```text
Smart_Agricultural_DevOps_Project/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── Jenkinsfile                 # Windows Jenkins agent example
├── Jenkinsfile.linux.example   # Linux Jenkins agent example
├── tests/test-app.js
└── ansible/
    ├── deploy.yml
    ├── inventory.ini.example
    └── README.md
```

## Run locally on Windows
1. Extract the ZIP file.
2. Open the extracted folder in File Explorer.
3. Double-click `index.html` to preview the website in your browser.
4. For the automated tests and Docker/Jenkins steps, install Node.js and Docker Desktop.

Run the tests in PowerShell from the project directory:
```powershell
node --version
node tests/test-app.js
```
Expected output:
```text
PASS: All AgriSmart smoke tests passed.
```

## Experiment 1 — Git local and remote repository
Create a new empty repository on GitHub (do not add README/license there if you plan to push this existing project).

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git init
git add .
git commit -m "Initial AgriSmart project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
git status
```
Replace the example username/repository URL with your own. GitHub authentication may require a browser login or token via Git Credential Manager.

## Experiment 2 — Fetch and synchronize
```powershell
git remote -v
git fetch origin
git log --oneline --all --graph
git pull origin main
# After making a change:
git add .
git commit -m "Update agricultural dashboard"
git push origin main
git status
```
`git fetch` downloads remote references without merging them into the current branch. `git pull` fetches and integrates changes into the current branch.

## Experiment 3 — Branching, merging and conflict practice
```powershell
git switch -c feature/crop-health
# Edit a project file, then:
git add .
git commit -m "Add crop health feature"
git switch main
git merge feature/crop-health
git branch
```
For conflict practice, edit the same line in `README.md` on two different branches, commit each edit, then merge. Git marks the conflict in the file. Edit it to the desired final text, remove conflict markers, then run `git add README.md` and `git commit`.

## Experiment 4 — Jenkins Freestyle job
1. Install and start Jenkins; open `http://localhost:8080`.
2. Install/configure Git and ensure Jenkins can access it.
3. Create a Freestyle project named `AgriSmart-Build`.
4. Under **Source Code Management → Git**, add your GitHub repository URL and branch `*/main`.
5. Add a Windows batch build step:
```bat
node --version
node tests\test-app.js
```
6. Save and select **Build Now**. Open **Console Output** and confirm the tests pass.

## Experiment 5 — Jenkins Pipeline
1. Push `Jenkinsfile` and all project files to GitHub.
2. In Jenkins, choose **New Item → Pipeline**.
3. Select **Pipeline script from SCM**, choose Git, enter your repository URL, branch `*/main`, and script path `Jenkinsfile`.
4. Save and click **Build Now**.
5. The pipeline checks files, runs smoke tests, and builds the Docker image. The Jenkins agent must have Git, Node.js, and Docker CLI/engine available.

The included `Jenkinsfile` uses Windows `bat` steps. For a Linux agent, use `Jenkinsfile.linux.example` and set the script path to that filename (or rename it to `Jenkinsfile` in your Linux branch).

## Experiment 6 — GitHub webhook trigger
1. Ensure Jenkins is reachable from GitHub over HTTPS. `localhost` alone is not reachable from GitHub.
2. In Jenkins, configure the GitHub integration as required by your installation and enable **GitHub hook trigger for GITScm polling** for a Freestyle job, or the relevant webhook trigger for your Pipeline setup.
3. In the GitHub repository, open **Settings → Webhooks → Add webhook**.
4. Payload URL: `https://YOUR_PUBLIC_JENKINS_URL/github-webhook/`
5. Content type: `application/json`; select push events.
6. Push a small commit and inspect GitHub webhook delivery and Jenkins build history.

Use an approved secure tunnel or hosted Jenkins instance for a lab demo. Do not expose an unsecured Jenkins server to the public internet.

## Experiment 7 — Docker lifecycle and commands
Install and start Docker Desktop, then from PowerShell in this folder:
```powershell
docker --version
docker pull nginx:alpine
docker images
docker run -d --name nginx-demo -p 8081:80 nginx:alpine
docker ps
docker logs nginx-demo
docker stop nginx-demo
docker start nginx-demo
docker rm -f nginx-demo
```
Open `http://localhost:8081` while the demo container is running.

## Experiment 8 — Dockerfile and custom image
```powershell
docker build -t agrismart:latest .
docker images
docker run -d --name agrismart-web -p 8080:80 agrismart:latest
docker ps
```
Open `http://localhost:8080`. To stop and remove the container:
```powershell
docker rm -f agrismart-web
```
To compare base image sizes for the record, use `docker image ls` after pulling/building the selected images. Sizes vary by version and platform.

## Experiment 9 — Deploy/manage the web application with Docker
The Docker image serves the website on container port 80. Port mapping `-p 8080:80` makes it available at `http://localhost:8080`.

Volume-mount example for live editing during development (run from the project directory in PowerShell):
```powershell
docker run --rm --name agrismart-dev -p 8080:80 -v "${PWD}:/usr/share/nginx/html:ro" nginx:alpine
```
Stop the foreground container with `Ctrl+C`. The volume mount is for development; use the built image for repeatable deployment.

## Experiment 10 — Continuous testing
Run locally:
```powershell
node tests/test-app.js
```
The tests verify required sections, linked assets, form event handling, styling, and Dockerfile presence. In Jenkins, the `Continuous tests` stage runs these checks before the Docker build. A test failure makes the pipeline fail.

## Experiment 11 — Ansible web-server configuration
Ansible is generally run from Linux/WSL or another supported control machine, not directly from ordinary Windows PowerShell.
1. Set up Ansible in WSL/Linux.
2. Prepare a test Ubuntu VM/server with SSH and sudo access.
3. Install the Docker collection: `ansible-galaxy collection install community.docker`
4. Copy the project folder to `/opt/agrismart` on the target host.
5. Copy `ansible/inventory.ini.example` to `ansible/inventory.ini`, edit the host/user, then run:
```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```
6. Browse to `http://TARGET_SERVER_IP:8080` if the host firewall/network permits it.

This playbook is an example for a Debian/Ubuntu target. Test it in a VM first and adapt it to your OS, credentials, Docker collection versions, and network rules.

## Experiment 12 — Ansible automated container management
Use the same playbook as a starting point. Demonstrate idempotence by running it twice, then check:
```bash
docker ps
docker logs agrismart
```
Record the playbook output and successful browser access. The target must have the project files at the configured path.

## Integrated DevOps demo
1. Commit and push source files to GitHub.
2. Jenkins checks out the repository.
3. Jenkins validates required files and runs Node.js smoke tests.
4. Jenkins builds the `agrismart:latest` Docker image.
5. Run the image locally or use Ansible to deploy it to a Linux test host.
6. Demonstrate the browser dashboard and save screenshots of Git, Jenkins console, Docker container, and application output.

## Viva questions (sample)
1. What is version control? Why use Git?
2. What is the difference between `git fetch` and `git pull`?
3. Why do we create branches?
4. What is a Jenkins pipeline?
5. What is a webhook, and how does it trigger a build?
6. What is a Docker image compared with a container?
7. Why is port mapping used?
8. What is continuous testing?
9. What is Ansible, and what is a playbook?
10. How do Git, Jenkins, Docker, and Ansible work together?

## Troubleshooting
- **`git` or `docker` not recognized:** install the tool, reopen PowerShell, and check PATH.
- **Docker daemon unavailable:** start Docker Desktop and wait until its engine is running.
- **Port 8080 already in use:** use `-p 8082:80` and open `http://localhost:8082`.
- **Jenkins cannot run Docker:** ensure Docker is installed on the Jenkins agent and the Jenkins service account has permission to access it.
- **Jenkins cannot find Node.js:** configure Node.js in the agent PATH or use Jenkins NodeJS tooling.
- **Ansible SSH failure:** verify target IP, SSH access, username, key, firewall, and sudo access.
