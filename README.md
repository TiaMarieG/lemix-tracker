# Lemix-Tracker

## What is it?

With the upcoming World of Warcraft: Legion Remix patch, I wanted to create a tracking tool that can be used to, well, track all of the new items that are being added for players to collect during the event. As with every new patch, addons can take forever to be updated/created for use during the event and I've never been a fan of spreadsheets, so I figured "Why not use the skills that I've learned during my BAS?". With the help of WoWHead's datamining articles and guildmates who tested Lemix during the PTR, I created a simplistic React-Vite web application that allows users to easily track purchaseable items.

## What can it do?

As a collector myself, I wanted Lemix-Tracker to be more than just a tool you click a checkbox in. Small features were added that I felt would 'scratch the itch' of completion compulsion.

-   **Progress Bar:** Users can see at a glance just how far they have to go to hit that 100% - Everything Purchased! - goal.
-   **Remaining Costs:** As items are marked as collected, this total will be dynamically reduced to show how much currency is needed to purchase remaining collectables.
-   **Vendor Tracking:** Each vendor shows how many items they have to be collected and how many of those items have been checked off. When everything is purchased, users can take satisfaction in seeing the tracker displaying all items as collected.

Outside of completion, users can also interact with listed collectables by clicking/tapping on an item. This will open a new tab that links to the respective item's WoWHead page where users can see what the item looks like or find other useful information.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast frontend build tool.
* **Material-UI (MUI):** A React UI component library.
* **TypeScript:** A typed superset of JavaScript.
* **Vercel Analytics:** For usage analytics.

### Why not use an API?

The primary reason was that I didn't want to deal with creating a backend. The goal of this project was for it to remain simple while providing enough of a challenge to allow practice of my skillset, but this will likely change with the next Remix as it was tedious creating all the TypeScript files of the vendors.

The second reason was that APIs sometimes take a bit to update and I wanted a tool that would reflect changes instantly. In hindsight, I could have just used an API to pull the data from WoW and still enable manual collection. Something to also keep in mind for the next Remix.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later recommended)
* npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/TiaMarieG/lemix-tracker.git
    ```
2.  Navigate to the project directory
    ```sh
    cd lemix-tracker
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Start the development server
    ```sh
    npm run dev
    ```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.