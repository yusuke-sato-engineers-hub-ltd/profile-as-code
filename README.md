# profile-as-code

佐藤裕介のペルソナ定義書をコードとして管理するリポジトリ。ブログ記事、技術記事、登壇資料、SNS投稿、提案書など、あらゆる外部発信媒体でAIが参照するマスターソースとして機能する。

## 目的

AIがコンテンツを生成する際に、佐藤裕介の人物像・経歴・技術スタック・哲学・文体を正確に反映させるための一次ソースを提供する。

## ディレクトリ構成

```
profile-as-code/
├── README.md                    # 本ファイル
├── persona/
│   ├── profile.md               # 第1部：プロフィール（基本情報）
│   ├── biography.md             # 第2部：自己紹介（キャリアストーリー全文）
│   ├── tech-stack.md            # 第3部：技術スタック
│   ├── inspirations.md          # 第4部：尊敬する技術者たち
│   ├── philosophy.md            # 第5部：技術哲学・人生哲学
│   ├── personal.md              # 第6部：趣味・私生活
│   ├── voice-and-tone.md        # 第7部：文体・トーン・語り口ガイド
│   └── fact-check.md            # 第8部：ファクトチェック項目
├── context/
│   ├── timeline.md              # キャリアタイムライン（年表形式）
│   └── era-background.md        # 時代背景・文化的コンテキスト
├── assets/
│   └── links.md                 # 第9部：関連リンク集
└── .github/
    └── CODEOWNERS               # 変更管理
```

## 使い方

### 用途別の参照ガイド

| 用途 | 参照ファイル |
| --- | --- |
| 技術記事の執筆 | `persona/voice-and-tone.md` + `persona/tech-stack.md` + `persona/fact-check.md` |
| 自己紹介・経歴紹介 | `persona/profile.md` + `persona/biography.md` |
| ナラティブ型コンテンツ | `persona/biography.md` + `persona/philosophy.md` + `context/era-background.md` |
| 登壇資料・プレゼン | `persona/profile.md` + `context/timeline.md` |
| SNS投稿 | `persona/voice-and-tone.md` + `persona/profile.md` |
| 提案書・営業資料 | `persona/tech-stack.md` + `context/timeline.md` + `assets/links.md` |
| ファクトチェック | `persona/fact-check.md` |

### AIへの指示例

```
以下のリポジトリを参照して、佐藤裕介のペルソナに基づいた技術記事を執筆してください。

- 文体ガイド: persona/voice-and-tone.md
- ファクトチェック: persona/fact-check.md
- 技術スタック: persona/tech-stack.md
- キャリアの文脈: persona/biography.md
```

## 運用ルール

- 事実関係の変更は `persona/fact-check.md` を先に更新する
- 新しいプロジェクトや実績は `persona/biography.md` と `context/timeline.md` に追記する
- 変更は全てGitで履歴管理し、差分を追跡可能にする

## 最終更新日

2026年2月28日
