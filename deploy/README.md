# Production deployment bridge

`safevisa-deploy.timer` checks `main` in the private Gitea repository once per
minute. On a new commit, `deploy-safevisa.sh` reads the Gitea Docker volume
read-only, builds the Vite application in disposable Docker containers, and
atomically switches `/srv/apps/safevisa/current` to the successful release.

The public Nginx container mounts the parent directory read-only and uses
`nginx.conf`. It never serves a partially built directory. No Git credential,
deploy key, or application secret is stored in the repository or in the script.
