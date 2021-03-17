# Hugo Sunflower

**This theme requires Hugo extended > 0.65.0**
## Install from the command line
Create a new Hugo site and initialize your project as a [Hugo module](https://gohugo.io/hugo-modules/use-modules/):

```
hugo new site my-awesome-blog
cd my-awesome-blog
hugo mod init
```

Edit your `config.toml` to add the theme settings:

```toml
theme = "github.com/zxdfe/hugo-theme-sunflower"

paginate = 8

[social]
github= "https://github.com/zxdfe/hugo-theme-sunflower"
youtube = "#"

[taxonomies]
author = "authors"

```

Create your first draft post and preview it locally:

```
hugo new post/my-first-post.md
hugo server -D
```

You're good to go!


#### Creating authors

Authors must be added in `content/authors`.
Create a folder per author and add an `_index.md` file in it.

Here's an example of the front matter fields supported by default:

```yaml
# /content/authors/firstname-lastname/_index.md
---
title: Dennis Brotzky
bio: |
  Written by You. This is where your author bio lives. Share your work, your
  joys and of course, your Twitter handle.
avatar: /images/dennis-brotzky.jpg
featured: true
social:
  - title: unsplash
    url: https://unsplash.com
  - title: github
    url: https://github.com
  - title: github
    url: https://github.com
  - title: github
    url: https://github.com
  - title: github
    url: https://github.com
---
```

#### Assigning authors to posts.
Ad the name of the author to the "authors" field:

```yaml
authors:
  - Dennis Brotzky
  - Thiago Costa
```
### Newsletter CTA

This theme includes a shortcode for a newsletter callout form that you can add to any page. 
It uses [formspree.io](//formspree.io/) as proxy to send the actual email. Each month, visitors can send you up to one thousand emails without incurring extra charges. Visit the Formspree site to get get going add your Formspree email to your shortcode like this:

```
{{< subscribe email="your@email.com" >}}
```
