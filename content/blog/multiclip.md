---
title: MultiClip Swift app
date: '2025-03-14'
tags: ['SwiftUI', 'Swift', 'SwiftData', 'AppKit', 'macOS']
---

# MultiClip: lightweight text snippet clipboard utility

I made MultiClip as a small project to brush up on my SwiftUI skills.

Turns out that to make this kind of app I would have to make use of some components that were in AppKit, not SwiftUI, like registering the first click instead of one for focus and another for action; keeping the window pinned to the top; specially rendering the non-standard window.

Everything else used normal SwiftUI, for the UI and SwiftData for saving snippets across app launches.