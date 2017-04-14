set -o errexit
SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

git init
git config user.name "Diogo Cunha"
git config user.email "diogofncunha@gmail.com"
git remote add upstream "https://$GH_TOKEN@github.com/$GITHUB_REPO"
git fetch upstream
git reset upstream/gh-pages

yarn run copyBuild

git add -A .
git commit -m "rebuild pages" --allow-empty
git push -q upstream HEAD:gh-pages
