# todo

- thisArg
- Buffer
- Pipe
- Chain
- Readable
- Writable
-

## .gitconfig

```
[color]
        diff = auto
        status = auto
        branch = auto
[alias]
        graph = log --oneline --decorate --graph
        pushall = "!f(){ for i in `git remote`; do git push $i $1; done; };f"
        fetchall = "!f(){ for i in `git remote`; do git fetch --prune $i; done; };f"
        l = log --graph --all --date=short --date-order --pretty=format:\"%C(yellow)%h%C(reset) %C(magenta)[%ad]%C(reset)%C(auto)%d%C(reset) %s %C(cyan)@%an%C(reset)\"
        lb = log --graph --date=short --date-order --pretty=format:\"%C(yellow)%h%C(reset) %C(magenta)[%ad]%C(reset)%C(auto)%d%C(reset) %s %C(cyan)@%an%C(reset)\"
[core]
        autocrlf = false
        editor = vim
        quotepath = false
```
