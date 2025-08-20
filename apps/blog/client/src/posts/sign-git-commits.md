---
title: "🔐 How to Sign Git CLI Commits with GPG on GitHub"
date: 2024-11-13
slug: sign-git-commits
excerpt: "Learn how to secure and verify your GitHub commits using GPG signatures in the command line."
image: /assets/thumbs/git-gpg.png
tags: [git, github, gpg, security, tutorial, cli]
---

# 🔐 How to Sign Git CLI Commits with GPG on GitHub

![Homepage Screenshot](/assets/screenshots/SignGitCLI.webp)

Ever wondered what that shiny green **[Verified]** badge means when you push to GitHub?  
That’s a 🪪 *sign* that your commit is **signed**. (Get it? 😉)

---

## 🚨 Why Does Verifying Commits Matter?

Signing your commits adds a layer of ✨ trust and authenticity ✨ to your work.  
It’s like a **photo ID** for your code — proving that you are who you say you are.

---

## 🧾 What You’ll Need

To get started signing your commits, you’ll need:

1. 🧑‍💻 A GitHub account  
2. 🖥️ Access to the Git CLI  
3. 🔐 A GPG signing tool  

If you're not set up with Git or GitHub yet, check out:
- 👉 [Setting up Git](#)  
- 👉 [Getting started with GitHub](#)  

---

## 🔑 GPG 101: Really Quick Primer

First things first:  
⚠️ **NEVER share your secret key with anyone.**

GPG (Gnu Privacy Guard) is a security protocol for encrypting and signing data.

It generates two keys:
1. 🔓 Public key — like a lock  
2. 🔑 Secret key — like a private key that only you have

You can do three main things with this key pair:

1. ✅ **Verify**: Confirm the sender is really you  
2. 🔒 **Encrypt**: Ensure only the recipient can read the data  
3. 🪪 **Identify**: Prove that the sender is the originator  

### 💎 A Story: Buying Diamonds with GPG

Imagine you’re buying diamonds online 💎.  
You mail an **unlocked padlock** to the jeweler.  
They put the diamonds in a box, lock it with your padlock, and send it back.

1. Only **you** can unlock it — verification ✅  
2. You know no one tampered with it — encryption 🔐  
3. You call the jeweler and show the opened box — identity confirmed 🪪

PGP and GPG work much the same way for verifying your commits.

🔗 Learn more about GPG at [gnupg.org](https://gnupg.org)  
🔗 Want to encrypt files? [See this PGP guide](#)

---

## ✅ Let’s Verify Your Git Commits

There are lots of GPG tools, but GitHub recommends this:

- **macOS**: [Download GPG Suite](https://gpgtools.org)  
- **Other OS**: [Find your tool](https://gpgtools.tenderapp.com/kb/faq/openpgp-solutions-for-all-operating-systems)

> 🎯 Tip: If you haven’t configured Git to use your GitHub email, scroll down to the “📫 Email Setup” section.

---

### 🛠️ Step-by-Step Instructions

1. 📥 Install Git CLI  
2. 📦 Download GPG Suite or another GPG tool  
3. 🔑 Open GPG Keychain (or tool of choice), create a new key  
   - Choose a strong password — don’t forget it!  
   - You *don’t* have to publish your public key  
4. 📁 Export your public key (.asc) to your desktop  
5. 📝 Open it with a text editor (like VSCode) and copy it  
6. 🧾 In terminal, type:  
   ```bash
   gpg --list-secret-keys
   ```  
   Find the key that looks like this:  
   ```
   (sec) rsa4096 2024-11-03 [SC] [expires: 20xx-03-35]
         ABCD1234EF567890GHIJK...
   ```  
7. ⚙️ Configure Git:  
   ```bash
   git config --global user.signingkey ABCD1234EF567890GHIJK
   git config --global gpg.program /usr/local/MacGPG2/bin/gpg2
   git config --global commit.gpgsign true
   ```
   Or manually sign commits with `git commit -S -m "My message"`  
8. 📋 Paste your public key into GitHub:  
   - Go to Settings → SSH and GPG keys → “Add GPG Key”  
9. ✅ Try a test commit!  
   - You’ll be prompted for your GPG password  

You should now see the glorious 🟢 **Verified** badge on your commits!

---

## 📫 Optional: GitHub Email Setup

To link your commits to your GitHub profile:

1. 🔒 Enable email privacy:  
   - GitHub → Settings → Emails → Check "Keep my email addresses private"

2. ✉️ Copy your `noreply` email:  
   ```
   12345678+yourusername@users.noreply.github.com
   ```

3. ⚙️ Update Git config:  
   ```bash
   git config --global user.email "12345678+yourusername@users.noreply.github.com"
   git config --global user.name "Your Name"
   ```

Confirm with:
```bash
git config --global user.email
git config --global user.name
```

---

## 🎉 Success!

You’ve now set up secure GPG-signed Git commits.  
This not only improves your workflow but also helps build trust and credibility as a developer.

---

## 🙏 Thanks for Reading!

If you found this useful:

- 🐦 Say hi on social  
- ☕ Buy me a coffee  
- 🛍️ Check out my glitch art shop  (Coming Soon)
- 💬 Ask questions or leave feedback anytime!

Email: jacob@fahrnbach.one

Happy coding! 🚀

— Written by Jacob Fahrnbach on November 13, 2024 at 9:35 PM

## 🔗 Links

- 🔗 [Live Site](https://fahrnbach.one)  
- 💻 [Source Code](https://github.com/fahrnbach)
- 😼 [Github](https://github.com/fahrnbach)
