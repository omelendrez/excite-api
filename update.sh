changed=0
git remote update && git status -uno | grep -q 'Branch is behind' && changed=1
if [ $changed = 1 ]; then
    git pull
    echo "Updated successfully";
else
    echo "Up-to-date"
fi