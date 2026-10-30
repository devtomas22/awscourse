# AWS Course

A static site for AWS course information — study notes, module breakdowns,
and exam prep material, hosted as a simple static site.

## Course Overview

The course walks through the core AWS building blocks, module by module:

| Module | Topic | Covers |
|--------|-------|--------|
| 1 | Cloud Fundamentals | What is cloud computing, regions & AZs, shared responsibility model |
| 2 | IAM | Users, groups, roles, policies, MFA, least privilege |
| 3 | EC2 | Instance types, security groups, key pairs, AMIs, EBS |
| 4 | Storage | S3 (buckets, versioning, storage classes), EBS vs S3 vs EFS |
| 5 | Networking | VPC, subnets, route tables, gateways, CIDR basics |
| 6 | Databases | RDS, DynamoDB, backup and multi-AZ concepts |
| 7 | Other Core Services | Lambda, CloudFront, ELB, Route 53, CloudWatch |
| 8 | Exam Prep | Practice questions, key facts to memorize, exam strategy |

## Site Hosting

The site is static: plain HTML/CSS — no server, no backend, no build step.
It is hosted on **GitHub Pages**:

- **Live site**: https://devtomas22.github.io/awscourse/
- **Entry point**: `index.html` at the repo root
- **Deploy**: push to `main` and Pages redeploys automatically

To view it locally, serve the repo contents:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Repository Layout

```
awscourse/
├── index.html         # the static landing site (served by GitHub Pages)
├── README.md          # this file — the repo landing page
├── SPEC.md            # the day-page template spec (counts, widgets, deploy)
├── .nojekyll          # disables Jekyll processing on Pages
├── style.css          # shared site styles (theme palette variables)
├── theme.js           # dark/light theme toggle, persisted
├── days.json          # day-page manifest — landing lists each day, latest first
├── 2026-10-21/        # day note — IAM fundamentals (summary, concepts, quizzes)
├── 2026-10-22/        # day note — EC2 compute fundamentals
├── 2026-10-23/        # day note — Lambda fundamentals (serverless)
├── 2026-10-26/        # day note — S3 and storage (tier/type drills)
├── 2026-10-27/        # day note — AWS networking fundamentals (VPC)
├── 2026-10-28/        # day note — AWS database fundamentals (RDS, DynamoDB, Aurora, DMS/SCT, MemoryDB)
├── 2026-10-30/        # day note — understanding Amazon CloudFront (CDN, edge network, OAC, behaviors, edge compute)
├── week-2/            # week review — Oct 26–30 on one page: storage, network, databases, costs, CloudFront
├── docs/              # module pages, one markdown file per module (planned)
└── assets/            # images and diagrams (planned)
```

## Getting Started

1. Clone the repo:
   ```bash
   git clone git@github.com:devtomas22/awscourse.git
   ```
2. Browse the modules in `docs/`, or open the site at its hosting URL.
3. To add content, add a page under `docs/` and link it from the module table.