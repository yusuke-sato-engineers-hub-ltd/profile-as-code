# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

profile-as-code は、個人のペルソナ（経歴・技術スタック・哲学・文体など）を構造化された Markdown ファイルで管理し、Claude API を使って複数フォーマットの自己紹介文を自動生成するリポジトリ。

## Commands

```bash
# 依存関係のインストール
bun install

# プロフィール生成（全4フォーマット）
ANTHROPIC_API_KEY=<key> bun run generate
```

ランタイムは **Bun**（Node.js ではない）。TypeScript をネイティブ実行するためビルドステップは不要。

## Architecture

### データフロー

```
persona/ + context/ + assets/  →  scripts/generate.ts  →  generated/
(ソースファイル群)                  (Claude API呼び出し)       (自動生成物)
```

### ソースファイル（手動編集対象）

- `persona/` — 8パートのペルソナ定義（profile, biography, tech-stack, inspirations, philosophy, personal, voice-and-tone, fact-check）
- `context/` — キャリアタイムラインと時代背景
- `assets/links.md` — 外部リンク集

### 生成パイプライン

- `scripts/generate.ts` — メインオーケストレーター。全ソースファイルからシステムプロンプトを組み立て、4フォーマットを並列生成
- `scripts/prompts/system.ts` — persona/ context/ assets/ を読み込みシステムプロンプトを構築
- `scripts/prompts/{short,standard,presentation,proposal}.ts` — 各フォーマット固有のユーザープロンプト

### 生成物（自動生成・手動編集禁止）

`generated/` 配下の全ファイルは CI/CD で上書きされる：
- `short.md` — ~100字（SNS・チャット用）
- `standard.md` — ~500字（ブログ About ページ用）
- `presentation.md` — ~1000字（カンファレンス登壇者紹介、三人称）
- `proposal.md` — ~1200字（提案書・営業資料、敬体）

### CI/CD

`.github/workflows/generate-profiles.yml` が `persona/` `context/` `assets/` の変更を検知し、自動で再生成・コミットする。

## Key Conventions

- **ソースファイルが唯一の正（Single Source of Truth）**。事実の変更は必ずソースファイルを先に更新する
- 事実の変更時は `persona/fact-check.md` も同時に更新する
- キャリアの変更は `persona/biography.md` と `context/timeline.md` の両方に反映する
- コンテンツは日本語、コードのコメントは英語
- 生成パラメータ: temperature 0.3、モデルは `ANTHROPIC_MODEL` 環境変数で変更可能（デフォルト: claude-sonnet-4-20250514）

## Writing Style Rules (voice-and-tone.md)

生成プロンプトや文章を書く際の重要ルール：
- 絵文字・感嘆符を使わない
- 過剰な形容詞（「非常に」「素晴らしい」「画期的な」）を避ける
- AI 的な書き出し（「こんにちは！」「今回は〜について解説します！」）を使わない
- 自画自賛せず、数値と論理で語る
- 制約を肯定的な設計力として捉える（Cloudflare 10ms CPU制限、月1-3万円予算）
- 失敗や困難を隠さない（借金、過労入院）
