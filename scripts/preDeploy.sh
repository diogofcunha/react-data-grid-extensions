set -o errexit

git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

npm run build
