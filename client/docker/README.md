# Docker Files

## For local development

### Building for local devlopment

From the `ClientV2` directory's root level run:
```
docker build --rm -t totallyawesome_client -f "`pwd`/docker/Dockerfile.local" .
```
* Only `bash` and `yarn` are added in the build

### Running the client locally for development

From the `ClientV2` directory's root level run:
```
docker run --name ta_local -it --rm -p 3000:3000 -v "`pwd`":/app totallyawesome_client
```
* This directive [bind mounts](https://docs.docker.com/storage/bind-mounts/) the contents of the local client directory into the container's work directory `/app`. This way the developer does not need open a SSH connection between his/her IDE and the container. 

* To inspect the contents of the running container, run:

    ```
    docker exec -it <container_id> /bin/bash
    ```

* To inspect the contents of the container, append `/bin/bash` to the previous directive like so: 

    ```
    docker run --name local_react  -p 3000:3000 -it --rm -v "`pwd`":/app totallyawesome_client /bin/bash
    ```

## For a deployed environment *(eg. development)*

From the `ClientV2` directory's root level run:

```
docker build --rm -t totallyawesome_client -f "`pwd`/docker/Dockerfile.dev" .
```
* Installs `bash`, `git` and `yarn`
* Git clones project repo's branch

*...To continue with the following:*
* Grant docker permissions git repository permissions. If ssh is to be used, then it needs to be installed.
* Git to clone/pull project repo at specific branch with depth=1
* Performs `yarn install`
* Trigger webpack's build
* Aside from source code, remove everything else

---

_**For future reference:**_
* To manage multiple dockerfile, read [this](https://docs.docker.com/engine/reference/commandline/build/#use-a-dockerignore-file)

