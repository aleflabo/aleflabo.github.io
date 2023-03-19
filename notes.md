# ABOUT - change in /_pages/about.md
# CV - change in /_data/cv.yml
# add tabs - in /_pages/
# change tab order witnin *.md in /_pages/*.md
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
