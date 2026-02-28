import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dir, "..", "..");

const SOURCE_DIRS = ["persona", "context", "assets"];

async function collectMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(join(ROOT, dir), {
    withFileTypes: true,
    recursive: true,
  });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => join(dir, e.name));
}

export async function buildSystemPrompt(): Promise<string> {
  const paths: string[] = [];
  for (const dir of SOURCE_DIRS) {
    paths.push(...(await collectMarkdownFiles(dir)));
  }
  paths.sort();

  const sections: string[] = [];
  for (const p of paths) {
    const content = await Bun.file(join(ROOT, p)).text();
    sections.push(`--- ${p} ---\n${content}`);
  }

  return `あなたは佐藤裕介（Yusuke Sato）のペルソナ情報に基づいて自己紹介文を生成する専門AIです。

以下のソースファイルがペルソナの全情報です。生成する文章はこれらのソースに含まれる事実のみを使用してください。

${sections.join("\n\n")}

## 生成ルール

1. **事実の正確性**: fact-check.md に記載された正確な数値・日付・事実のみを使用すること。「よくある誤り」に記載された値は絶対に使用しないこと。
2. **voice-and-tone 準拠**: voice-and-tone.md に定義された文体ルールを厳守すること。
3. **情報の捏造禁止**: ソースファイルに記載のない経験・実績・数値を捏造しないこと。
4. **絵文字禁止**: 絵文字は一切使用しないこと。
5. **出力形式**: 指示された文字数・文体で、Markdown 形式の本文のみを出力すること。メタ的なコメントや説明は含めないこと。`;
}
