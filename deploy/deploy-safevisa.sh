#!/usr/bin/env bash
set -euo pipefail

# The Gitea data volume is mounted read-only into short-lived build containers.
# This avoids storing a Git credential or deploy key on the production host.
APP_DIR="${APP_DIR:-/srv/apps/safevisa}"
GITEA_VOLUME="${GITEA_VOLUME:-gitea_gitea_data}"
REPOSITORY="${REPOSITORY:-/gitea-data/git/repositories/alex_sobolev/safevisa.git}"
REF="${REF:-refs/heads/main}"
GIT_IMAGE="${GIT_IMAGE:-alpine/git:2.47.2}"
NODE_IMAGE="${NODE_IMAGE:-node:22-alpine}"

for command in docker mktemp cp mv ln test; do
    command -v "$command" >/dev/null
done

test -d "$APP_DIR/releases"
docker volume inspect "$GITEA_VOLUME" >/dev/null

commit="$(docker run --rm \
    -v "$GITEA_VOLUME:/gitea-data:ro" \
    "$GIT_IMAGE" --git-dir="$REPOSITORY" rev-parse "$REF")"

if test -f "$APP_DIR/releases/$commit/.safevisa-release"; then
    echo "safevisa: $commit is already current or available; no deployment needed"
    exit 0
fi

workdir="$(mktemp -d "$APP_DIR/.build.XXXXXXXX")"
release=""
cleanup() {
    rm -rf "$workdir"
    if test -n "$release" && test -d "$release"; then
        rm -rf "$release"
    fi
}
trap cleanup EXIT

docker run --rm \
    -v "$GITEA_VOLUME:/gitea-data:ro" \
    -v "$workdir:/work" \
    -e GIT_CONFIG_COUNT=1 \
    -e GIT_CONFIG_KEY_0=safe.directory \
    -e "GIT_CONFIG_VALUE_0=$REPOSITORY" \
    "$GIT_IMAGE" clone --no-checkout "$REPOSITORY" /work/source
docker run --rm \
    -v "$workdir:/work" \
    "$GIT_IMAGE" -C /work/source checkout --detach "$commit"

docker run --rm \
    -v "$workdir/source:/app" \
    -w /app \
    "$NODE_IMAGE" npm ci
docker run --rm --network none \
    -v "$workdir/source:/app" \
    -w /app \
    "$NODE_IMAGE" npm run build

test -f "$workdir/source/dist/index.html"
release="$(mktemp -d "$APP_DIR/releases/.next.XXXXXXXX")"
cp -a "$workdir/source/dist/." "$release/"
printf '%s\n' "$commit" > "$release/.safevisa-release"
mv "$release" "$APP_DIR/releases/$commit"
release=""

ln -s "releases/$commit" "$APP_DIR/.current.new"
mv -Tf "$APP_DIR/.current.new" "$APP_DIR/current"
echo "safevisa: deployed $commit"
