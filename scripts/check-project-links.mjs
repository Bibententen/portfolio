import fs from "node:fs";
import path from "node:path";

const directory = path.join(process.cwd(), "content", "projects");
const files = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
const headers = process.env.GITHUB_TOKEN
  ? {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }
  : undefined;
const urls = files.flatMap((file) => {
  const source = fs.readFileSync(path.join(directory, file), "utf8");
  const match = source.match(/^repo:\s*(\S+)$/m);
  return match ? [{ file, url: match[1] }] : [];
});

const failures = [];
for (const item of urls) {
  let response = await fetch(item.url, {
    method: "HEAD",
    headers,
    redirect: "follow",
  });
  if (!response.ok)
    response = await fetch(item.url, { headers, redirect: "follow" });
  if (!response.ok)
    failures.push(`${item.file}: ${item.url} (${response.status})`);
}

if (failures.length > 0) {
  console.error(["Project link check failed:", ...failures].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${urls.length} project repository links.`);
}
