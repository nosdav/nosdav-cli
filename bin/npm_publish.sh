#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Please provide a commit message."
    exit 1
fi

COMMIT_MESSAGE="$1"
BUMP_TYPE="${2:-patch}" # Set the default bump type to 'patch' if not provided

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Uncommitted changes found. Please commit or stash your changes before running this script."
    exit 1
fi

# Stage and commit changes
git add .
git commit -m "$COMMIT_MESSAGE"

# Bump package.json version
npm version "$BUMP_TYPE" -m "Bump to %s"

# Publish to npm
npm publish

# Push commits and tags to the repository
git push
git push --tags
