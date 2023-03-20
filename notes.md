# ABOUT - change in /_pages/about.md
# CV - change in /_data/cv.yml
# add tabs - in /_pages/
# change appearance (font, color, size, etc) within _sass/
# change tab order witnin *.md in /_pages/*.md
# change font size of page title in layouts_/page.html by changing h1 to h2 or something else <h1 class="post-title">{{ page.title }}</h1>
# change font size of project titles in _pages/projects.md by changing h2 to h3 or something else <h2 class="category">{{ category }}</h2>
# change font size of year in  _pages/publications.md by changing h2 to h3 or something else   <h2 class="year">{{y}}</h2>
# make drop down tab by doing the following (example)
---
layout: page
title: academia
nav: true
nav_order: 6
dropdown: true
children: 
    - title: publications
      permalink: /publications/
    - title: divider
    - title: projects
      permalink: /projects/
    - title: divider
    - title: teaching
      permalink: /teaching/   
---
