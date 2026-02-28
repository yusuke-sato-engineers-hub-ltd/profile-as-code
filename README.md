# profile-as-code

佐藤裕介のペルソナ定義書をコードとして管理するリポジトリ。ブログ記事、技術記事、登壇資料、SNS投稿、提案書など、あらゆる外部発信媒体でAIが参照するマスターソースとして機能する。

## 目的

AIがコンテンツを生成する際に、佐藤裕介の人物像・経歴・技術スタック・哲学・文体を正確に反映させるための一次ソースを提供する。

## ディレクトリ構成

| ファイル | 内容 |
| --- | --- |
| **persona/** | |
| [persona/profile.md](persona/profile.md) | 第1部：プロフィール（基本情報） |
| [persona/biography.md](persona/biography.md) | 第2部：自己紹介（キャリアストーリー全文） |
| [persona/tech-stack.md](persona/tech-stack.md) | 第3部：技術スタック |
| [persona/inspirations.md](persona/inspirations.md) | 第4部：尊敬する技術者たち |
| [persona/philosophy.md](persona/philosophy.md) | 第5部：技術哲学・人生哲学 |
| [persona/personal.md](persona/personal.md) | 第6部：趣味・私生活 |
| [persona/voice-and-tone.md](persona/voice-and-tone.md) | 第7部：文体・トーン・語り口ガイド |
| [persona/fact-check.md](persona/fact-check.md) | 第8部：ファクトチェック項目 |
| **context/** | |
| [context/timeline.md](context/timeline.md) | キャリアタイムライン（年表形式） |
| [context/era-background.md](context/era-background.md) | 時代背景・文化的コンテキスト |
| **assets/** | |
| [assets/links.md](assets/links.md) | 第9部：関連リンク集 |

## 使い方

### 用途別の参照ガイド

| 用途 | 参照ファイル |
| --- | --- |
| 技術記事の執筆 | [voice-and-tone.md](persona/voice-and-tone.md) + [tech-stack.md](persona/tech-stack.md) + [fact-check.md](persona/fact-check.md) |
| 自己紹介・経歴紹介 | [profile.md](persona/profile.md) + [biography.md](persona/biography.md) |
| ナラティブ型コンテンツ | [biography.md](persona/biography.md) + [philosophy.md](persona/philosophy.md) + [era-background.md](context/era-background.md) |
| 登壇資料・プレゼン | [profile.md](persona/profile.md) + [timeline.md](context/timeline.md) |
| SNS投稿 | [voice-and-tone.md](persona/voice-and-tone.md) + [profile.md](persona/profile.md) |
| 提案書・営業資料 | [tech-stack.md](persona/tech-stack.md) + [timeline.md](context/timeline.md) + [links.md](assets/links.md) |
| ファクトチェック | [fact-check.md](persona/fact-check.md) |

### AIへの指示例

```
以下のリポジトリを参照して、佐藤裕介のペルソナに基づいた技術記事を執筆してください。

- 文体ガイド: persona/voice-and-tone.md
- ファクトチェック: persona/fact-check.md
- 技術スタック: persona/tech-stack.md
- キャリアの文脈: persona/biography.md
```

## 運用ルール

- 事実関係の変更は [persona/fact-check.md](persona/fact-check.md) を先に更新する
- 新しいプロジェクトや実績は [persona/biography.md](persona/biography.md) と [context/timeline.md](context/timeline.md) に追記する
- 変更は全てGitで履歴管理し、差分を追跡可能にする

## 最終更新日

2026年2月28日
