## Steps to setting up a new instance

#### Create a new instance

[Aws Console](https://console.aws.amazon.com/ec2/v2)

- Click `Create instance`
- Choose `Ubuntu: Free tier`
- Create a new permissions `.pem`
- Download the `.pem`
- Copy the `.pem` to your `~/.ssh/` folder
- Click `View instances`
- In the left menu, click `Security groups`
- Click on most recently created group, then at the top of the page `Actions`
- Click `Edit inbound rules`
- Choose type: `All TCP" and click "Save`

#### Connecting to the instance

`nano ~/.ssh/config`
- Add these lines:

```bash
Host myInstanceName
    User ubuntu
    IdentityFile ~/.ssh/myIdentityFile.pem # (Which we downloaded in the step above)
    HostName ec2-EXAMPLE_HOST_NAME.us-east-2.compute.amazonaws.com # (copy from your instances panel)
```

`chmod 0600 ~/.ssh/myIdentityFile.pem`
- ssh to the server `ssh myInstanceName`
- Choose yes to `Are you sure you want to continue connecting (yes/no)?`

#### Installing docker
Run the following:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
```

- Add the following lines to your `~/.bash_aliases` create the file if it does not exist

```bash
# Docker
alias d='docker'
alias dc='docker-compose'

# Close and kill all containers
alias drm='docker rm $(docker ps -a -q)'
alias dstop='docker stop $(docker ps -a -q)'

# Get a shell into a docker container
ds() {
  clear && docker exec -it $1 bash
}
```

- exit and relogin

`docker run hello-world`

#### Download and setup the project
Run the following

```sh
git clone https://github.com/tavurth/drone-telemetry.git
yes n | mv drone-telemetry/* drone-telemetry/.* .; rm -rf drone-telemetry
```
- Create two files in the current directory:

###### database.env
```env
CACHE_SIZE=512
NAME=drone_telemetry
PASSWORD=YOUR_DATABASE_PASSWORD
```

###### db-config.txt
```
YOUR_DATABASE_PASSWORD
```

Run the following
```sh
sudo apt install python3-pip
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
sudo dpkg-reconfigure locales
```

- Press enter twice

`pip3 install rethinkdb`

#### Start the project
- `dc up -d` (Start the docker container)
- `python3 setup.py` (Setup the database)

#### Connecting to the server
Now you can connect to the project using

```python
import rethinkdb as r

connection = r.connect(
    user='admin',
    password='YOUR_DATABASE_PASSWORD'
    host='ec2-EXAMPLE_HOST_NAME.us-east-2.compute.amazonaws.com',
)
```
