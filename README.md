# n-deploy

This tool allows you to effectivly "`scp -r /path/to/local/folder user@host.com:/path/to/destination`" onto multiple targets with a single command.   

you can also specify a "jump" host 

it calls your system `scp` command, so scp must be in your path
NB: passwordless authentication using keys is recommended

## Installation

```bash
npm install n-deploy
```

## Usage 
### Config 

```bash
n-deploy --sample
[+] Starting n-deploy v1.1
[+] Printing sample config ... copy & paste into n-deploy.json
```
```json
{
  "config-version": "release",
  "config-data": {
    "targets": [
      {
        "user": "userA",
        "host": "example.com",
        "destination": "folder_A",
        "source": "/my/local/path/to/folderA"
      },
      {
        "jump": "userA@hostc",
        "user": "userB",
        "host": "example.org",
        "destination": "folder_B",
        "source": "/my/local/path/to/folderB"
      }
    ]
  }
}
```

Modify and put this JSON inside n-deploy.json file and place this into your project's root folder.  


### Deploy

```
n-deploy --run
[+] Starting n-deploy v1.1
[+] Configuration has been read.
[+] Validating deploy targets.
[+] Deploy for target <userA@example.com> started.
[+] Deploy for target <userB@example.org> started.
```
```json
{
        "user": "userA",
        "host": "example.com",
        "destination": "folder_A",
        "source": "/my/local/path/to/folderA",
        "resultOfDeploy": "Succeed"
}
{
        "jump": "userA@hostc",
        "user": "userB",
        "host": "example.org",
        "destination": "folder_B",
        "source": "/my/local/path/to/folderB",
        "resultOfDeploy": "Succeed"
}


```

## License MIT

## Author / Contributors 
* Alexis Charytonow, @lintuxt, 2015-2017.
* David Pyke , 2023
