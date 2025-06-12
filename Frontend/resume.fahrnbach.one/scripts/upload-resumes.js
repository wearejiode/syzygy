// deploy-resume.js
import { exec } from "child_process";
import { readdirSync } from "fs";
import { join } from "path";

const resumeDir = "Frontend/resume.fahrnbach.one/resumes";
const wranglerConfig = "Frontend/resume.fahrnbach.one/resume-meta-worker/wrangler.toml";
const bucketName = "resume-data/resumes";

function uploadResume(file) {
  return new Promise((resolve, reject) => {
    const filePath = join(resumeDir, file);
    const cmd = `npx wrangler r2 object put ${bucketName}/${file} --file ${filePath} --remote --config ${wranglerConfig}`;

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

async function deploy() {
  try {
    const files = readdirSync(resumeDir).filter(f => f.endsWith(".pdf"));

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