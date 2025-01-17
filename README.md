# 个人网站源码存储库

## 常用指令

- 创建站点（指定配置文件为`yaml`格式）：`hugo new site <site-name> --format yaml`
- 创建博文：`hugo new content content/posts/<post-name>.md`
- 构建站点：
  - 不包含草稿：`hugo server`
  - 包含草稿：`hugo server -D`
  - 指定使用的配置文件：`hugo --config <name>.toml`
- 合并配置文件，从左到右优先：`hugo --config a.toml,b.yaml,c.json`
