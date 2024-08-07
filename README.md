# Chordbomb

<https://chordbomb.com>

Chordbomb is a single-page web application, offering the ability to query a small database of songs and customize how the lyrics and chords are displayed.

### End of Support (August 6th, 2024)

Chordbomb is no longer maintained due to the deprecation of the [Algolia InstantSearch package](https://www.npmjs.com/package/angular-instantsearch) that it heavily relies on.

## Release notes

|     |                             |
| --- | --------------------------- |
| 🚀  | New features & improvements |
| 🐛  | Bug fixes                   |
| 🔧  | Behind-the-scenes changes   |

<details>
<summary style="cursor: pointer">
v1.2.0 - August 6th, 2024
</summary>

- 🐛 Upgrade to Angular v12
- 🔧 Implement a production GitHub Action workflow
- 🔧 Update this README file

</details>

<details>
<summary style="cursor: pointer">
v1.1.0 - December 30th, 2022
</summary>

- 🔧 Configure AWS S3 static web hosting and CodeBuild pipeline after move away from Firebase hosting service
- 🔧 Update release log & layout of this README file

</details>

<details>
<summary style="cursor: pointer">
v1.0.1 - June 15th, 2021
</summary>

- 🐛 Fix site manifest bug
- 🐛 Revert instantsearch.js to 3.6.0 for better compatibility with other Algolia dependencies
- 🐛 Revert Ais-Search to automatically display all available songs before any query is made or filter added

</details>

<details>
<summary style="cursor: pointer">
v1.0.0 - June 13th, 2021
</summary>

- 🚀 10 songs stored in Firebase's Firestore Database
- 🚀 Songs searchable using Algolia's Instant Search API, which mirrors data through a series of Firebase Cloud Functions; search features include full-text search-as-you-type functionality and typo recognition for 1 every 4 characters
- 🚀 Admin login for editing songs in-app, with components lazy-loaded for increased app performance
- 🚀 Settings in sidenav giving user ability to select text font size and chord mode while viewing a song
- 🚀 Fully-responsive design with a dropdown navigation on smaller viewports

</details>

## Screenshots

![Chordbomb Screenshot 1](screenshots/screenshot-1.png 'Chordbomb - Search Song')
![Chordbomb Screenshot 2](screenshots/screenshot-2.png 'Chordbomb - Song with Chords')
![Chordbomb Screenshot 3](screenshots/screenshot-3.png 'Chordbomb - Song without Chords')
![Chordbomb Screenshot 4](screenshots/screenshot-4.png 'Chordbomb - Admin Login')
![Chordbomb Screenshot 5](screenshots/screenshot-5.png 'Chordbomb - Edit Song')
