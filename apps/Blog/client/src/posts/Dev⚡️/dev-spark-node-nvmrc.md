# ⚡ Dev Spark: Auto-Switch Node with `.nvmrc` in Zsh

Every good developer workflow should be quick and smooth — just like this Dev Spark post.

Make Node versioning effortless with a single snippet you can drop into your `.zshrc`.

---

## 🧭 Step-by-step:

1. Find your `~/.zshrc` file  
2. Open it in your editor:
   ```sh
   code ~/.zshrc
   ```
3. Paste the following **after your NVM init block** (i.e. after setting `NVM_DIR` and sourcing `nvm.sh`)

---

## 🛠️ Auto-Switch Snippet

> Save time and avoid version mismatch errors by automatically switching Node versions when entering project directories — powered by `.nvmrc` and Zsh hooks.

<details>
<summary>👀 Click to view the snippet</summary>

```sh
# ~/.zshrc – Auto-load Node version from nearest .nvmrc on directory change

autoload -U add-zsh-hook

load-nvmrc() {
  local nvmrc_path
  nvmrc_path="$(find-up .nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node
    nvmrc_node=$(<"$nvmrc_path")
    if [ "$nvmrc_node" != "$NODE_VERSION" ]; then
      nvm use "$nvmrc_node" > /dev/null
      export NODE_VERSION="$nvmrc_node"
      echo "🔄 Switched to Node $NODE_VERSION in project: $(basename "$PWD")"
    fi
  fi
}

find-up() {
  local dir="$PWD"
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/$1" ]; then
      echo "$dir/$1"
      return
    fi
    dir=$(dirname "$dir")
  done
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc  # Run once on terminal load
```

</details>

---

## 🧪 Usage

1. Install [`nvm`](https://github.com/nvm-sh/nvm)
2. Add a `.nvmrc` to your project (e.g. `22` or `v20.10.0`)
3. Open a terminal and run:
   ```sh
   cd ~/my-cool-project
   ```
4. Boom 💥

```txt
🛸  cd ~/my-cool-project
🔄 Switched to Node v20 in project: my-cool-project
```

---

## 💡 Pro Tip

Add a `.nvmrc` to your `~` home directory (e.g. `echo "22" > ~/.nvmrc`)  
This acts as a fallback when no project-specific version is found.

---

## Want more Dev Spark posts?

✨ Visit [blog.fahrnbach.one/dev-spark](https://blog.fahrnbach.one/dev-spark) for quick, high-ROI developer tricks.

---

## 🔗 Social Post Example

```text
⚡ DEV SPARK: Instant Node Switching

Tired of forgetting to `nvm use`? This Zsh snippet auto-switches Node versions via .nvmrc and keeps your dev flow buttery smooth 🧈

Get the full snippet:
👉 blog.fahrnbach.one/dev-spark/node-auto-switch

#DevTools #Nodejs #Zsh #DeveloperTips #DevSpark ⚡
```
