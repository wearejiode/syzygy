---
slug: "reboot-ready"
---

## 🧬 Reboot Ready: My Dotfiles Setup for a Portable Dev Life

> *"Your dev environment should be as portable as your laptop."*

Ever switch to a new machine, reinstall your tools, and realize… you forgot half your shortcuts? Or maybe you spent hours trying to remember how your terminal prompt used to look? That’s what pushed me to finally create a **modular, version-controlled dotfiles system** — clean, consistent, and ready to clone.

This post breaks down how I built it: what it includes, why it matters, and how it future-proofs your dev setup.

---

### 🧠 Why Bother?

Sure, you *can* copy your `.zshrc` to a new Mac and call it a day. But if your setup involves:

- NVM, pyenv, or rbenv
- AWS CLI or GPG
- Custom shell themes or prompts
- Carefully honed aliases and shortcuts
- A finely tuned VS Code experience

…then you’re better off with a **repeatable, reliable setup** that doesn't live only in your head.

Setting up a new machine shouldn't feel like rebuilding a house from memory. Now, it doesn't.

---

### ⚙️ What’s Inside My Dotfiles Repo?

**🧩 Modular Shell Config**  
Instead of a 1,000-line `.zshrc`, mine is split into:
- `.aliases.sh` – for keyboard-friendly shortcuts
- `.exports.sh` – for environment variables like `$EDITOR`
- `.functions.sh` – reusable CLI logic and helpers
- `.zshrc` – main orchestrator, keeps it tidy

**🛠️ Toolchains & Language Managers**  
- Node.js via `nvm`
- Python via `pyenv`
- Ruby via `rbenv`
- Additional path support for Go, Rust, and more

**🧼 Git Ignore Done Right**  
Version control matters, but so does privacy:
- Ignores `.zsh_history`, `.aws/`, `.gnupg/`, `.ssh/`
- Ignores Vim plugins and `.vscode/workspaceStorage`
- `.env`, `.key`, `.pem`, `.crt` all excluded

**📦 Brewfile + Install Scripts**  
Includes:
- `Brewfile` with CLI tools and VS Code extensions
- `mac-setup.sh` for installing Rosetta, Xcode CLI, and Homebrew
- `bootstrap.sh` for setting up symlinks and restoring your terminal setup

**📁 iTerm2 Configs**  
iTerm2 profiles and themes are backed up and imported automatically — no more recreating your favorite prompt or colors by hand.

---

### 📸 Bonus: macOS & VS Code Settings

- VS Code settings, keybindings, and snippets are all backed up
- System-wide macOS keyboard shortcuts and UI tweaks stored in `.plist` files
- Can be restored with a single script or copied into System Preferences manually

---

### 💡 Lessons Learned

- Embedded Git repos (like Vim plugins)? Ignore them or use proper submodules
- Modular dotfiles are easier to debug and maintain
- Avoid `git add .` traps — they’ll catch things you don’t want (like workspace history)
- `.env` and secrets *do not belong* in version control. Ever.
- Symlink everything — it keeps your home folder clean and synced

---

### 🚀 Why This Matters

This setup isn't just about convenience — it's about **resilience**.

Whether you're switching laptops, spinning up a new dev container, or helping a friend get set up fast, your entire workflow can be restored in minutes. No second guessing. No starting from scratch.

---

### ⌨️ Coming Soon: My Favorite Keyboard Shortcuts

This dotfiles repo also includes a backup of all my favorite macOS and app-level keyboard shortcuts — and I’m working on a post dedicated to that next!

I’ll be sharing:
- How I use hyper keys to manage windows and launch apps
- Clipboard and screenshot tricks
- Custom shortcut hacks for speeding up dev workflows

**If dotfiles make your terminal feel like home, keyboard shortcuts turn it into a spaceship. 🚀**

Stay tuned!

---

*Want to see the full dotfiles repo? Visit [github.com/YOURUSERNAME/dotfiles](https://github.com/YOURUSERNAME/dotfiles)*  
*Or check out my setup guide in the README to build your own from scratch.*