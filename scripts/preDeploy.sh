set -o errexit

git config --global user.email "diogofncunha@gmail.com"
git config --global user.name "Travis CI"

npm run build
