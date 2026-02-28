import Anthropic from "@anthropic-ai/sdk";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { buildSystemPrompt } from "./prompts/system";
import { shortPrompt } from "./prompts/short";
import { standardPrompt } from "./prompts/standard";
import { presentationPrompt } from "./prompts/presentation";
import { proposalPrompt } from "./prompts/proposal";

const ROOT = join(import.meta.dir, "..");
const OUTPUT_DIR = join(ROOT, "generated");

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
const TEMPERATURE = 0.3;

interface ProfileVersion {
  filename: string;
  label: string;
  prompt: string;
  maxTokens: number;
}

const versions: ProfileVersion[] = [
  {
    filename: "short.md",
    label: "SNS / 名札 / チャット（~100字）",
    prompt: shortPrompt,
    maxTokens: 512,
  },
  {
    filename: "standard.md",
    label: "ブログ About / 一般自己紹介（~500字）",
    prompt: standardPrompt,
    maxTokens: 2048,
  },
  {
    filename: "presentation.md",
    label: "カンファレンス登壇者紹介（~1000字）",
    prompt: presentationPrompt,
    maxTokens: 4096,
  },
  {
    filename: "proposal.md",
    label: "提案書 / 営業資料（~1200字）",
    prompt: proposalPrompt,
    maxTokens: 4096,
  },
];

function header(version: ProfileVersion): string {
  const now = new Date().toISOString().split("T")[0];
  return `<!-- This file is auto-generated. Do not edit manually. -->
<!-- Generated: ${now} | Model: ${MODEL} -->
<!-- Source: persona/, context/, assets/ -->

`;
}

async function generate(
  client: Anthropic,
  systemPrompt: string,
  version: ProfileVersion
): Promise<string> {
  console.log(`Generating: ${version.filename} ...`);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: version.maxTokens,
    temperature: TEMPERATURE,
    system: systemPrompt,
    messages: [{ role: "user", content: version.prompt }],
  });

  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");

  console.log(
    `Done: ${version.filename} (${text.length} chars, ${response.usage.input_tokens}+${response.usage.output_tokens} tokens)`
  );

  return text;
}

function buildReadme(generatedAt: string): string {
  const rows = versions
    .map((v) => `| [${v.filename}](./${v.filename}) | ${v.label} |`)
    .join("\n");

  return `<!-- This file is auto-generated. Do not edit manually. -->
<!-- Generated: ${generatedAt} | Model: ${MODEL} -->

# Generated Profiles

profile-as-code のソースファイルから自動生成された自己紹介文。

| ファイル | 用途 |
| --- | --- |
${rows}

## 注意事項

- これらのファイルは \`bun run generate\` で自動生成される
- 手動編集は次回の生成時に上書きされる
- 内容を修正したい場合は \`persona/\`、\`context/\`、\`assets/\` のソースファイルを編集すること
`;
}

async function main() {
  const client = new Anthropic();

  console.log(`Model: ${MODEL}`);
  console.log("Building system prompt...");
  const systemPrompt = await buildSystemPrompt();
  console.log(`System prompt: ${systemPrompt.length} chars`);

  await mkdir(OUTPUT_DIR, { recursive: true });

  const results = await Promise.all(
    versions.map((v) => generate(client, systemPrompt, v))
  );

  const generatedAt = new Date().toISOString().split("T")[0];

  for (let i = 0; i < versions.length; i++) {
    const path = join(OUTPUT_DIR, versions[i].filename);
    await Bun.write(path, header(versions[i]) + results[i] + "\n");
    console.log(`Wrote: ${path}`);
  }

  const readmePath = join(OUTPUT_DIR, "README.md");
  await Bun.write(readmePath, buildReadme(generatedAt));
  console.log(`Wrote: ${readmePath}`);

  console.log("All profiles generated successfully.");
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
