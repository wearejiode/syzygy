// deploy-resume.js
import { exec } from "child_process";
import { readdirSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Corrected path variable
const resumesDir = path.join(__dirname, "..", "resumes");

// Wrangler config and R2 bucket
const wranglerConfig = path.join(__dirname, '..', 'resume-meta-worker', 'wrangler.toml');
const bucketName = "resume-data/resumes";

// Upload individual file
function uploadResume(file) {
  return new Promise((resolve, reject) => {
    const filePath = join(resumesDir, file); // <-- fixed typo: resumesDir
    const configPath = path.join(__dirname, '..', 'resume-meta-worker', 'wrangler.toml');
    const cmd = `npx wrangler r2 object put resume-data/resumes/${file} --file ${filePath} --remote --config ${configPath}`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Failed to upload ${file}:`, stderr);
        reject(err);
      } else {
        console.log(`✅ Uploaded ${file}`);
        resolve(stdout);
      }
    });
  });
}

// Deploy all resumes and worker
async function deploy() {
  try {
    const files = readdirSync(resumesDir).filter(f => f.endsWith(".pdf"));

    if (files.length === 0) {
      console.log("⚠️ No PDF files found in resumes directory.");
      return;
    }

    console.log("📤 Uploading resumes to R2...");
    for (const file of files) {
      await uploadResume(file);
    }

    console.log("🚀 Deploying Worker...");
    exec(`npx wrangler deploy --config ${wranglerConfig}`, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Deployment failed:", stderr);
        process.exit(1);
      } else {
        console.log("🎉 Worker deployed successfully!");
        console.log(stdout);
      }
    });
  } catch (err) {
    console.error("🛑 Error during deployment:", err);
  }
}

deploy();
