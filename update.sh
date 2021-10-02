changed=0
log=updates.txt
git remote update && git status -uno | grep -q 'Branch is behind' && changed=1
if [ $changed = 1 ]; then
    git pull
    echo $(date) : Updated successfully >> $log;
else
    echo $(date) :  Up-to-date >> $log
fi