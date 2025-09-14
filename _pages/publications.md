---
layout: page
permalink: /publications/
title: publications
description: Research contributions bridging AI theory and practical applications
years: [2025,2024,2023,2022,2021,2020]
nav: true
nav_order: 5
---

<!-- Research Impact Overview -->
<div class="research-overview">
  <h2>Research Impact</h2>
  <p>My research focuses on advancing artificial intelligence through practical innovations in computer vision, procedural learning, and anomaly detection. This work directly informs the technology development at <a href="https://www.procederai.com">Procederai</a>, where we translate cutting-edge research into enterprise solutions.</p>
  
  <div class="research-highlights">
    <h3>Key Research Areas</h3>
    <ul>
      <li><strong>Procedural Learning</strong> - Teaching AI systems to understand and execute complex multi-step processes</li>
      <li><strong>Video Anomaly Detection</strong> - Real-time identification of unusual patterns in dynamic visual content</li>
      <li><strong>Egocentric Vision</strong> - First-person perspective AI for human-centric applications</li>
      <li><strong>Hyperbolic Neural Networks</strong> - Novel geometric approaches to hierarchical data representation</li>
      <li><strong>Self-Supervised Learning</strong> - Advancing AI capabilities without extensive labeled datasets</li>
    </ul>
  </div>

  <div class="research-impact">
    <h3>Research to Product Pipeline</h3>
    <p>My unique position as both researcher and CTO enables a direct pathway from academic innovation to commercial implementation. Research insights directly influence product development at Procederai, ensuring our AI solutions are built on solid theoretical foundations while addressing real-world enterprise needs.</p>
  </div>
</div>

<hr style="margin: 2rem 0;">

<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

<div class="research-metrics" style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 8px;">
  <h3>Research Metrics & Recognition</h3>
  <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
    <div class="metric">
      <strong>Publications</strong><br>
      15+ peer-reviewed papers in top AI/CV conferences
    </div>
    <div class="metric">
      <strong>Best Paper Award</strong><br>
      CVPR 2023 Precognition Workshop
    </div>
    <div class="metric">
      <strong>Google Scholar</strong><br>
      <a href="https://scholar.google.com/citations?user=HHDHIVoAAAAJ&hl">View Citation Profile</a>
    </div>
    <div class="metric">
      <strong>Open Source</strong><br>
      Active contributor to AI research community
    </div>
  </div>
</div>
