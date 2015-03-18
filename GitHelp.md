## Simple Git workflow

Kyle made a good point that this workflow may be too complicated for first time users so I wanted to make things clearer. 
The following commands are all you will need to work on the project from the commandline. If you want to use a GUI
git application you will need to look up how to do these from whatever program you used.

### Cloning the repo (First time)
    git clone https://github.com/FiveGuys-CS256/html-prototype.git
    cd html-prototype
    git checkout -b YOUR_NAME

### After coding a complete feature
    git add --all .
    git commit -m "COMMIT MESSAGE DESCRIBING YOUR CHANGES"
    git fetch
    # this command will potentially fail. let James know if it does and he can help you
    git rebase origin/gh-pages 
    # after running this once, you can just use `git push` from now on
    git push -u origin YOUR_NAME
    
and then you go on the webpage https://github.com/FiveGuys-CS256/html-prototype/ and make a pull request to the branch `gh-pages`
