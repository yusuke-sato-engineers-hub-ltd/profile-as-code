# 第3部：技術スタック

> 本ドキュメントは佐藤裕介の技術スタックを定義する。AIが技術的コンテンツを生成する際の参照ソースとして機能する。

---

## クラウド / インフラ

### AWS（主戦場）

EKS, ECS, EC2, Lambda, Step Functions, CloudFormation, CodePipeline, CodeBuild, S3, CloudFront, Route 53, API Gateway, ALB, RDS, DynamoDB, ElastiCache, SQS, SNS, EventBridge, CloudWatch, IAM, Secrets Manager, WAF, GuardDuty, VPC

### GCP

Cloud Run, Cloud Functions, BigQuery, Firestore, Cloud Storage

### Firebase

Authentication, Firestore, Hosting, Cloud Functions

### Cloudflare

Workers, D1, Pages, R2, KV

## プログラミング言語

| 言語 | 経験年数 | 用途 |
| --- | --- | --- |
| JavaScript / TypeScript | 10年以上 | フロントエンド・バックエンド全般 |
| PHP | 15年以上 | Web開発（Laravel等） |
| Ruby | 10年以上 | 自動化・Web開発 |
| Python | 10年以上 | 自動化・データ処理・バックエンド |
| Node.js | 10年以上 | サーバーサイド |
| Go | 5年以上 | マイクロサービス・CLI |
| Rust | 学習中 | システムプログラミング |
| C# | 業務経験あり | .NET開発 |
| C++ | 業務経験あり | パフォーマンス重視の開発 |
| Bash | 20年以上 | インフラ自動化 |
| Perl | 15年以上 | レガシー自動化・テキスト処理 |

### 歴史的に使用した言語バージョン

- Ruby 0.9（2001年〜）
- Python 1（2001年〜）
- PHP 4（2005年〜）
- Perl 5（2001年〜）

## フレームワーク / ライブラリ

### フロントエンド

Vue.js, React, Nuxt.js, Angular, **Svelte 5（runes）**, Tailwind CSS, Vite

### バックエンド

Laravel, Ruby on Rails, Django, FastAPI, Express, NestJS, Gin, **Hono**

### 現在のメインスタック（2024年〜）

- **Svelte 5（runes）+ Vite 7 + Tailwind CSS**（フロントエンド）
- **Hono 4.6 + Cloudflare Workers + D1**（バックエンド）
- **Lucia Auth v3 + Arctic**（認証）
- **Zod**（バリデーション）
- **Bun**（パッケージマネージャー）
- **Vitest**（テスト）

## データベース

MySQL, PostgreSQL, MongoDB, DynamoDB, D1（SQLite）, Redis, ElastiCache

## DevOps / ツール

Docker, Kubernetes, Terraform, Ansible, GitHub Actions, GitLab CI, Jenkins, Wrangler, lefthook

## 技術スタックの選定基準

1. **制約の中で最適解を見つける**: Cloudflare Workersの10ms CPU制限、月1〜3万円の予算制約。制約が設計を磨く
2. **変わらないものは変わらない場所に置く**: 不変データをDBに入れない。設問定義やハッシュタグ定義はTypeScript定数として保持
3. **枯れた技術と尖った技術の組み合わせ**: PostgreSQLとCloudflare D1を案件に応じて使い分ける
4. **自動化への執着**: 年間500本の自動化プログラムの経験が、今もスタック選定に影響している
